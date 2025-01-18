import { DynamicTool } from "@langchain/core/tools";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { createEvent, deleteEvent, listEvents, updateEvent } from "./calendar";
import { MessagesPlaceholder } from "@langchain/core/prompts";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { ChatOpenAI } from "@langchain/openai";
import { AgentExecutor, createOpenAIFunctionsAgent } from "langchain/agents";

dayjs.extend(utc);
dayjs.extend(timezone);

// Get system timezone
const systemTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

export const calendarAgent = async () => {
  const getCurrentDateTool = new DynamicTool({
    name: "get_current_date",
    description: "Returns the current date in the user's timezone",
    func: async () => {
      return dayjs().tz(systemTimezone).format("YYYY-MM-DD");
    },
  });

  const getEventsByTimeRangeTool = new DynamicTool({
    name: "get_events_by_date",
    description: `Gets calendar events for a specific date. Format the input as a JSON string:
      {
        "date": "YYYY-MM-DD"    // The date to get events for
      }
      Returns events for the entire 24-hour period of the specified date in the user's timezone.`,
    func: async (input: string) => {
      try {
        const { date } = JSON.parse(input);

        // Create start and end of the day in user's timezone
        const startOfDay = dayjs(date).tz(systemTimezone).startOf("day");
        const endOfDay = dayjs(date).tz(systemTimezone).endOf("day");

        const events = await listEvents(startOfDay.toDate(), endOfDay.toDate());
        return JSON.stringify(events, null, 2);
      } catch (error) {
        console.error("Error in get_events_by_date:", error);
        const errorMessage =
          error instanceof Error ? error.message : "Unknown error occurred";
        throw new Error(`Failed to get events: ${errorMessage}`);
      }
    },
  });

  const listAllEventsTool = new DynamicTool({
    name: "list_calendar_events",
    description:
      "Lists upcoming calendar events. Returns events with their details including title, time, and attendees.",
    func: async () => {
      const events = await listEvents();
      return JSON.stringify(events, null, 2);
    },
  });

  const createEventTool = new DynamicTool({
    name: "create_calendar_event",
    description: `Creates a new calendar event. You must format the input as a JSON string with the following structure:
      {
        "summary": "Meeting title",
        "description": "Meeting description",
        "startTime": "YYYY-MM-DDTHH:mm:ss", // Local time, use actual date, not placeholder
        "endTime": "YYYY-MM-DDTHH:mm:ss",   // Local time, use actual date, not placeholder
        "attendees": ["email1@example.com"]   // Optional
        "addMeetLink": true/false            // Optional, whether to add a Google Meet link
      }
      For dates:
      - IMPORTANT: Always call get_current_date first before scheduling any event
      - Use the returned current date to validate and calculate dates
      - For future dates, add days to the current date (e.g., dayjs(currentDate).add(7, 'days'))
      - Never schedule events without first checking the current date
      - Ensure all dates are based on the actual current date
      - The timezone will be automatically detected from the user's system`,
    func: async (input: string) => {
      try {
        if (!input) {
          throw new Error("No input provided to create_calendar_event");
        }

        const parsed = JSON.parse(input);

        const {
          summary,
          description,
          startTime,
          endTime,
          attendees,
          addMeetLink,
        } = parsed;

        // Validate required fields
        if (!summary || !startTime || !endTime) {
          throw new Error(
            "Missing required fields: summary, startTime, or endTime",
          );
        }

        // Get the user's timezone
        const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

        // Parse dates with the correct timezone
        const startDate = dayjs(startTime).tz(userTimezone);
        const endDate = dayjs(endTime).tz(userTimezone);

        // If there are attendees, automatically add meet link
        const shouldAddMeetLink =
          attendees && attendees.length > 0 ? true : addMeetLink;

        const event = await createEvent(
          summary,
          description || "",
          startDate.toDate(),
          endDate.toDate(),
          attendees,
          shouldAddMeetLink,
          userTimezone, // Pass the detected timezone
        );

        return JSON.stringify(event, null, 2);
      } catch (error) {
        console.error("Error in create_calendar_event:", error);
        const errorMessage =
          error instanceof Error ? error.message : "Unknown error occurred";
        throw new Error(`Failed to create calendar event: ${errorMessage}`);
      }
    },
  });

  const updateEventTool = new DynamicTool({
    name: "update_calendar_event",
    description: `Updates an existing calendar event. Format the input as a JSON string:
      {
        "eventId": "event123",
        "summary": "Updated title",      // Optional
        "description": "New desc",       // Optional
        "startTime": "YYYY-MM-DDTHH:mm:ss", // Optional, use actual date
        "endTime": "YYYY-MM-DDTHH:mm:ss",   // Optional, use actual date
        "attendees": ["email@example.com"]    // Optional
        "addMeetLink": true/false            // Optional, whether to add a Google Meet link
      }
      Always call get_current_date first before updating any event dates.`,
    func: async (input: string) => {
      try {
        const { eventId, ...updates } = JSON.parse(input);

        if (updates.startTime) {
          updates.startTime = dayjs(updates.startTime)
            .tz(systemTimezone)
            .toDate();
        }
        if (updates.endTime) {
          updates.endTime = dayjs(updates.endTime).tz(systemTimezone).toDate();
        }

        // If there are attendees, automatically add meet link
        if (updates.attendees && updates.attendees.length > 0) {
          updates.addMeetLink = true;
        }

        const event = await updateEvent(eventId, updates);
        return JSON.stringify(event, null, 2);
      } catch (error) {
        console.error("Error in update_calendar_event:", error);
        const errorMessage =
          error instanceof Error ? error.message : "Unknown error occurred";
        throw new Error(`Failed to update calendar event: ${errorMessage}`);
      }
    },
  });

  const deleteEventTool = new DynamicTool({
    name: "delete_calendar_event",
    description: `Deletes a calendar event. Format the input as a JSON string:
      {
        "eventId": "event123"
      }`,
    func: async (input: string) => {
      try {
        const { eventId } = JSON.parse(input);
        await deleteEvent(eventId);
        return "Event deleted successfully";
      } catch (error) {
        console.error("Error in delete_calendar_event:", error);
        const errorMessage =
          error instanceof Error ? error.message : "Unknown error occurred";
        throw new Error(`Failed to delete calendar event: ${errorMessage}`);
      }
    },
  });

  const tools = [
    getCurrentDateTool,
    getEventsByTimeRangeTool,
    listAllEventsTool,
    createEventTool,
    updateEventTool,
    deleteEventTool,
  ];

  const prompt = ChatPromptTemplate.fromMessages([
    [
      "system",
      `You are a helpful assistant that manages Google Calendar events. When creating or updating events:
      1. ALWAYS call get_current_date first before any scheduling operation
      2. Use the returned current date as the base for calculating any dates
      3. For future dates, add days to the current date (e.g., for next week: dayjs(currentDate).add(7, 'days'))
      4. Never use hardcoded dates or assume the current date
      5. Convert user's natural language time to proper format (YYYY-MM-DDTHH:mm:ss)
      6. Format the input as proper JSON before calling tools
      7. Include all necessary fields as specified in the tool descriptions
      8. Handle time zones appropriately using the user's local timezone
      9. For time durations, calculate the end time based on the start time and duration
      10. Double-check that dates are correct and based on the current date before creating events`,
    ],
    ["human", "{input}"],
    new MessagesPlaceholder("agent_scratchpad"),
  ]);

  const model = new ChatOpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    modelName: "gpt-3.5-turbo",
  });

  const agent = await createOpenAIFunctionsAgent({
    llm: model,
    tools,
    prompt,
  });

  // Create the executor
  const executor = new AgentExecutor({
    agent,
    tools,
    verbose: true,
  });

  return executor;
};
