import { HttpException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User, UserDocument } from "./schemas/user.schema";

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }

    async updateUser(userId: string, userDto: UpdateUserDto) {
        if (!userDto.company) throw new HttpException({ result: 0, message: 'Company must not null' }, 400)
        if (!userDto.action) throw new HttpException({ result: 0, message: 'Action must not null' }, 400)
        if (!userDto.phone) throw new HttpException({ result: 0, message: 'Phone number must not null' }, 400)

        const findUser = await this.userModel.findOne({ userId: userId })

        if (!findUser) throw new HttpException({ result: 0, message: "Account is not existed" }, 400)

        const user = await this.userModel.findOneAndUpdate({ userId: userId }, {
            avatar: userDto.avatar,
            phone: userDto.phone,
            address: userDto.address,
            company: userDto.company,
            action: userDto.action
        })

        return {
            result: 1,
            data: {
                id: user.userId,
                email: user.email,
                phone: user.phone,
                address: user.address,
                company: user.company,
                action: user.action,
                avatar: user.avatar,
            }
        }
    }

    async getAllUser() {
        const list = await this.userModel.find()
        return {
            result: 1,
            data: list
        }
    }
}