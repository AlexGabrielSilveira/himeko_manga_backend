import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { Chapter } from "./Chapters"

@Entity()
export class Page {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    page_number: number
    
    @Column()
    img_src: string

    @Column()
    chapterId: number

    @ManyToOne(() => Chapter, (Chapter) => Chapter.pages)
    chapter: Chapter

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}