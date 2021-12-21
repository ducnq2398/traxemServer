import { Body, Controller, Get, HttpCode, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UsersService } from "./users.service";
@Controller('api/v2/users')
export class UsersController {
    constructor(private readonly userService: UsersService) {
    }

    @UseGuards(AuthGuard('jwt'))
    @HttpCode(200)
    @Patch()
    async updateUser(userId: string, @Body() dto: UpdateUserDto) {
        return this.userService.updateUser(userId, dto)
    }

    @UseGuards(AuthGuard('jwt'))
    @HttpCode(200)
    @Get()
    async getAll() {
        return this.userService.getAllUser()
    }
}