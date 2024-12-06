import TelegramBot from "node-telegram-bot-api";
import messageHandler from "./message.handler";

export interface IHandler {
  handler: string;
  function: (message: TelegramBot.Message) => void;
}

const handlersList: IHandler[] = [
  {
    handler: "message",
    function: messageHandler,
  },
];

export default handlersList;
