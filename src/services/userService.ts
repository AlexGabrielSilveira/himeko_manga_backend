import bcrypt from 'bcrypt'
import { AppDataSource } from '../data-source'
import { User } from '../entities/Users'
import jwt from 'jsonwebtoken'

export class UserService {
    public async login(email: string, password: string) {
        const userRepository = AppDataSource.getRepository(User)
        const user = await  userRepository.findOneBy({email})
        if(!user) {
            throw new Error('User not found!')
        }
        const decodePassword = await bcrypt.compare(password, user.password)
        if(!decodePassword) {
            throw new Error("Passwords doesn't matches!");
        }

        if(process.env.SECRET == undefined) {
            throw new Error('Cannot assign jwt token if a undefined secret')
        }
        const token = jwt.sign({
            id:user.id
        }, process.env.SECRET)
        return token
    }
    
    public async register(username: string,email: string, password: string) {
        const userRepository = AppDataSource.getRepository(User)
        const userExists = await userRepository.findOneBy({ email })
    
        if(userExists) {
            throw new Error("Este e-mail ja está sendo usado!");
        }
    
        const salt = await bcrypt.genSalt(12)
        const hashPassword = await bcrypt.hash(password, salt)
        
        const user = new User()
        user.name = username
        user.email = email
        user.password = hashPassword
        
        await userRepository.save(user)
        
    }
}