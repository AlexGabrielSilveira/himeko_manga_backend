import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { Chapter } from "./Chapters"
import { Scanlator } from "./Scanlators"

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
    scanlator: Scanlator

    @OneToMany(() => Chapter, (chapter) => chapter.manga)
    chapters: Chapter[]

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}