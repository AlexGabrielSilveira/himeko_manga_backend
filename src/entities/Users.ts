import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length:  36,
    })
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

}
