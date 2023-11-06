import { AppDataSource } from "../data-source"
import { Scanlator } from "../entities/Scanlators"

export class ScanlatorService {
    public async create(name: string, url: string) {
        const scanlatorRepository = AppDataSource.getRepository(Scanlator)

        const scanlator = new Scanlator()
        scanlator.name = name
        scanlator.url = url

        await scanlatorRepository.save(scanlator)
    }
}