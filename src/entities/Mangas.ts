import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm"
import { Chapter } from "./Chapters"

@Entity()
export class Manga {  
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column({ type: "text"})
    cape_url: string

    @Column()
    description: string

    @Column()
    note: number

    @Column()
    tags: string

    @OneToOne(() => Manga)
    @JoinColumn()
    scanlator: number

    @OneToMany(() => Chapter, (chapter) => chapter.manga)
    chapters: Chapter[]
}