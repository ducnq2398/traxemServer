import { Body, Controller, HttpCode, Patch, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { CreateUserDto } from "src/users/dto/create-user.dto";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto/auth.dto";
import { ChangePasswordDto } from "./dto/change-password.dto";

@Controller('api/v2/auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @HttpCode(200)
    @Post('/login')
    signinLocal(@Body() authDto: AuthDto) {
        return this.authService.signinLocal(authDto)
    }

    @HttpCode(200)
    @Post('/register')
    signupLocal(@Body() newUser: CreateUserDto) {
        return this.authService.signupLocal(newUser)
    }

    @UseGuards(AuthGuard('jwt'))
    @HttpCode(200)
    @Patch('/changePassword')
    changePassword(@Body() dto: ChangePasswordDto) {
        return this.authService.changePassword(dto)
    }
}