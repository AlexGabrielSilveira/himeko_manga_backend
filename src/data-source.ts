import "reflect-metadata"
import { DataSource } from "typeorm";
import { User } from './entities/User';

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: "himeko",
    synchronize: true,
    logging: false,
    entities: [User],
})

AppDataSource.initialize()
    .then(() => {
        console.log('database has been connected!')
    })
.catch((error) => console.log(error))