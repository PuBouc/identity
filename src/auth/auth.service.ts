import { Injectable } from '@nestjs/common';
import { UserService } from '../identity/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private userService: UserService) {}

    async validateUser(username: string, password: string): Promise<any> {
        const user = await this.userService.getUserByName(username);

        if (user && bcrypt.compare(password, user.password)) {
            const { password, ...result } = user;
            
            return result;
        }

        return null;
    }
}
