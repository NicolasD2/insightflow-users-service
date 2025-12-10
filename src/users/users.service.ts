import { Injectable } from '@nestjs/common';
import {v4 as uuidv4} from 'uuid';
import {User, UserPublicData} from './interfaces/user.interfaces';

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
}