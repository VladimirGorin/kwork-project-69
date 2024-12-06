import TelegramBot from "node-telegram-bot-api";
import startCommand from "./start.command";
import courseCommand from "./course.command";

export interface ICommand {
  command: RegExp;
  function: (message: TelegramBot.Message) => void;
}

const commandsList: ICommand[] = [
  {
    command: /\/start/,
    function: startCommand,
  },
  {
    command: /\курс/,
    function: courseCommand,
  },
];

export default commandsList;
