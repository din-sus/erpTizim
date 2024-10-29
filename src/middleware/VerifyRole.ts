import { NestMiddleware } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { User } from "src/users/entities/user.entity";
import { Repository } from "typeorm";

export class VerifyRole implements NestMiddleware{
    constructor(@InjectRepository(User) private readonly userRepo: Repository<User>){}
    async use(req: Request, res: Response, next: NextFunction) {
        let token: any = req.headers.token

        if(!token) {
            res.send({
                success: false,
                message: 'Give the Token❗'
            })
            return
        }

        let {email}: any = verify(token, 'secret')

        if(!email) {
            res.send({
                success: false,
                message: 'Wrong token❗'
            })
            return
        }

        let check = await this.userRepo.findOne({where: {email}})

        if(!check) {
            res.send({
                success: false,
                message: 'You are not found❗'
            })
            return
        }else{
            if(check.role != 'admin'){
                res.send({
                    success: false,
                    message: 'You are not able to do this❗'
                })
                return
            }else{
                req['user'] = check
                next()
            }
        }
    }
}