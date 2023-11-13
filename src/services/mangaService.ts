import { AppDataSource } from "../data-source";
import { Manga } from "../entities/Mangas";

export class MangaService {
    public async create(name: string, note: number, tags: string, description: string) {
        const mangaRespository = AppDataSource.getRepository(Manga)

        const manga = new Manga
        manga.name = name
        manga.note = note
        manga.tags = tags
        manga.description = description

        await mangaRespository.save(manga)
    }
}