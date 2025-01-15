import { Bot, InlineKeyboard } from "grammy";

//Store bot screaming status
let screaming = false;

//Create a new bot
const bot = new Bot("7848616744:AAHYJ5-VzXv2oqMZCsPp9E2p02WEIJNSaIY");

//This function handles the /scream command
bot.command("scream", () => {
  screaming = true;
});

//This function handles /whisper command
bot.command("whisper", () => {
  screaming = false;
});

//Pre-assign menu text
const firstMenu =
  "<b>Menu 1</b>\n\nA beautiful menu with a shiny inline button.";
const secondMenu =
  "<b>Menu 2</b>\n\nA better menu with even more shiny inline buttons.";

//Pre-assign button text
const nextButton = "Next";
const backButton = "Back";
const tutorialButton = "Tutorial";

//Build keyboards
const firstMenuMarkup = new InlineKeyboard().text(nextButton, nextButton);

const secondMenuMarkup = new InlineKeyboard()
  .text(backButton, backButton)
  .text(tutorialButton, "https://core.telegram.org/bots/tutorial");

//This handler sends a menu with the inline buttons we pre-assigned above
bot.command("menu", async (ctx) => {
  await ctx.reply(firstMenu, {
    parse_mode: "HTML",
    reply_markup: firstMenuMarkup,
  });
});

//This handler processes back button on the menu
bot.callbackQuery(backButton, async (ctx) => {
  //Update message content with corresponding menu section
  await ctx.editMessageText(firstMenu, {
    reply_markup: firstMenuMarkup,
    parse_mode: "HTML",
  });
});

//This handler processes next button on the menu
bot.callbackQuery(nextButton, async (ctx) => {
  //Update message content with corresponding menu section
  await ctx.editMessageText(secondMenu, {
    reply_markup: secondMenuMarkup,
    parse_mode: "HTML",
  });
});

//This function handles messages coming from the Bot API
bot.on("message", async (ctx) => {
  //Print to console
  console.log(
    `${ctx.from.first_name} wrote ${
      "text" in ctx.message ? ctx.message.text : ""
    }`,
  );

  // Check if the message contains text
  if (!ctx.message.text) {
    await ctx.reply("Please send me a text message!");
    return;
  }

  // Convert message to lowercase for easier comparison
  const userMessage = ctx.message.text.toLowerCase();

  // Define responses for different messages
  if (userMessage.includes("hello") || userMessage.includes("hi")) {
    await ctx.reply(`Hello ${ctx.from.first_name}! How can I help you today?`);
  } else if (userMessage.includes("how are you")) {
    await ctx.reply("I'm doing great, thanks for asking! How about you?");
  } else if (userMessage.includes("bye")) {
    await ctx.reply("Goodbye! Have a great day! 👋");
  } else if (userMessage.includes("weather")) {
    await ctx.reply(
      "I'm sorry, I don't have access to weather information yet!",
    );
  } else {
    // Default response for unrecognized messages
    await ctx.reply(
      "I'm not sure how to respond to that. Try saying 'hello' or ask me how I am!",
    );
  }
});

//Start the Bot
await bot.start();
