import { DataSource } from "typeorm";
import path from "path";

const isDevelopment = process.env.NODE_ENV === "development";

const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.POSTGRES_HOST,
    port: Number(process.env.POSTGRES_PORT),
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    synchronize: isDevelopment ? true : false, // True only for dev!
    logging: false,
    entities: [
        path.join(
            __dirname,
            isDevelopment ? "models/**/*.ts" : "models/**/*.js"
        ),
    ],
    migrations: [
        path.join(
            __dirname,
            isDevelopment ? "migrations/**/*.ts" : "migrations/**/*.js"
        ),
    ],
    subscribers: [
        path.join(
            __dirname,
            isDevelopment ? "subscribers/**/*.ts" : "subscribers/**/*.js"
        ),
    ],
});

export default AppDataSource;
