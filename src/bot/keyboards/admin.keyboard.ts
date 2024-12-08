import { getMessages, getUsers } from "../../database/utils";

const generateDialogAdmin = async () => {
  const messages = await getMessages();
  const users = await getUsers();

  const usersFilter = users.filter((user) =>
    messages.some((message) => message.chatId === user.chatId)
  );

  const inlineKeyboard = usersFilter.map((user) => [
    {
      text: `Chat ${user.chatId} (${user.username})`,
      callback_data: `admin_dialog_${user.chatId}`,
    },
  ]);

  return {
    reply_markup: {
      inline_keyboard: inlineKeyboard,
    },
  };
};

export const generateDialogAdminKeyboard = async () => {
  return await generateDialogAdmin();
};

export const generateSendDialogReplyKeyboard = (chatId: string | undefined) => {
  return {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "Отправить сообщение для пользователя",
            callback_data: `admin_message_reply_${chatId}`,
          },
        ],
      ],
    },
  };
};

export const startAdminKeyboard = {
  reply_markup: {
    inline_keyboard: [[{ text: "Диалоги", callback_data: "admin_dialogs" }]],
  },
};
