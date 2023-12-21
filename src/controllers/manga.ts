import { Response, Request } from "express";
import { AppDataSource } from "../data-source";
import { Manga } from "../entities/Mangas";
import { ILike } from "typeorm";

export class MangaController {
    async getAllMangas(req: Request, res:Response) {
        const mangaRepository = AppDataSource.getRepository(Manga)
        const manga = await mangaRepository.find()

        return res.send(manga)
    }
    async getMangaById(req: Request, res:Response) {
        const params = parseInt(req.params.mangaId)

        const mangaRepository = AppDataSource.getRepository(Manga)
        const manga = await mangaRepository.findOneBy({id: params})

        return res.send(manga)
    }
    async getMangaByName(req: Request, res:Response) {
        const mangaName = req.params.name

        if (typeof mangaName !== 'string' || mangaName.trim() === '') {
            return res.status(400).send('Nome do manga inválido.')
        }
        const mangaRepository = AppDataSource.getRepository(Manga)
        const mangas = await mangaRepository.find({
            where: {
                name: ILike(`%${mangaName}%`),
            },
        })

        return res.send(mangas)
    }
}