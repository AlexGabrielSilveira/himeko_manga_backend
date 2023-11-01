import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { Chapter } from "./Chapters"

@Entity()
export class Page {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    page_number: number
    
    @Column()
    img_src: string

    @ManyToOne(() => Chapter, (Chapter) => Chapter.pages)
    chapter: Chapter
}