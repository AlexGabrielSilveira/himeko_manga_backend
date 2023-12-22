import { Response, Request } from 'express'
import { z } from  'zod'
import { ScanlatorService } from '../services/scanlatorService'
import { MangaService } from '../services/mangaService'
import { ChapterService } from '../services/chapterService'

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

        let logoUrl
        if(req.file) {
            logoUrl = `${process.env.BASE_URL}/uploads/${req.file.filename}`
        }
    
        try {
            await scanlatorService.create(name, url, logoUrl)
        } catch (error) {
            console.log(error)
        }
        res.status(200).json({ msg: "scanlator criada!"})
    }
    async createManga(req: Request, res: Response) {
        const{name, tags, note, description, img,  mal_id, authors} = req.body

        const mangaSchema = z.object({
            name: z.string().trim().min(3), 
            tags: z.string().trim(), 
            authors: z.string().trim(), 
            note: z.string().trim(), 
            description: z.string(), 
            img: z.string().trim(),
            mal_id: z.number()
        })
        const mangaParsed = mangaSchema.safeParse({name, tags, note, description, img, mal_id ,authors})

        if(!mangaParsed.success) {
            const formatted = mangaParsed.error.format()
            return res.status(400).json({formatted})
        }
        const mangaService = new MangaService()

        try {
            const capeUrl = await mangaService.saveCapeImage(img, name)
            await mangaService.create(name, note, tags, description, capeUrl, mal_id, authors)
        }catch(err) {
            console.log(err)
        }
        res.status(200).json({ msg: "Manga criado!"})
    }
    async createChapter(req: Request, res: Response) {
        if(req.files == undefined) return res.send('Arquivos não encontrados!')
        //@ts-ignore
        let filesPath = req.files?.map((file: any) => {
            return  `${process.env.BASE_URL}/uploads/${file.filename}`
        })

        const chapter = new ChapterService()
        chapter.create(parseFloat(req.params.chapterNumber), req.body.scanlator, filesPath, parseInt(req.params.mangaId))
        
    }
}