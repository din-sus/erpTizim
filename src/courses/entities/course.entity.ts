import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Course {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    description: string

    @Column()
    price: number

    @Column({type: 'enum', enum: ['easy', 'medium', 'difficult'], default: 'easy'})
    level: string

    // users
    // teacher
    // modules
}
