import express, { Response, Request } from 'express'
const router = express.Router()
import { User } from '../entities/Users'
import bcrypt from 'bcrypt'
import { AppDataSource } from '../data-source'
import { UserService } from '../services/loginService'
import { RegisterService } from '../services/registerService'


router.post("/login", async(req: Request, res: Response) => {
    const {email, password} = req.body
    
    const credentialsCheck = {
        password: password == null || password == undefined || !password,
        email: email == null || email == undefined || !email,
    }

    if(credentialsCheck.password || credentialsCheck.email) {
        return res.status(422).json({msg: "Suas credencias não foram enviadas corretamente, verifique!"})
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
})
router.post("/register", async(req, res) => {
    const { username, password, email} = req.body

    const credentialsCheck = {
        username: username == null || username == undefined || !username,
        password: password == null || password == undefined || !password,
        email: email == null || email == undefined || !email,
    }

    if(credentialsCheck.username || credentialsCheck.password || credentialsCheck.email) {
        return res.status(422).json({msg: "Suas credencias não foram enviadas corretamente, verifique!"})
    }
    const registerService = new RegisterService()
    const userRepository = AppDataSource.getRepository(User)

    try {
        const hashPassword = await registerService.register(email, password)
        
        const user = new User()
        user.name = username
        user.email = email
        user.password = hashPassword
    await userRepository.save(user)
    } catch (error) {
        if(error instanceof Error) {
            if(error.message === "Este e-mail ja está sendo usado!") {
                return res.status(422).json({ msg: "esse e-mail já está cadastrado em nosso banco de dados!"})
            }
        }
    }

    res.status(200).json({msg: "Registrado com sucesso!"})
})

export default router