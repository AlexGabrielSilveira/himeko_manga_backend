import { Response, Request } from 'express'
import { User } from '../entities/Users'
import { AppDataSource } from '../data-source'
import { UserService } from '../services/userService'
import { z } from 'zod'

export class AuthController {
    async login(req: Request, res: Response) {
        const {email, password} = req.body

        const loginSchema = z.object({
            email: z.string().trim().email(),
            password: z.string().trim().min(8)
        })
        const parsedLogin = loginSchema.safeParse({email, password})
        if(!parsedLogin.success) {
            const formatted = parsedLogin.error.format()
            return res.status(422).json({msg: formatted})
        }

        const userRepository = AppDataSource.getRepository(User)
        const user = await  userRepository.findOneBy({email})
        if(!user) {
            return res.status(404).json({ msg: "Usuário não encontrado!"})
        }
        const userService = new UserService()
        try {
            const token = await userService.login(email, password)
            return res.status(200).json({msg: "Autenticado com sucesso!", token})
        } catch (error) {
            if(error instanceof Error)  {
                if(error.message === 'User not found!') {
                    return res.status(404).json({msg: "User not found!"})
                }
                if(error.message === "Passwords doesn't matches!") {
                    return res.status(404).json({msg: "Confira suas credenciais!"})
                }
            }
            return res.status(500).json({ msg: "deu ruim!"})
        }
    }
    async register(req: Request, res: Response) {
        const { username, password, email} = req.body
        const registerSchema = z.object({
            username: z.string().trim().min(3),
            email: z.string().trim().email(),
            password: z.string().trim().min(8)
        })
        const parsedRegister = registerSchema.safeParse({username, email, password})

        if(!parsedRegister.success) {
            const formatted  = parsedRegister.error.format()
            return res.status(422).json({msg: formatted})
        }
        const userService =  new UserService()
        
        try {
            await userService.register(username, email, password)
        } catch (error) {
            if(error instanceof Error) {
                if(error.message === "Este e-mail ja está sendo usado!") {
                    return res.status(422).json({ msg: "esse e-mail já está cadastrado em nosso banco de dados!"})
                }
            }
        }
        res.status(200).json({msg: "Registrado com sucesso!"})
    }
}
