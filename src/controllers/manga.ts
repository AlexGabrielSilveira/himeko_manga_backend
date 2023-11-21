import { Response, Request } from "express";
import { AppDataSource } from "../data-source";
import { Manga } from "../entities/Mangas";

export class MangaController {
    async getAllMangas(req: Request, res:Response) {
        const mangaRepository = AppDataSource.getRepository(Manga)
        const manga = await mangaRepository.find()

        return res.send(manga)
    }
}