import { convertVoiceToText } from "../assembly-ai";

type Message = {
  text: string;
  voice: {
    duration: number;
    mime_type: string;
    file_id: string;
    file_unique_id: string;
    file_size: number;
  };
};

export const determineMessageType = async (message: Message) => {
  if (message.text) {
    return "this is a text message";
  }
  if (message.voice) {
    const text = await convertVoiceToText(message.voice.file_id);
    return text;
  }
};
