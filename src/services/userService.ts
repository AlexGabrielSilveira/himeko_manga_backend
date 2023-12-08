import bcrypt from 'bcrypt'
import { AppDataSource } from '../data-source'
import { User } from '../entities/Users'
import jwt from 'jsonwebtoken'
import axios from 'axios'
import qs from 'qs'

interface GoogleTokenResult {
    access_token: string,
    expires_in: number,
    refresh_token: string,
    scope: string,
    id_token: string
}
interface CreateProps {
    name: string,
    email: string,
    picture: string,
    oauthClient: string
}
interface GoogleTokenDecoded {
    name: string,
    email: string,
    picture: string,
}
export class UserService {
    public async create({
        name,
        email,
        picture,
        oauthClient
    }: CreateProps) {
        const userRepository = AppDataSource.getRepository(User)
        const user = new User()
        user.name = name
        user.email = email
        user.oauthClient = oauthClient
        user.picture = picture
        
        await userRepository.save(user)
        return user
    }
    public async loginWithGoogle({ code }: {code:string}): Promise<User> {
        const url = "https://oauth2.googleapis.com/token"
        const values = {
            code,
            client_id: process.env.GOOGLE_CLIENT_ID,
            client_secret: process.env.GOOGLE_CLIENT_SECRET,
            redirect_uri: process.env.REDIRECT_URL,
            grant_type: 'authorization_code'
        }
        try {
            const res = await axios.post<GoogleTokenResult>(url, qs.stringify(values), {
                headers: {
                    "Content-Type": 'application/x-www-form-urlencoded'
                }
            })
            const userData = jwt.decode(res.data.id_token) as GoogleTokenDecoded
            
            return await this.findOrCreate({
                name: userData.name,
                email: userData.email,
                picture: userData.picture,
                oauthClient: "google"
            })
        }catch(err: any) {
            console.log('failed to fetch google token')
            throw new Error(err.message)
        }
    }
    public async findOrCreate({
        name,
        email,
        picture,
        oauthClient
    }: CreateProps) {
        const userRepository = AppDataSource.getRepository(User)
        const userExists = await userRepository.findOneBy({ email, oauthClient })
    
        if(userExists) {
            return userExists
        }

        return await this.create({name, email, picture, oauthClient})
    }
    public generateUserToken(email: string, userId: number) {
        if(process.env.SECRET == undefined) {
            throw new Error('Cannot assign jwt token if a undefined secret')
        }
        const token = jwt.sign({ email }, process.env.SECRET, {
            expiresIn: 300,
            subject: userId.toString()
        })
        return token
    }
    public validateToken(token: string) {
        try{
            return jwt.verify(token, process.env.SECRET as string)
        }catch(err) {
            return false
        }
    }
    public async findById(id: number) {
        const userRepository = AppDataSource.getRepository(User)
        const user = await userRepository.findOneBy({ id })

        return user
    }
}