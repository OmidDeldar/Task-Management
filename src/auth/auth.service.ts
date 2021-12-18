import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialDto } from './DTO/auth-credentials.dto';
import { UserRepository } from './repository/user.repository';

@Injectable()
export class AuthService {
    constructor(
         @InjectRepository(UserRepository)
         private userRepository:UserRepository){}

    //create user
    async signUp(authCredentialDto:AuthCredentialDto):Promise<void>{
        return this.userRepository.signUp(authCredentialDto)
    }

    //login user
    async signIn(authCredentialDto:AuthCredentialDto):Promise<string>{
        return this.userRepository.validateUserPassword(authCredentialDto)
    }
}
