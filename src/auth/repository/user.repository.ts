import { BadRequestException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import * as bcrypt  from "bcrypt"
import { AuthCredentialDto } from "../DTO/auth-credentials.dto";
import { User } from "../entity/user.entity";

@EntityRepository(User)
export class UserRepository extends Repository<User>{

    //create user
    async signUp(authCredentialDto:AuthCredentialDto):Promise<void>{
        const {username,password}=authCredentialDto
        const exist=await this.findOne({username})
        if(exist){
            throw new BadRequestException('username already exist')
        }

        const user=new User();
        user.username=username;
        user.salt=await bcrypt.genSalt();
        user.password=await this.hashPassword(password, user.salt)
        this.save(user);
    }

    //sign in 
    async validateUserPassword(authCredentialDto:AuthCredentialDto): Promise<string>{
        const {username , password}=authCredentialDto;
        const user=await this.findOne({username});
        if(user && await user.validatePassword(password))
            return username;
        else
            return null;
        
    }

    //hash password for SignUp
    private async hashPassword(password:string,salt:string): Promise<string>{
        return  bcrypt.hash(password,salt)
    }
}