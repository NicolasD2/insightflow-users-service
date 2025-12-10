import { Injectable, NotFoundException } from '@nestjs/common';
import {v4 as uuidv4} from 'uuid';
import {User, UserPublicData} from './interfaces/user.interfaces';
import { NotFoundError } from 'rxjs';

@Injectable()
export class UsersService {

    private users: User[] = [
        {
            id: uuidv4(),
            fullName: 'David Araya',
            email: 'daraya@ucn.cl',
            username: 'daraya',
            birthdate: new Date('1985-01-01'),
            address: 'Calle Falsa 123',
            phoneNumber: '555-1234',
            passwordHash: 'hashedpassword1',
            status: 'active'
        },
    ];

    private toPublicData(user: User): UserPublicData {
        const { passwordHash, ...publicData } = user;
        return publicData;
    }

    create(createUserDto: Omit<User, 'id' | 'status'>): UserPublicData {
        const newUser: User = {
            id: uuidv4(),
            status: 'active',
            ...createUserDto
        };
        this.users.push(newUser);
        return this.toPublicData(newUser);
    }

    findAll(): UserPublicData[] {
        return this.users.filter(user => user.status === 'active').map(user => this.toPublicData(user));
    }
    
    findOne(id: string): UserPublicData {
        const user = this.users.find(user => user.id === id && user.status === 'active');
        if(!user){
            throw new NotFoundException(`User with id ${id} not found`);
        }

        return this.toPublicData(user);
    }

    update(id: string, updateData: {fullName?: string; email?: string; username?: string; birthdate?: Date; address?: string; phoneNumber?: string;}): UserPublicData {
        const user = this.users.find(user => user.id === id && user.status === 'active'); 
        if (!user) {
            throw new NotFoundException(`User with id ${id} not found`);
        }
        if(updateData.username && updateData.username !== user.username){
            const usernameExists = this.users.some(u => u.username === updateData.username && u.id !== id && u.status === 'active');
            if(usernameExists){
                throw new Error(`Username ${updateData.username} is already taken`);
            }
            user.username = updateData.username;
        }
        if(updateData.fullName){
            user.fullName = updateData.fullName;
        }
        
        return this.toPublicData(user);
    }
    remove(id: string): void {
        const user = this.users.find(user => user.id === id && user.status === 'active');
        if (!user) {
            throw new NotFoundError(`User with id ${id} not found`);
        }
        user.status = 'inactive';
    }

}