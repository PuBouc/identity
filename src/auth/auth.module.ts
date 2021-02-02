import { Module } from '@nestjs/common';
import { UserService } from 'src/identity/user.service';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';

@Module({
  imports: [UserService, PassportModule],
  providers: [AuthService, LocalStrategy]
})
export class AuthModule {}
