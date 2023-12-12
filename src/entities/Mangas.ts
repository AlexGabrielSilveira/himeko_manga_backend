import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm"
import { Chapter } from "./Chapters"

@Entity()
export class Manga {  
    @PrimaryGeneratedColumn()
    id: number

    @Column({ unique: true })
    name: string

    @Column({ default: "a"})
    cape_url: string

    @Column()
    description: string

    @Column()
    note: string

    @Column()
    tags: string

    @Column()
    authors: string

    @Column()
    mal_id: number

    @OneToOne(() => Manga)
    @JoinColumn()
    scanlator: number

    @OneToMany(() => Chapter, (chapter) => chapter.manga)
    chapters: Chapter[]
}