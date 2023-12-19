import { AppDataSource } from "../data-source";
import { Manga } from "../entities/Mangas";
import fsPromises from 'fs/promises'
import fs from 'fs'
import path from "node:path"

export class MangaService {
    public async create(name: string, note: string, tags: string, description: string, img: string, mal_id: number, author: string) {
        const mangaRespository = AppDataSource.getRepository(Manga)

        const manga = new Manga()
        manga.name = name
        manga.tags = tags
        manga.authors = author
        manga.note = note
        manga.description = description
        manga.cape_url = img,
        manga.mal_id = mal_id

        await mangaRespository.save(manga)
    }
    public async saveCapeImage(url: string, name: string) {
        let nameReplace =  name.replace(/[^\w\s]/gi, '')
        console.log(name + '/' + nameReplace)

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