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

export const determineMessageType = (message: Message) => {
  if (message.text) {
    return "this is a text message";
  }
  if (message.voice) {
    return "this is a voice message";
  }
};
