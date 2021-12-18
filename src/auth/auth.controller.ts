import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthCredentialDto } from './DTO/auth-credentials.dto';
@ApiTags('AUTH')
@Controller('auth')
export class AuthController {
    constructor(private authService:AuthService){}


    @Post('signUp')
    async signUp(@Body(ValidationPipe) authCredentialDto:AuthCredentialDto):Promise<void>{
        return this.authService.signUp(authCredentialDto)
    }
}
