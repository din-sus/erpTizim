import { Modules } from "src/modules/entities/module.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

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
    @OneToMany(() => User, (user) => user.course)
    user: User[]

    // teacher
    @ManyToOne(() => User, (user) => user.courseTeacher)
    teacher: User
    
    // modules
    @OneToMany(() => Modules, (module) => module.course)
    module: Modules[]
}
