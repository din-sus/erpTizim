import { Assignment } from "src/assignments/entities/assignment.entity";
import { Course } from "src/courses/entities/course.entity";
import { Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column({unique: true})

    email: string

    @Column()
    password: string

    @Column({default: 'user'})
    role: string

    // courses
    @ManyToOne(() => Course, (course) => course.user, { onDelete: 'CASCADE' })
    course: Course

    // teacher's courses
    @OneToMany(() => Course, (course) => course.teacher, { onDelete: 'CASCADE' })
    courseTeacher: Course[]

    // assignments
    @OneToMany((type) => Assignment, (assignment) => assignment.user, { onDelete: 'CASCADE' })
    assignment: Assignment[]
}
