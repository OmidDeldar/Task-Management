import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialDto } from './DTO/auth-credentials.dto';
import { DeleteUserDto } from './DTO/delete-user.dto';
import { User } from './entity/user.entity';
import { JwtPayload } from './jwt-payload.interface';
import { UserRepository } from './repository/user.repository';

@Injectable()
export class AuthService {
    constructor(
         @InjectRepository(UserRepository)
         private userRepository:UserRepository,
         private jwtService:JwtService,
         ){}

    //find all user
    async findAllUser():Promise<User[]>{
        return this.userRepository.findAllUser();
    }
    //create user
    async signUp(authCredentialDto:AuthCredentialDto):Promise<void>{
        return this.userRepository.signUp(authCredentialDto)
    }

    //login user
    async signIn(authCredentialDto:AuthCredentialDto):Promise<{accessToken:string}>{
        const username=await this.userRepository.validateUserPassword(authCredentialDto)

        if(!username)
        throw new UnauthorizedException('invalid credentials')

        const payload:JwtPayload={username};
        const accessToken=await this.jwtService.sign(payload);
        return  { accessToken };
    }
    //delete user
    async deleteUser(deleteUserDto:DeleteUserDto):Promise<void>{
        const {username}=deleteUserDto
        const found=await this.userRepository.findOne({username});
    if(!found)
    throw new NotFoundException(`username (${username}) doesent exist `);
    
    found.deleted=true;
    this.userRepository.save(found);


    }

}
