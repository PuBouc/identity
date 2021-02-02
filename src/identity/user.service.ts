import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDTO } from './dto/create-user.dto';
import { User } from './interfaces/user.interface';

@Injectable()
export class UserService {
    constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

    async getUsers(): Promise<User[]> {
        const users = await this.userModel.find().exec();

        return users;
    }

    async getUser(userId: string): Promise<User> {
        const user = await this.getUniqueUser(userId);

        return user;
    }

    async getUserByName(name: string): Promise<User> {
        const user = await this.userModel.findOne({ username: name }).exec();

        return user;
    }

    async addUser(createUserDTO: CreateUserDTO): Promise<User> {
        const newUser = await new this.userModel(createUserDTO);

        return newUser.save();
    }

    async updateUserMail(userId: string, email: string): Promise<User> {
        const user = await this.getUniqueUser(userId);

        user.email = email;

        return user.save();
    }

    async deleteUser(userId: string) {
        const result = await this.userModel.deleteOne({ _id: userId }).exec();

        if (result.n === 0) {
            throw new NotFoundException('User not found!');
        }

        return true;
    }

    private async getUniqueUser(userId: string): Promise<User> {
        let user;

        try {
            user = await this.userModel.findById(userId).exec();
        } catch (error) {
            throw new NotFoundException('User does not exist!');
        }

        if (!user) {
            throw new NotFoundException('User does not exist!');
        }

        return user;
    }
}
