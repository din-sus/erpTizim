import { Modules } from "src/modules/entities/module.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Assignment {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    // user
    @OneToOne((type) => User, (user) => user.assignment)
    user: User[]

    // module
    @OneToOne((type) => Modules, (module) => module.assignment)
    module: Modules
}
