import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Res } from '@nestjs/common';
import { ValidateObjectId } from 'src/shared/pipes/validate-object-id.pipes';
import { CreateUserDTO } from './dto/create-user.dto';
import { UserService } from './user.service';

@Controller('identity')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get('/users')
    async getUsers() {
        return await this.userService.getUsers();
    }

    @Get('/user/:id')
    async getUser(@Param('id', new ValidateObjectId()) userId: string) {
        return await this.userService.getUser(userId);
    }

    @Post('/user')
    async createUser(@Body() createUserDTO: CreateUserDTO) {
        const newUser = await this.userService.createUser(createUserDTO);

        return {
            'message': 'User has been successfully created!',
            'user': newUser
        };
    }

    @Patch('/user/:id')
    async updateUserMail(
        @Param('id', new ValidateObjectId()) userId: string, 
        @Body('email') email: string
    ) {
        const user = await this.userService.updateUserMail(userId, email);

        return {
            'message': 'Email updated successfully!',
            'user': user
        };
    }

    @Delete('/user/:id')
    async deleteUser(@Param('id', new ValidateObjectId()) userId) {
        const isDeleted = await this.userService.deleteUser(userId);

        if (isDeleted) {
            return {
                'message': 'User deleted successfully!'
            };
        }
    }
}
