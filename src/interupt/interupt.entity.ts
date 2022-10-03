import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Interupt{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string;

    @Column()
    status: number;
}