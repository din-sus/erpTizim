import { Assignment } from "src/assignments/entities/assignment.entity";
import { Course } from "src/courses/entities/course.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Modules {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column({ type: 'varchar', unique: true })
    @CreateDateColumn({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP(6)',
    })
    create_at: Date;
    // course
    @ManyToOne(() => Course, (course) => course.module, { onDelete: 'CASCADE' })
    course: Course

    // assignment
    @OneToOne((type) => Assignment, (assignment) => assignment.module, { onDelete: 'CASCADE' })
    assignment: Assignment
}
