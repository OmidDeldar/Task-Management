import { BadRequestException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import * as bcrypt  from "bcrypt"
import { AuthCredentialDto } from "../DTO/auth-credentials.dto";
import { User } from "../entity/user.entity";

@EntityRepository(User)
export class UserRepository extends Repository<User>{

    async signUp(authCredentialDto:AuthCredentialDto):Promise<void>{
        const {username,password}=authCredentialDto
        const exist=await this.findOne({username})
        if(exist){
            throw new BadRequestException('username already exist')
        }

        const user=new User();
        user.username=username;
        user.salt=await bcrypt.getSalt();
        user.password=await this.hashPassword(password, user.salt)
        this.save(user);
    }
    private async hashPassword(password:string,salt:string): Promise<string>{
        return  bcrypt.hash(password,salt)
    }
}