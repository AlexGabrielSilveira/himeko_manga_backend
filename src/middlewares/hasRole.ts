import { Request, Response, NextFunction } from "express";

export function hasRole(role: string) {
    return (req: Request, res: Response, next: NextFunction) => {
        const user = req.user;

        if (user?.role === role) {
            next();
        } else {
            res.sendStatus(403);
        }
    };
}


