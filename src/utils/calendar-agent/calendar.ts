import { google } from "googleapis";
import { OAuth2Client } from "google-auth-library";
import { env } from "process";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { type calendar_v3 } from "googleapis";

// Configure Day.js plugins
dayjs.extend(utc);
dayjs.extend(timezone);

// Set timezone to Asia/Kolkata
const systemTimezone = "Asia/Kolkata";

const REDIRECT_URI =
  process.env.NODE_ENV === "production"
    ? `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/callback`
    : "http://localhost:3000/api/auth/callback";

export const oauth2Client = new OAuth2Client(
  env.GOOGLE_CLIENT_ID,
  env.GOOGLE_CLIENT_SECRET,
  REDIRECT_URI,
);

export const calendar = google.calendar({ version: "v3", auth: oauth2Client });

export async function listEvents(timeMin: Date = new Date(), timeMax?: Date) {
  const startTime = dayjs(timeMin).tz(systemTimezone);
  const endTime = timeMax ? dayjs(timeMax).tz(systemTimezone) : undefined;

  try {
    const response = await calendar.events.list({
      calendarId: "primary",
      timeMin: startTime.toISOString(),
      timeMax: endTime?.toISOString(),
      maxResults: 10,
      singleEvents: true,
      orderBy: "startTime",
    });
    return response.data.items;
  } catch (error) {
    console.error("Error fetching events:", error);
    if (error instanceof Error) {
      console.error("Error details:", error.message);
    }
    throw error;
  }
}

export async function createEvent(
  summary: string,
  description: string,
  startTime: Date,
  endTime: Date,
  attendees?: string[],
  addMeetLink: boolean = false,
) {
  // Explicitly parse the dates in the system timezone and format with offset
  const start = dayjs(startTime).tz(systemTimezone, true);
  const end = dayjs(endTime).tz(systemTimezone, true);

  console.log("Debug timezone info:", {
    systemTimezone,
    originalStart: startTime,
    originalEnd: endTime,
    parsedStart: start.format(),
    parsedEnd: end.format(),
  });

  try {
    // Verify OAuth client has credentials
    if (!oauth2Client.credentials || !oauth2Client.credentials.access_token) {
      throw new Error("No OAuth credentials available");
    }

    const event = {
      summary,
      description,
      start: {
        dateTime: start.format(),
        timeZone: systemTimezone,
      },
      end: {
        dateTime: end.format(),
        timeZone: systemTimezone,
      },
      attendees: attendees?.map((email) => ({ email })),
      conferenceData: addMeetLink
        ? {
            createRequest: {
              requestId: Math.random().toString(36).substring(7),
              conferenceSolutionKey: { type: "hangoutsMeet" },
            },
          }
        : undefined,
    };

    const response = await calendar.events.insert({
      calendarId: "primary",
      requestBody: event,
      sendUpdates: "all", // Send email notifications to attendees
      conferenceDataVersion: addMeetLink ? 1 : 0,
    });

    return response.data;
  } catch (error) {
    console.error("Error creating event:", error);
    if (error instanceof Error) {
      console.error("Error details:", {
        message: error.message,
        stack: error.stack,
      });
    }
    throw error;
  }
}

export async function updateEvent(
  eventId: string,
  updates: {
    summary?: string;
    description?: string;
    startTime?: Date;
    endTime?: Date;
    attendees?: string[];
  },
) {
  try {
    const event: Partial<calendar_v3.Schema$Event> = {
      ...(updates.summary && { summary: updates.summary }),
      ...(updates.description && { description: updates.description }),
      ...(updates.startTime && {
        start: {
          dateTime: dayjs(updates.startTime).tz(systemTimezone).toISOString(),
          timeZone: systemTimezone,
        },
      }),
      ...(updates.endTime && {
        end: {
          dateTime: dayjs(updates.endTime).tz(systemTimezone).toISOString(),
          timeZone: systemTimezone,
        },
      }),
      ...(updates.attendees && {
        attendees: updates.attendees.map((email) => ({ email })),
      }),
    };

    const response = await calendar.events.patch({
      calendarId: "primary",
      eventId,
      requestBody: event,
      sendUpdates: "all", // Send email notifications to attendees
    });

    return response.data;
  } catch (error) {
    console.error("Error updating event:", error);
    if (error instanceof Error) {
      console.error("Error details:", {
        message: error.message,
        stack: error.stack,
      });
    }
    throw error;
  }
}

export async function deleteEvent(eventId: string) {
  try {
    await calendar.events.delete({
      calendarId: "primary",
      eventId,
      sendUpdates: "all", // Send cancellation emails
    });
    return true;
  } catch (error) {
    console.error("Error deleting event:", error);
    if (error instanceof Error) {
      console.error("Error details:", {
        message: error.message,
        stack: error.stack,
      });
    }
    throw error;
  }
}
