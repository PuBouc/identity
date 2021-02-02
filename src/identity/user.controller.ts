import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Res } from '@nestjs/common';
import { ValidateObjectId } from 'src/shared/pipes/validate-object-id.pipes';
import { CreateUserDTO } from './dto/create-user.dto';
import { UserService } from './user.service';

@Controller('identity')
export class UserController {
    constructor(private userService: UserService) {}

    @Get('/users')
    async getUsers(@Res() result) {
        const users = await this.userService.getUsers();

        return result.status(HttpStatus.OK).json(users);
    }

    @Get('/user/:id')
    async getUser(@Res() result, @Param('id', new ValidateObjectId()) userId: string) {
        const user = await this.userService.getUser(userId);

        return result.status(HttpStatus.OK).json(user);
    }

    @Post('/user')
    async createUser(@Res() result, @Body() createUserDTO: CreateUserDTO) {
        const newUser = await this.userService.addUser(createUserDTO);

        return result.status(HttpStatus.OK).json({
            'message': 'User has been successfully created!',
            'user': newUser
        });
    }

    @Patch('/user/:id')
    async updateUserMail(
        @Res() result, 
        @Param('id', new ValidateObjectId()) userId: string, 
        @Body('email') email: string
    ) {
        const user = await this.userService.updateUserMail(userId, email);

        return result.status(HttpStatus.OK).json({
            'message': 'Email updated successfully!',
            'user': user
        });
    }

    @Delete('/user/:id')
    async deleteUser(@Res() result, @Param('id', new ValidateObjectId()) userId) {
        const isDeleted = await this.userService.deleteUser(userId);

        if (isDeleted) {
            return result.status(HttpStatus.OK).json({
                'message': 'User deleted successfully!'
            });
        }
    }
}
