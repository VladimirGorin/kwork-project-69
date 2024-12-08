import TelegramBot from "node-telegram-bot-api";
import { addMessage, findUser, getAdmins } from "../../database/utils";
import { bot } from "..";

export const sendToAdminMessage = async (msg: TelegramBot.Message) => {
  const text = msg.text || msg.caption || "Текст не найден";
  const user = await findUser(msg);

  if (!user?.isAdmin) {
    const admins = await getAdmins();

    for (const admin of admins) {
      bot.sendMessage(
        admin.chatId,
        `Пользователь ${user.username} отправил сообщение:\n<a>${text}</a>`,
        { parse_mode: "HTML" }
      );
      await addMessage(
        {
          text: text,
          adminRead: false,
        },
        user.chatId
      );
    }
  }
};
