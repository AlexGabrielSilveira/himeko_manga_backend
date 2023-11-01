import bcrypt from 'bcrypt'
import { AppDataSource } from '../data-source'
import { User } from '../entities/User'
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
}