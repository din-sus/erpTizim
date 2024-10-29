import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Assignment {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    // user
    // module
}
