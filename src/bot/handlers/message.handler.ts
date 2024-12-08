import TelegramBot from "node-telegram-bot-api";
import { sendToAdminMessage } from "../middleware/adminMessage.middleware";
import { findUser } from "../../database/utils";
import { bot } from "..";
import AppDataSource from "../../ormConfig";
import { User } from "../../database/models/User";

const messageHandler = async (msg: TelegramBot.Message) => {
  try {
    const text = msg.text || msg.caption
    if (text?.startsWith('/')) return;
    await sendToAdminMessage(msg)

    const userRepo = AppDataSource.getRepository(User);
    const user = await findUser(msg);

    if(text?.includes("курс")){
      bot.sendMessage(user.chatId, "Привет, вот ссылка на курс\n\nhttps://grigoriev.getcourse.ru/shark")

      setTimeout(() => {
        bot.sendMessage(user.chatId, "Доступ придет на почту, сам курс проходит на платформе Геткурс.\nТам всего 6 модулей, каждый модуль это по сути мини-курс.\nЕсли вы новичек, то я рекомендую пройти все обучение, после него вы станете настоящей акулой инвестиций))\nНу а если уже давно в рынке и все знаете, то можно ограничится Фундаментальным и Техническим анализом. Это третий и четвертый модуль.")
        setTimeout(() => {
          bot.sendMessage(user.chatId, "В целом начать учиться это правильное решение, рынок это не место для дилетантов! И прощу серьёзно отнестись к обучению и его ценности, люди за такие курсы платят большие деньги.\nНо некоторые обычно не ценят то, что досталось им бесплатно.")
          user.isEndStart = true

          userRepo.save(user)

        }, 3 * 60 * 1000);
      }, 2 * 60 * 1000);
    }else{
      if(user.isEndStart){
        bot.sendMessage(user.chatId, "Отлично! Удачи в обучении!")
      }
    }


  } catch (error) {
    console.error(error);
  }
};

export default messageHandler;
