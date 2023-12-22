import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { Manga } from "./Mangas"
import { Page } from "./Pages"

@Entity()
export class Chapter {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    chapterNumber: number

    @ManyToOne(() => Manga, (manga) => manga.chapters)
    manga: Manga

    @Column()
    mangaId: number

    @OneToMany(() => Page, (page) => page.chapter) 
    pages: Page[]

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}