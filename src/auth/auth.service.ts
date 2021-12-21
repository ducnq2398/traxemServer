import { HttpException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User, UserDocument } from 'src/users/schemas/user.schema';
import { AuthDto } from './dto/auth.dto';
import { uuid } from 'uuidv4';
import { ChangePasswordDto } from './dto/change-password.dto';
const bcrypt = require('bcrypt');
const saltRounds = 10;

@Injectable()
export class AuthService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>,
        private jwtService: JwtService) { }

    async signinLocal(authDto: AuthDto) {
        if (!authDto.email) throw new HttpException({ result: 0, message: 'Email must not null' }, 400)
        if (!authDto.password) throw new HttpException({ result: 0, message: 'Password must not null' }, 400)
        const user = await this.userModel.findOne({ email: authDto.email })
        if (user) {
            const match = await bcrypt.compare(authDto.password, user.password);
            if (match) {
                const payload = { username: user.email, sub: user.userId };
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
                        token: this.jwtService.sign(payload)
                    }
                }
            } else {
                throw new HttpException({ result: 0, message: 'Email or password incorrect' }, 400)
            }
        } else {
            throw new HttpException({ result: 0, message: 'Email or password incorrect' }, 400)
        }

    }

    async signupLocal(userDto: CreateUserDto) {
        if (!userDto.email) throw new HttpException({ result: 0, message: 'Email must not null' }, 400)
        if (!userDto.password) throw new HttpException({ result: 0, message: 'Password must not null' }, 400)
        if (!userDto.company) throw new HttpException({ result: 0, message: 'Company must not null' }, 400)
        if (!userDto.action) throw new HttpException({ result: 0, message: 'Action must not null' }, 400)
        if (!userDto.phone) throw new HttpException({ result: 0, message: 'Phone number must not null' }, 400)

        const user = await this.userModel.findOne({ email: userDto.email })
        if (user) {
            throw new HttpException({ result: 0, message: 'Email is existed' }, 400)
        } else {
            const passwordHash = bcrypt.hashSync(userDto.password, saltRounds);
            const newUser = new this.userModel({ ...userDto, password: passwordHash, userId: uuid() })
            const payload = { email: newUser.email, sub: newUser.userId };
            newUser.save()
            return {
                result: 1,
                data: {
                    id: newUser.userId,
                    email: newUser.email,
                    phone: newUser.phone,
                    address: newUser.address,
                    company: newUser.company,
                    action: newUser.action,
                    avatar: newUser.avatar,
                    token: this.jwtService.sign(payload)
                }
            }
        }
    }

    async changePassword(dto: ChangePasswordDto) {
        const findUser = await this.userModel.findOne({ userId: dto.userId })
        if (!findUser) throw new HttpException({ result: 0, message: 'Account is not existed' }, 400)
        const match = await bcrypt.compare(dto.password, findUser.password);
        if (match) {
            const passwordHash = bcrypt.hashSync(dto.newPassword, saltRounds);
            const user = await this.userModel.findOneAndUpdate({ userId: dto.userId }, {
                password: passwordHash
            })
            return {
                result: 1,
                data: user,
                message: 'Change password successfully'
            }
        } else {
            throw new HttpException({ result: 0, message: 'Old password is not correct' }, 400)
        }
    }

}
