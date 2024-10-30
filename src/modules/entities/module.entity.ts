import { Assignment } from "src/assignments/entities/assignment.entity";
import { Course } from "src/courses/entities/course.entity";
import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Modules {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    // course
    @ManyToOne(() => Course, (course) => course.module)
    course: Course

    // assignment
    @OneToOne((type) => Assignment, (assignment) => assignment.module)
    assignment: Assignment
}
