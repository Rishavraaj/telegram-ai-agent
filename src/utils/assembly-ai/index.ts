import { type Api, Bot, type Context } from "grammy";
import {
  type FileFlavor,
  type FileApiFlavor,
  hydrateFiles,
} from "@grammyjs/files";
import { env } from "@/env";
import { AudioTranscriptLoader } from "@langchain/community/document_loaders/web/assemblyai";

type MyContext = FileFlavor<Context>;
type MyApi = FileApiFlavor<Api>;

const bot = new Bot<MyContext, MyApi>(env.TELEGRAM_BOT_TOKEN);

bot.api.config.use(hydrateFiles(bot.token));

export const convertVoiceToText = async (fileId: string) => {
  const file = await bot.api.getFile(fileId);
  const fileUrl = await file.getUrl();

  //converted to text
  const loader = new AudioTranscriptLoader(
    {
      audio: fileUrl,
    },
    {
      apiKey: env.ASSEMBLYAI_API_KEY,
    },
  );
  const docs = await loader.load();
  return docs[0]?.metadata.text;
};
