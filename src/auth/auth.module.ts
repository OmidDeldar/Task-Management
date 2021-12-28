import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './controller/auth.controller';
import { AuthService } from './services/auth.service';
import { JwtStrategy } from './jwt-strategy/jwt.strategy';
import { UserRepository } from './repository/user.repository';

@Module({
  imports :[
    PassportModule.register({defaultStrategy:'jwt'}),
    JwtModule.register({
      secret:'123456',
      signOptions:{
        expiresIn:3600,
      },
    }),
    TypeOrmModule.forFeature([UserRepository])],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
  ],
  exports:[
    JwtStrategy,
    PassportModule,
  ],
}

)

export class AuthModule {}
