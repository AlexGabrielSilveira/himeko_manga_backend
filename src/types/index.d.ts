import { User } from "../entities/Users";
import { Request } from 'express';

declare module 'express' {
    export interface Request {
        user?: User;  
    }
}