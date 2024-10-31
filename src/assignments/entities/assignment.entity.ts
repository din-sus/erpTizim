import { Modules } from "src/modules/entities/module.entity";
import { User } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Assignment {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    mark: number

    @Column({ type: 'varchar', unique: true })
    @CreateDateColumn({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP(6)',
    })
    create_at: Date;
    // user
    @OneToOne((type) => User, (user) => user.assignment, { onDelete: 'CASCADE' })
    user: User

    // module
    @OneToOne((type) => Modules, (module) => module.assignment, { onDelete: 'CASCADE' })
    module: Modules
}
