import { initializeAgentExecutorWithOptions } from "langchain/agents";
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
