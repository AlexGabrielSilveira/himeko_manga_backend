import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Manga } from "./Mangas"
import { Page } from "./Pages"

@Entity()
export class Chapter {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    chap_num: number

    @ManyToOne(() => Manga, (manga) => manga.chapters)
    manga: Manga

    @Column()
    mangaId: number

    @OneToMany(() => Page, (page) => page.chapter) 
    pages: Page[]
}