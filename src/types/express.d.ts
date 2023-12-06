import { User } from "../entities/Users";

declare module 'express' {
    interface Request {
        user: User | null
    }
}