import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column({nullable: true})
    name: string

    @Column({unique: true})
    @Column({nullable: true})
    email: string

    @Column({nullable: true})
    password: string

    @Column({nullable: true})
    role: string

    // courses
}
