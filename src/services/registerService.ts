import { AppDataSource } from "../data-source"
import { User } from "../entities/Users"
import bcrypt from 'bcrypt'

export class RegisterService {
    public async register(email: string, password: string) {
        const userRepository = AppDataSource.getRepository(User)
        const userExists = await userRepository.findOneBy({ email })
    
        if(userExists) {
            throw new Error("Este e-mail ja está sendo usado!");
        }
    
        const salt = await bcrypt.genSalt(12)
        const hashPassword = await bcrypt.hash(password, salt)
        return hashPassword
    }
}

