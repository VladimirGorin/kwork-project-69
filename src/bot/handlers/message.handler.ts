import TelegramBot from "node-telegram-bot-api";
import { bot, users } from "..";

const messageHandler = (msg:TelegramBot.Message) => {
    try {
        const chatId = msg.from?.id;

        if(!chatId){
            throw Error(`Chat-id is ${chatId}`)
        }

        const findUser = users.find(user => user.chatId === chatId)

        if(findUser){
            if(findUser.isThirdStep){
                bot.sendMessage(chatId, "Отлично! Удачи в обучении!");
            }
        }else{
            users.push({chatId, isThirdStep: false})
        }

    } catch (error) {
        console.error(error);
    }
};

export default messageHandler;
