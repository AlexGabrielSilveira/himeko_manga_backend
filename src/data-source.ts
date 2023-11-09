import "reflect-metadata"
import { DataSource } from "typeorm"
import { Chapter } from "./entities/Chapters"
import { Manga } from "./entities/Mangas"
import { Page } from "./entities/Pages"
import { Scanlator } from "./entities/Scanlators"
import { User } from "./entities/Users"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST,
    port: 3306,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: "himeko",
    synchronize: true,
    logging: false,
    entities: [User, Scanlator, Page, Manga, Chapter],
})

AppDataSource.initialize()
    .then(() => {
        console.log("banco de dados on e roteando papai!")
    })
    .catch((error) => console.log(error))
