import { AppDataSource } from "../data-source"
import { Scanlator } from "../entities/Scanlators"

interface CreateParams {
    name: string
    url: string
    logoUrl?: string
    ownerId: number
}

export class ScanlatorService {
    public async create({
        name,
        url,
        logoUrl,
        ownerId
    }: CreateParams) {
        const scanlatorRepository = AppDataSource.getRepository(Scanlator)

        const scanlator = new Scanlator()
        scanlator.name = name
        scanlator.url = url
        scanlator.logo = logoUrl as string
        scanlator.ownerId = ownerId

        await scanlatorRepository.save(scanlator)
    }
}