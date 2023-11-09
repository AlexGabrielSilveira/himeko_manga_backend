import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Scanlator {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    url: string

    @Column({ default: "https://pbs.twimg.com/profile_images/1687471964/neoxlogomini_400x400.png"})
    logo?: string
}