import TelegramBot from "node-telegram-bot-api";
import { bot } from "..";
import { findUser } from "../../database/utils";
import { sendToAdminMessage } from "../middleware/adminMessage.middleware";
import { startAdminKeyboard } from "../keyboards/admin.keyboard";

const startCommand = async (msg: TelegramBot.Message) => {
  try {
    const user = await findUser(msg);
    await sendToAdminMessage(msg);

    if (user.isAdmin) {
      bot.sendMessage(user.chatId, `Привет Админ!`, startAdminKeyboard);
    } else {
      bot.sendMessage(
        user.chatId,
        `Привет!`
      );
    }
  } catch (error) {
    console.error(error);
  }
};

export default startCommand;
