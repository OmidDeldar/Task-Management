import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthCredentialDto } from './DTO/auth-credentials.dto';
@ApiTags('AUTH')
@Controller('auth')
export class AuthController {
    constructor(private authService:AuthService){}


    //create user
    @Post('/signUp')
    async signUp(@Body(ValidationPipe) authCredentialDto:AuthCredentialDto):Promise<void>{
        return this.authService.signUp(authCredentialDto)
    }

    //login user
    @Post('/signIn')
    async signIn(@Body(ValidationPipe) authCredentialDto:AuthCredentialDto):Promise<string>{
        return this.authService.signIn(authCredentialDto);
    }
}
