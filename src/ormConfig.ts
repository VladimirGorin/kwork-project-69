import { DataSource } from "typeorm";
import { User } from "./database/models/User";
import { Message } from "./database/models/Message";

const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  synchronize: false, // True only for dev!
  logging: false,
  entities: [User, Message],
  migrations: [],
  subscribers: [],
});

export default AppDataSource;
