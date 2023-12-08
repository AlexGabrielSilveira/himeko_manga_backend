import { NextFunction, Response, Request } from "express";
import { UserService } from "../services/userService";


export async function Auth(req: Request, res: Response, next: NextFunction) {
    const tokenWithBearer = req.headers.authorization 

    if (typeof tokenWithBearer !== 'string') {
        return next();
    }
    const separateString: string[] = tokenWithBearer.split(' ')
    const token: string = separateString[1]
    const userService = new UserService()
    const decodedToken = userService.validateToken(token)

    if (!decodedToken) {
        return res.status(401).send("Invalid token");
    }
    const user = await userService.findById(Number(decodedToken.sub as string))

    if (!user) {
        return res.status(401).send("User not found")
    }
    
    (req as any).user = user;
    next()
}
