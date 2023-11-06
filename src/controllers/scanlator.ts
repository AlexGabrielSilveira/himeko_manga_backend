import { Response, Request } from "express";
import { AppDataSource } from "../data-source";
import { Scanlator } from "../entities/Scanlators";

export class ScanlatorController {
    async getAllScans(req: Request, res: Response) {
        const scanlatorRepository = AppDataSource.getRepository(Scanlator)
        const scanlator = await scanlatorRepository.find()
        return res.send(scanlator)
    }
}