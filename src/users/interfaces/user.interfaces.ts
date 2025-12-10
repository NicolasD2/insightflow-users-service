export interface User {
    id: string;
    fullName: string;
    email: string;
    username: string;
    birthdate: Date;
    address: string;
    phoneNumber: string;
    passwordHash: string;
    status: 'active' | 'inactive';

}

export type UserPublicData = Omit<User, 'passwordHash'>;