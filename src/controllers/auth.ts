import { Response, Request } from 'express'
import { User } from '../entities/Users'
import { AppDataSource } from '../data-source'
import { UserService } from '../services/userService'
import { z } from 'zod'

export class AuthController {
    async googleOAuth(req: Request, res: Response) {
        try {
            const userService = new UserService
            const code = req.query.code as string
            
            const user = await userService.loginWithGoogle({ code })
            const token = userService.generateUserToken(user.email, user.id)

            return res.json({token})
        }catch(err) {
            return res.status(500).json({msg: "deu ruim"!})
        }

    }
} 
