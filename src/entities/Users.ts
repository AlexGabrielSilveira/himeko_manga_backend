import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

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

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

}
