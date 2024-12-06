import TelegramBot from "node-telegram-bot-api";
import { bot } from "..";

const messageHandler = (msg:TelegramBot.Message) => {
    try {
        const chatId = msg.from?.id;

        if(!chatId){
            throw Error(`Chat-id is ${chatId}`)
        }

        bot.sendMessage(chatId, "Отлично! Удачи в обучении!");
    } catch (error) {
        console.error(error);
    }
};

export default messageHandler;
