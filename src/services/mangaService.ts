import { AppDataSource } from "../data-source";
import { Manga } from "../entities/Mangas";
import fsPromises from 'fs/promises'
import fs from 'fs'
import path from "node:path"

interface CreateParams {
    name: string
    authors: string
    note: string
    tags: string
    description: string
    capeUrl: string
    mal_id: number
    createdByUserId: number
}

export class MangaService {
    public async create({
        name, 
        note, 
        tags, 
        description, 
        capeUrl, 
        mal_id, 
        authors,
        createdByUserId,
    }: CreateParams) {
        const mangaRespository = AppDataSource.getRepository(Manga)

        const manga = new Manga()
        manga.name = name
        manga.tags = tags
        manga.authors = authors
        manga.note = note
        manga.description = description
        manga.cape_url = capeUrl,
        manga.mal_id = mal_id
        manga.createdById = createdByUserId

        await mangaRespository.save(manga)
    }
    public async saveCapeImage(url: string, name: string) {
        let nameReplace =  name.replace(/[^\w\s]/gi, '')

        const image = await fetch(url)
        const mangaFilesPath = path.join(__dirname, "..", "..", `/uploads/mangas/${nameReplace}/`)
        const imagePath = path.join(mangaFilesPath, "cape.jpg")  

        if(!fs.existsSync(mangaFilesPath)) {
            await fsPromises.mkdir(mangaFilesPath)
        }
        await fsPromises.writeFile(imagePath, Buffer.from(await image.arrayBuffer()))
        const capeUrl = `${process.env.BASE_URL}/uploads/mangas/${nameReplace}/cape.jpg`
        return capeUrl
    }
}