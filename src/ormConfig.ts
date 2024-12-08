import { DataSource } from "typeorm";
import path from "path";

const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  synchronize: true, // True only for dev!
  logging: false,
  entities: [path.join(__dirname, "models/**/*.js")],
  migrations: [path.join(__dirname, "migrations/**/*.js")],
  subscribers: [path.join(__dirname, "subscribers/**/*.js")],
});

export default AppDataSource;
