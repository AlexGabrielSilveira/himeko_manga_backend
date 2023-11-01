import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Scanlator {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    url: string

    @Column()
    logo: string
}