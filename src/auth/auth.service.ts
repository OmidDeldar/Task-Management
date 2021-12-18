import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialDto } from './DTO/auth-credentials.dto';
import { UserRepository } from './repository/user.repository';

@Injectable()
export class AuthService {
    constructor(
         @InjectRepository(UserRepository)
         private userRepository:UserRepository){}


    async signUp(authCredentialDto:AuthCredentialDto):Promise<void>{
        return this.userRepository.signUp(authCredentialDto)
    }
}
