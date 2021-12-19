import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialDto } from './DTO/auth-credentials.dto';
import { User } from './entity/user.entity';
import { UserRepository } from './repository/user.repository';

@Injectable()
export class AuthService {
    constructor(
         @InjectRepository(UserRepository)
         private userRepository:UserRepository){}

    //find all user
    async findAllUser():Promise<User[]>{
        return this.userRepository.findAllUser();
    }
    //create user
    async signUp(authCredentialDto:AuthCredentialDto):Promise<void>{
        return this.userRepository.signUp(authCredentialDto)
    }

    //login user
    async signIn(authCredentialDto:AuthCredentialDto):Promise<string>{
        return this.userRepository.validateUserPassword(authCredentialDto)
    }

}
