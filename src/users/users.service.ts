import { HttpException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User, UserDocument } from "./schemas/user.schema";

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }

    async updateUser(userId: string, userDto: UpdateUserDto) {
        const user = await this.userModel.findOneAndUpdate({ userId: userId }, {
            password: userDto.password,
            avatar: userDto.avatar,
            phone: userDto.phone
        })
        console.log(user)
        if (!user) {
            throw new HttpException({ result: 0, message: "Account is incorrect" }, 400)
        } else {
            return {
                result: 1,
                data: user
            }
        }
    }
}