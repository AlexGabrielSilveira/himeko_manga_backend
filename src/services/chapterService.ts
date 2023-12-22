import { AppDataSource } from "../data-source"
import { Chapter } from "../entities/Chapters"
import { Page } from "../entities/Pages"

export class ChapterService {
    public async create(chapterNumber: number, scanlator: string, pagesSrc: string[], mangaId: number) {
        const chapter = new Chapter()

        chapter.chapterNumber = chapterNumber
        chapter.mangaId = mangaId 
        
        await AppDataSource.manager.transaction(async (transactionalEntityManager) => {
            let savedChapter = await transactionalEntityManager.save(chapter)
            const pages: Page[] = []
    
            pagesSrc.forEach((pageSrc, index) => {
                const page = new Page()
                page.chapterId = savedChapter.id
                page.img_src = pageSrc
                page.page_number = index + 1
    
                pages.push(page)
            })
            await transactionalEntityManager.save(pages)
        })
        
        
        
    }
}