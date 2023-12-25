import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToOne } from 'typeorm';
import { Scanlator } from './Scanlators';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length:  36,
    })
    name: string;

    @Column()
    oauthClient: string;

    @Column()
    picture?: string

    @Column()
    email: string;

    @Column({ default: "user"})
    role: string

    @OneToOne(() => Scanlator, (scanlator) => scanlator.owner)
    scanlator?: Scanlator

    @Column({ nullable: true })
    scanlatorId?: number

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
