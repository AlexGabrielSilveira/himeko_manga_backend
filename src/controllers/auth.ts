import express, { Response, Request } from 'express'
const router = express.Router()
import { User } from '../entities/User'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { AppDataSource } from '../data-source'


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

    const decodePassword = await bcrypt.compare(password, user.password)
    if(!decodePassword) {
        return res.status(422).json({ msg: "Senha incorreta!"})
    }

    try {
        const secret = process.env.SECRET

        if(secret == undefined) {
            throw new Error('Cannot assign jwt token if a undefined secret')
        }

        const token = jwt.sign({
            id:user.id
        }, secret)

        res.status(200).json({msg: "Usuário autenticado!", token})
    }catch(err) {
        console.log(err)
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
    const userRepository = AppDataSource.getRepository(User)
    const userExists = await userRepository.findOneBy({ email })

    if(userExists) {
        return res.status(422).json({ msg: "esse e-mail já está cadastrado em nosso banco de dados!"})
    }

    const salt = await bcrypt.genSalt(12)
    const hashPassword = await bcrypt.hash(password, salt)

    const user = new User()
    user.name = username
    user.email = email
    user.password = hashPassword

    await userRepository.save(user)

    res.status(200).json({msg: "Registrado com sucesso!"})
})

export default router