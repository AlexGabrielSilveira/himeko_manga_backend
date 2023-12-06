import { NextFunction, Response, Request } from "express";
import { UserService } from "../services/userService";

export async function Auth(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization;
    
    if (typeof token !== 'string') {
        return next();
    }

    const userService = new UserService();
    const decodedToken = userService.validateToken(token);
    
    if (!decodedToken) {
        return res.status(401).send("Invalid token");
    }

    const user = await userService.findById(Number(decodedToken.sub as string));

    if (!user) {
        return res.status(401).send("User not found");
    }
    
    req.user = user;
    next();
}
