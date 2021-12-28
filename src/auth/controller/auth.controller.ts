import { Body, Controller, Delete, Get, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from '../services/auth.service';
import { AuthCredentialDto } from '../DTO/auth-credentials.dto';
import { DeleteUserDto } from '../DTO/delete-user.dto';
import { User } from '../entity/user.entity';

@ApiTags('AUTH')
@Controller('auth')
export class AuthController {
    constructor(private authService:AuthService){}

    //find all users
    @Get('/findAllUser')
    async findAllUser():Promise<User[]>{
        return this.authService.findAllUser()
    }

    //create user
    @Post('/signUp')
    async signUp(@Body(ValidationPipe) authCredentialDto:AuthCredentialDto):Promise<void>{
        return this.authService.signUp(authCredentialDto)
    }

    //login user
    @Post('/signIn')
    async signIn(@Body(ValidationPipe) authCredentialDto:AuthCredentialDto):Promise<{accessToken:string}>{
        return this.authService.signIn(authCredentialDto);
    }

    //delete user 
    @Delete('/deleteUser')
    async deleteUser(@Body(ValidationPipe) deleteUserDto:DeleteUserDto):Promise<void>{
        return this.authService.deleteUser(deleteUserDto)
    }
}
