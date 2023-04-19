import "reflect-metadata"
import { DataSource } from "typeorm"
import { Pokemon } from "./entity/Pokemon"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "postgres",
    database: "postgres",
    synchronize: true,
    dropSchema: true,
    logging: !!process.env.LOGGING,
    entities: [Pokemon],
    migrations: [],
    subscribers: [],
})
