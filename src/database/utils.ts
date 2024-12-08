import AppDataSource from "../ormConfig";
import { User } from "../database/models/User";
import { Message, MessageContent } from "./models/Message";
import TelegramBot from "node-telegram-bot-api";

export const findUser = async (msg: TelegramBot.Message) => {
  const chatId = (msg.from?.id || msg.chat.id).toString();
  const username = msg.from?.username
    ? `${msg.from?.first_name} ${msg.from?.last_name}`
    : msg.from?.username;

  const userRepo = AppDataSource.getRepository(User);
  let user = await userRepo.findOne({ where: { chatId } });

  if (!user) {
    user = userRepo.create({
      chatId,
      username: username,
    });

    await userRepo.save(user);
  }

  return user;
};

export const addMessage = async (
  messageData: MessageContent,
  chatId: string
) => {
  const messageRepo = AppDataSource.getRepository(Message);

  let message = await messageRepo.findOne({ where: { chatId } });

  if (!message) {
    message = messageRepo.create({
      chatId,
      messages: [messageData],
    });
  } else {
    message.messages.push(messageData);
  }

  await messageRepo.save(message);
  return message;
};

export const getAdmins = async () => {
  const adminRepo = AppDataSource.getRepository(User);
  const admins = await adminRepo.find({ where: { isAdmin: true } });

  return admins;
};

export const getUsers = async () => {
  const userRepo = AppDataSource.getRepository(User);
  const users = await userRepo.find();

  return users;
};

export const getMessages = async (chatId:string="") => {
  const messageRepo = AppDataSource.getRepository(Message);
  if (chatId.length) {
    return await messageRepo.find({ where: { chatId } });
  } else {
    return await messageRepo.find();
  }
};
