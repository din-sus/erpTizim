import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Modules {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    // course
}
