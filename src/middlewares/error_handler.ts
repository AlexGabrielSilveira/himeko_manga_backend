import { NextFunction } from "express";
import { Response, Request } from 'express'

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {

    console.log(err)

    res.status(500)
    res.render('error')
}