import TelegramBot from "node-telegram-bot-api";
import { bot, users } from "..";
import { getMinutes } from "../utils";

const courseCommand = (msg:TelegramBot.Message) => {
    try {
        const chatId = msg.from?.id;

        if(!chatId){
            throw Error(`Chat-id is ${chatId}`)
        }

        bot.sendMessage(chatId, "Привет, вот ссылка на курс\n\nhttps://grigoriev.getcourse.ru/shark");
        const findUser = users.find(user => user.chatId === chatId)

        setTimeout(() => {
            bot.sendMessage(chatId, "Доступ придет на почту, сам курс проходит на платформе Геткурс.\nТам всего 6 модулей, каждый модуль это по сути мини-курс.\nЕсли вы новичек, то я рекомендую пройти все обучение, после него вы станете настоящей акулой инвестиций))\nНу а если уже давно в рынке и все знаете, то можно ограничится Фундаментальным и Техническим анализом. Это третий и четвертый модуль.");

            setTimeout(() => {
                bot.sendMessage(chatId, "В целом начать учиться это правильное решение, рынок это не место для дилетантов! И прощу серьёзно отнестись к обучению и его ценности, люди за такие курсы платят большие деньги.\nНо некоторые обычно не ценят то, что досталось им бесплатно.\n\nЕсли юзер что-то отвечает на это, то бот пишет -\n\nОтлично! Удачи в обучении!");

                if(findUser){
                    findUser.isThirdStep = true
                }else{
                    users.push({chatId, isThirdStep: false})
                }

            }, getMinutes(3));
        }, getMinutes(2));

    } catch (error) {
        console.error(error);
    }
};

export default courseCommand;
