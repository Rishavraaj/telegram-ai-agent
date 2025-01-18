// import { Bot, InlineKeyboard } from "grammy";

// //Store bot screaming status
// let screaming = false;

// //Create a new bot
// const bot = new Bot("7848616744:AAHYJ5-VzXv2oqMZCsPp9E2p02WEIJNSaIY");

// //This function handles the /scream command
// bot.command("scream", () => {
//   screaming = true;
// });

// //This function handles /whisper command
// bot.command("whisper", () => {
//   screaming = false;
// });

// //Pre-assign menu text
// const firstMenu =
//   "<b>Menu 1</b>\n\nA beautiful menu with a shiny inline button.";
// const secondMenu =
//   "<b>Menu 2</b>\n\nA better menu with even more shiny inline buttons.";

// //Pre-assign button text
// const nextButton = "Next";
// const backButton = "Back";
// const tutorialButton = "Tutorial";

// //Build keyboards
// const firstMenuMarkup = new InlineKeyboard().text(nextButton, nextButton);

// const secondMenuMarkup = new InlineKeyboard()
//   .text(backButton, backButton)
//   .text(tutorialButton, "https://core.telegram.org/bots/tutorial");

// //This handler sends a menu with the inline buttons we pre-assigned above
// bot.command("menu", async (ctx) => {
//   await ctx.reply(firstMenu, {
//     parse_mode: "HTML",
//     reply_markup: firstMenuMarkup,
//   });
// });

// //This handler processes back button on the menu
// bot.callbackQuery(backButton, async (ctx) => {
//   //Update message content with corresponding menu section
//   await ctx.editMessageText(firstMenu, {
//     reply_markup: firstMenuMarkup,
//     parse_mode: "HTML",
//   });
// });

// //This handler processes next button on the menu
// bot.callbackQuery(nextButton, async (ctx) => {
//   //Update message content with corresponding menu section
//   await ctx.editMessageText(secondMenu, {
//     reply_markup: secondMenuMarkup,
//     parse_mode: "HTML",
//   });
// });

// //This function handles messages coming from the Bot API
// bot.on("message", async (ctx) => {
//   //Print to console
//   console.log(
//     `${ctx.from.first_name} wrote ${
//       "text" in ctx.message ? ctx.message.text : ""
//     }`,
//   );

//   // Check if the message contains text
//   if (!ctx.message.text) {
//     await ctx.reply("Please send me a text message!");
//     return;
//   }

//   // Convert message to lowercase for easier comparison
//   const userMessage = ctx.message.text.toLowerCase();

//   // Define responses for different messages
//   if (userMessage.includes("hello") || userMessage.includes("hi")) {
//     await ctx.reply(`Hello ${ctx.from.first_name}! How can I help you today?`);
//   } else if (userMessage.includes("how are you")) {
//     await ctx.reply("I'm doing great, thanks for asking! How about you?");
//   } else if (userMessage.includes("bye")) {
//     await ctx.reply("Goodbye! Have a great day! 👋");
//   } else if (userMessage.includes("weather")) {
//     await ctx.reply(
//       "I'm sorry, I don't have access to weather information yet!",
//     );
//   } else {
//     // Default response for unrecognized messages
//     await ctx.reply(
//       "I'm not sure how to respond to that. Try saying 'hello' or ask me how I am!",
//     );
//   }
// });

// //Start the Bot
// await bot.start();

// import { env } from "@/env";
// import {
//   AudioTranscriptLoader,
//   // AudioTranscriptParagraphsLoader,
//   // AudioTranscriptSentencesLoader
// } from "@langchain/community/document_loaders/web/assemblyai";

// // async function getAudioUrl(): Promise<string | null> {
// //   try {
// //     return "https://api.telegram.org/file/bot7848616744:AAHYJ5-VzXv2oqMZCsPp9E2p02WEIJNSaIY/AwACAgUAAxkBAAMvZ4eadROKKeWQS5kbhlrGXbSxzi0AAhIVAAJXvjhU0CsVffQ3VAU2BA";
// //   } catch (error) {
// //     console.error("Error getting audio URL:", error);
// //     return null;
// //   }
// // }

// // async function downloadAudio(): Promise<Buffer> {
// //   try {
// //     const response = await fetch(
// //       `https://api.telegram.org/file/bot${env.TELEGRAM_BOT_TOKEN}/AwACAgUAAxkBAAMvZ4eadROKKeWQS5kbhlrGXbSxzi0AAhIVAAJXvjhU0CsVffQ3VAU2BA`,
// //       {
// //         headers: {
// //           Authorization: `Bearer ${env.TELEGRAM_BOT_TOKEN}`,
// //         },
// //       },
// //     );
// //     console.log("response", response);
// //     return Buffer.from(await response.arrayBuffer());
// //   } catch (error) {
// //     console.error("Error downloading file:", error);
// //     throw error;
// //   }
// // }

// // const audioBuffer = await downloadAudio();
// // console.log("audioBuffer", audioBuffer);

// // const audioUrl = await getAudioUrl();
// // console.log("audioUrl", audioUrl);

// // const convertVoiceToText = async () => {
// //   //     "result": {
// //   // "file_id": "AwACAgUAAxkBAAMuZ4eWxuMRmVugy1_VdGGZnMpdFC0AAgcVAAJXvjhUCknRSi93UTY2BA",
// //   // "file_unique_id": "AgADBxUAAle-OFQ",
// //   // "file_size": 9202,
// //   // "file_path": "voice/file_1.oga"
// //   // }

// //   const voice = {
// //     duration: 3,
// //     mime_type: "audio/ogg",
// //     file_id:
// //       "AwACAgUAAxkBAAMvZ4eadROKKeWQS5kbhlrGXbSxzi0AAhIVAAJXvjhU0CsVffQ3VAU2BA",
// //     file_unique_id: "AgADEhUAAle-OFQ",
// //     file_size: 11925,
// //   };

// //   // Convert to audio blob that can be played in Chrome
// //   const audioUrl = `https://api.telegram.org/file/bot${env.TELEGRAM_BOT_TOKEN}/${voice.file_id}`;
// //   console.log("audioUrl", audioUrl);
// //   const response = await fetch(audioUrl);
// //   console.log("response", response);
// //   const audioBlob = await response.blob();
// //   console.log("audioBlob", audioBlob);
// //   const audioElement = new Audio(URL.createObjectURL(audioBlob));
// //   audioElement.play();

// //   //TODO: store this data to local

// //   //   const fileUrl = `https://api.telegram.org/file/bot${env.TELEGRAM_BOT_TOKEN}/AwACAgUAAxkBAAMuZ4eWxuMRmVugy1_VdGGZnMpdFC0AAgcVAAJXvjhUCknRSi93UTY2BA`;

// //   //   //TODO: get the file from local

// //   //   //TODO: convert the file to text

// //   //   console.log("file id", fileUrl);
// //   //   const loader = new AudioTranscriptLoader(
// //   //     {
// //   //       audio: fileUrl,
// //   //     },
// //   //     {
// //   //       apiKey: env.ASSEMBLYAI_API_KEY,
// //   //     },
// //   //   );
// //   //   const docs = await loader.load();
// //   //   console.dir(docs, { depth: Infinity });
// // };

// // convertVoiceToText();

// import { type Api, Bot, type Context } from "grammy";
// import {
//   type FileFlavor,
//   type FileApiFlavor,
//   hydrateFiles,
// } from "@grammyjs/files";
// import { env } from "@/env";
// import { AudioTranscriptLoader } from "@langchain/community/document_loaders/web/assemblyai";

// type MyContext = FileFlavor<Context>;
// type MyApi = FileApiFlavor<Api>;

// const bot = new Bot<MyContext, MyApi>(env.TELEGRAM_BOT_TOKEN);

// bot.api.config.use(hydrateFiles(bot.token));

// const downloadFile = async (fileId: string) => {
//   const file = await bot.api.getFile(fileId);
//   const fileUrl = await file.getUrl();

//   const loader = new AudioTranscriptLoader(
//     {
//       audio: fileUrl,
//     },
//     {
//       apiKey: env.ASSEMBLYAI_API_KEY,
//     },
//   );
//   const docs = await loader.load();
//   return docs[0]?.metadata.text;
// };

// downloadFile(
//   "AwACAgUAAxkBAAMuZ4eWxuMRmVugy1_VdGGZnMpdFC0AAgcVAAJXvjhUCknRSi93UTY2BA",
// );

// import { DynamicStructuredTool, DynamicTool } from "@langchain/core/tools";
// import { z } from "zod";
// import { ChatOpenAI } from "@langchain/openai";

// const model = new ChatOpenAI({
//   modelName: "gpt-3.5-turbo",
//   temperature: 0,
// });

// const currentDateTool = new DynamicTool({
//   name: "get_current_date",
//   description: "get the current date",
//   func: async () => {
//     return new Date().toISOString();
//   },
// });

// const createEventTool = new DynamicTool({
//   name: "create_event",
//   description: "create an event",
//   func: async () => {
//     return "Event created";
//   },
// });

// const tools = [currentDateTool, createEventTool];

// const agent = await initializeAgentExecutorWithOptions(tools, model, {
//   agentType: "openai-functions",
//   verbose: true,
// });

// const result = await agent.invoke({
//   input: "What is the tomorrow date?",
// });

// console.log("result", result);

// import { ChatOpenAI } from "@langchain/openai";
// import { tool } from "@langchain/core/tools";
// import { z } from "zod";
// import { ChatPromptTemplate } from "@langchain/core/prompts";
// import { createToolCallingAgent } from "langchain/agents";
// import { AgentExecutor } from "langchain/agents";
// import { createReactAgent } from "@langchain/langgraph/prebuilt";

// const prompt = ChatPromptTemplate.fromMessages([
//   ["system", "You are a helpful assistant"],
//   ["placeholder", "{chat_history}"],
//   ["human", "{input}"],
//   ["placeholder", "{agent_scratchpad}"],
// ]);

// const llm = new ChatOpenAI({
//   model: "gpt-3.5-turbo",
//   temperature: 0,
// });

// /**
//  * Note that the descriptions here are crucial, as they will be passed along
//  * to the model along with the class name.
//  */
// const calculatorSchema = z.object({
//   operation: z
//     .enum(["add", "subtract", "multiply", "divide"])
//     .describe("The type of operation to execute."),
//   number1: z.number().describe("The first number to operate on."),
//   number2: z.number().describe("The second number to operate on."),
// });

// const calculatorTool = tool(
//   async ({ operation, number1, number2 }) => {
//     // Functions must return strings
//     if (operation === "add") {
//       return `${number1 + number2}`;
//     } else if (operation === "subtract") {
//       return `${number1 - number2}`;
//     } else if (operation === "multiply") {
//       return `${number1 * number2}`;
//     } else if (operation === "divide") {
//       return `${number1 / number2}`;
//     } else {
//       throw new Error("Invalid operation.");
//     }
//   },
//   {
//     name: "calculator",
//     description: "Can perform mathematical operations.",
//     schema: calculatorSchema,
//   },
// );

// // const agent = createToolCallingAgent({
// //   llm,
// //   tools: [calculatorTool],
// //   prompt,
// // });

// // const agentExecutor = new AgentExecutor({
// //   agent,
// //   tools: [calculatorTool],
// // });

// const app = createReactAgent({
//   llm,
//   tools: [calculatorTool],
// });

// let agentOutput = await app.invoke({
//   messages: [
//     {
//       role: "user",
//       content: "What is 3 * 12? Also, what is 11 + 49?",
//     },
//   ],
// });

// const messageHistory = agentOutput.messages;
// const newQuery = "What is 11 * 12?";

// agentOutput = await app.invoke({
//   messages: [...messageHistory, { role: "user", content: newQuery }],
// });

// console.log("Response:", agentOutput);

import {
  GmailCreateDraft,
  GmailGetMessage,
  GmailGetThread,
  GmailSearch,
  GmailSendMessage,
} from "@langchain/community/tools/gmail";
import { type StructuredTool } from "@langchain/core/tools";
import { OpenAI } from "@langchain/openai";
import { initializeAgentExecutorWithOptions } from "langchain/agents";

export async function run() {
  const model = new OpenAI({
    temperature: 0,
    apiKey: process.env.OPENAI_API_KEY,
  });
  //   These are the default parameters for the Gmail tools
  const gmailParams = {
    credentials: {
      clientEmail: "ayusharyanrocky@gmail.com",
      privateKey:
        "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC8lPi8PHOsXTpD\n+yPqujneBAnUtozY81Oi6g7xZ9B79R0LQtNOSAaG5lSN5R3XTNNQ+PupOpwEBMzU\nw+z0qE826pHwmTMoLKt5T2koircu7CCSjxH0fXvmWKvIWDAib0SYM3ZnhpUtB8S7\n/KXAG01bKoQ1d2h0yfBFTrNgLNniCzzIhHvjxPiBC8FagwvQLh73WMtSOO87pFxx\nle8el552rk2Zc+ZFBoxuf+PZ6rDqsxHodRaLVv3koKo2ovIkzUE0U6xnv3npDeAv\nigSn8EbYpBCZJ3VfNiTiMUpIw5MpgoMm+1QEJAlGE+xo7OLorNHqKUOIk56O72qi\ny0Z+U6q9AgMBAAECggEAXEFQsd2tBQySnYE13/X8qzU0jgBERTo8lz2D0+tindGa\nxNCLSQeJUeNKSCRnBdXKpxk3HGHUw06J2iiDOmlAX3A/twFremLn/C+yFShPV0Ai\n6y/cq8vbmiOU3izuV1oxp3e9nAXF4sKjJwgBGksA+/F/vhxNWJ0V0wIeVJV8fc0C\n1kSoEXd/tzvjohSoyCTWSoZU+iqwxiLh/pmufmyjANP7LdNCCorE5ylDSx73W2Yv\nofbmMDCsU1EiBTEapYy0AfJM644ABZFEIljq2ceopaz7N/Hjbwn/++FhozYh3U+J\nLnoLMgzeulxHJLviejBBTHjSTkcVT0bExoeVDibxLQKBgQD5gcmJLXqXzLSDkAJU\n7pmmp3jzfl4LirnHjw69OlSCUHzrC5JDJnQ68eU8/6pBppKxu9/H4kc8petpD638\nqLxl8DmdoMHvwvlqANi4X26N2/2OcUQzBLUItWr3DbqQHNfpynHhiGfRpqQCwOOa\nC1rDknTMFAZYT+HImVERdaDlBwKBgQDBfU1i4Zp6xuJ1AYofHbVZCm0AgYroBzfz\n+s/5s7CP2E0wG6G2TOquq276uLrB9B1ZZNTtw68UOxhiAcdb8KovC40WZ2e9lxQG\nXdu2J+SQEfsRbWLqtId9XdijWFtuITtkIHk9n5QQR6sdpzavNHHQykUEUGCw0Pdr\nPC+TpdKlGwKBgQCWNLo9aTGqfUQXB/U/aDz8BUpdXDAFxsg9CTSYWqtRoF7zqY2t\n+1Jxwfp9lHTM/RjHAxGfZev46PIl15ioyHRS8iHdcVAPpVM9q7DMnjcSE+Q7gpjK\nFgVebsksXgl4hMS/LG8OlW3a2vVV6wWaUUedAWhrC4seU0jb2ODjH+tytQKBgA8j\nBVXR/mrSek7bAvoyMci4dxSODdbfEbKFkZWgSBTIwCkeUEVZuRZXFQSKRRn9RfqD\nV+EN6Pl1MhAgwX7g0f+CMNRq3IPJeOiSmSij8E6RCYowe4eO/faBy/vjYqu379SC\ncdmvTT8EzE8ykKWePbUuzb1rqFTM1D5QZAxx8Yu3AoGBAMHA4BtWi334Mj2CuLzw\nzSmy6YdZJqfxisLPrPPN0Myt1TPq5K7p1psq1VhhqY5eRRnTnE/zP4H+BvtZwSGd\nm7lmB7IjAWg5ok0j7HUI4UC5VRU/teI2FcOmNXiY8uMQC/4DyxrDIf8ldW+Srgab\nje320l9i32mmmtMJo0avjq/s\n-----END PRIVATE KEY-----\n",
    },
    scopes: ["https://mail.google.com/"],
  };

  const tools: StructuredTool[] = [
    new GmailCreateDraft(gmailParams),
    new GmailGetMessage(gmailParams),
    new GmailGetThread(gmailParams),
    new GmailSearch(gmailParams),
    new GmailSendMessage(gmailParams),
  ];

  const gmailAgent = await initializeAgentExecutorWithOptions(tools, model, {
    agentType: "structured-chat-zero-shot-react-description",
    verbose: true,
  });

  //   const createInput = `Create a gmail draft for me to edit of a letter from the perspective of a sentient parrot who is looking to collaborate on some research with her estranged friend, a cat. Under no circumstances may you send the message, however.`;

  //   const createResult = await gmailAgent.invoke({ input: createInput });

  //   console.log("Create Result", createResult);

  const viewInput = `Could you search in my drafts for the latest email?`;

  const viewResult = await gmailAgent.invoke({ input: viewInput });

  console.log("View Result", viewResult);
}

run();
