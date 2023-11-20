import { AppDataSource } from "../data-source";
import { Manga } from "../entities/Mangas";
import fsPromises from 'fs/promises'
import fs from 'fs'
import path from "node:path"

export class MangaService {
    public async create(name: string, note: string, tags: string, description: string, img: string) {
        const mangaRespository = AppDataSource.getRepository(Manga)

        const manga = new Manga()
        manga.name = name
        manga.tags = tags
        manga.note = note
        manga.description = description
        manga.cape_url = img

        await mangaRespository.save(manga)
    }
    public async saveCapeImage(url: string, name: string) {
        const image = await fetch(url)
        const mangaFilesPath = path.join(__dirname, "..", "..", `/uploads/mangas/${name}/`)
        const imagePath = path.join(mangaFilesPath, "cape.jpg")  

        if(!fs.existsSync(mangaFilesPath)) {
            await fsPromises.mkdir(mangaFilesPath)
        }
        await fsPromises.writeFile(imagePath, Buffer.from(await image.arrayBuffer()))
        const capeUrl = `${process.env.BASE_URL}/uploads/mangas/${name}/cape.jpg`
        return capeUrl
    }
}