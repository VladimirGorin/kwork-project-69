import TelegramBot from "node-telegram-bot-api";
import { bot } from "..";

const startCommand = (msg:TelegramBot.Message) => {
    try {
        const chatId = msg.from?.id;

        if(!chatId){
            throw Error(`Chat-id is ${chatId}`)
        }

        bot.sendMessage(chatId, "Привет!");


    } catch (error) {
        console.error(error);
    }
};

export default startCommand;
