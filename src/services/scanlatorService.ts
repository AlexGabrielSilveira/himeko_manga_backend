import { AppDataSource } from "../data-source"
import { Scanlator } from "../entities/Scanlators"

export class ScanlatorService {
    public async create(name: string, url: string, logoUrl?: string) {
        const scanlatorRepository = AppDataSource.getRepository(Scanlator)

        const scanlator = new Scanlator()
        scanlator.name = name
        scanlator.url = url
        scanlator.logo = logoUrl

        await scanlatorRepository.save(scanlator)
    }
}