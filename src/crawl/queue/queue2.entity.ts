import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Queue2{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    url: string;

    @Column()
    website: string;

    @Column({default: 0})
    status: string;
}