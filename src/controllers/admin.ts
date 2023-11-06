import { Response, Request } from 'express'
import { AppDataSource } from '../data-source'
import { z } from  'zod'
import { ScanlatorService } from '../services/scanlatorService'

export class AdminController {
    async createScanlator(req: Request, res: Response) {
        const{name, url} = req.body
        const scanlatorSchema = z.object({
            name: z.string().trim().min(3),
            url: z.string().url()
        })
        const parsedScanlator = scanlatorSchema.safeParse({ name, url})  

        if(!parsedScanlator.success){
            const formatted = parsedScanlator.error.format()

            return res.status(400).json({formatted})
        }
        const scanlatorService = new ScanlatorService()
    
        try {
            scanlatorService.create(name, url)
        } catch (error) {
            console.log(error)
        }
        res.status(200).json({ msg: "scanlator criada!"})
    }
}