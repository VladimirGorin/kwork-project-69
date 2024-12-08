import TelegramBot from "node-telegram-bot-api";
import { bot } from "..";
import {
  generateDialogAdminKeyboard,
  generateSendDialogReplyKeyboard,
} from "../keyboards/admin.keyboard";
import { getMessages } from "../../database/utils";
import { Message } from "../../database/models/Message";
import AppDataSource from "../../ormConfig";

const callbackQueryHandler = async (msg: TelegramBot.CallbackQuery) => {
  try {
    const query = msg.data;
    const chatId = msg.from.id;

    switch (query) {
      case "admin_dialogs":
        bot.sendMessage(
          chatId,
          "Диалоги:",
          await generateDialogAdminKeyboard()
        );
        break;
      default:
        if (query?.includes("admin_dialog_")) {
          const adminDialogChatId = query?.replace("admin_dialog_", "");
          const messageRepo = AppDataSource.getRepository(Message);
          const userMessages = await getMessages(adminDialogChatId);

          if (userMessages && userMessages.length > 0) {
            let allMessages = "";

            userMessages.forEach((message: Message) => {
              if (message.messages && message.messages.length > 0) {
                message.messages.forEach((msgContent) => {
                  msgContent.adminRead = true;
                  allMessages += `${msgContent.text}\n`;
                });
              }
            });

            messageRepo.save(userMessages)

            if (allMessages) {
              const buffer = Buffer.from(allMessages, "utf-8");

              bot.sendDocument(
                chatId,
                buffer,
                {
                  caption: "Сообщения от этого пользователя:",
                  reply_markup:
                    generateSendDialogReplyKeyboard(adminDialogChatId)
                      .reply_markup,
                },
                { filename: "file.txt", contentType: "text/plain" }
              );
            } else {
              bot.sendMessage(
                chatId,
                "Сообщений от этого пользователя не найдено"
              );
            }
          } else {
            bot.sendMessage(chatId, "У пользователя не найдены сообщения");
          }
        } else if (query?.includes("admin_message_reply_")) {
          const adminMessageReplyChatId = query?.replace(
            "admin_message_reply_",
            ""
          );

          function messageReplyHandler(msg: TelegramBot.Message) {
            try {
              const text = msg.text || msg.caption || "Текст от админа не найден!";
              if (text === "/cancel") {
                bot.removeListener("message", messageReplyHandler);
                bot.sendMessage(chatId, "Отменено");
                return
              }

              bot.sendMessage(adminMessageReplyChatId, text).then(() => {
                bot.sendMessage(chatId, "Сообщение успешно отправлено!");
              });

              bot.removeListener("message", messageReplyHandler);
            } catch (error) {
              bot.sendMessage(
                chatId,
                `Ошибка при попытки отправки сообщения пользователю ${error}`
              );
            }
          }

          bot.sendMessage(
            chatId,
            "Пришлите сообщение которое будет отправлено пользователю (или /cancel для отмены):"
          );
          bot.on("message", messageReplyHandler);
        }
        break;
    }
  } catch (error) {
    console.error(error);
  }
};

export default callbackQueryHandler;
