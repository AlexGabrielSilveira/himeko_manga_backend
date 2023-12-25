import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { Chapter } from "./Chapters"
import { User } from "./Users"

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

    @OneToMany(() => Chapter, (chapter) => chapter.manga)
    chapters: Chapter[]

    @ManyToOne(() => User)
    createdBy: User

    @Column()
    createdById: number

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}