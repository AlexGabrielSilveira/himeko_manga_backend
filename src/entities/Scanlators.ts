import { Column, CreateDateColumn, Entity, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { User } from "./Users"

@Entity()
export class Scanlator {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    url: string

    @Column({ default: "https://pbs.twimg.com/profile_images/1687471964/neoxlogomini_400x400.png"})
    logo: string

    @OneToOne(() => User, (user) => user.scanlator)
    owner: string

    @Column()
    ownerId: number

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}