import { Response, Request } from 'express'
import { UserService } from '../services/userService'

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
    async me(req: Request, res: Response) {
        const user = req.user
        if(user == null) {
            return res.status(401)
        }

        res.send(user)
    }
} 
