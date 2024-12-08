import TelegramBot from "node-telegram-bot-api";
import messageHandler from "./message.handler";
import callbackQueryHandler from "./callbackQuery.handler";

export interface IMessageHandler {
  handler: "message";
  function: (message: TelegramBot.Message) => void;
}

export interface ICallbackQueryHandler {
  handler: "callback_query";
  function: (query: TelegramBot.CallbackQuery) => void;
}

export type IHandler = IMessageHandler | ICallbackQueryHandler;

const handlersList: IHandler[] = [
  {
    handler: "message",
    function: messageHandler,
  },
  {
    handler: "callback_query",
    function: callbackQueryHandler,
  },
];

export default handlersList;
