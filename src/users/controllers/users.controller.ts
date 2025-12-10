import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from "@nestjs/common";
import { UsersService } from "../users.service";
import type { UserPublicData } from "../interfaces/user.interfaces";

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}
    
    // POST /users: Crear usuario
    @Post()
    create(@Body() createUserDto: any) {
        return this.usersService.create(createUserDto);
    }

    // GET /users: Visualizar listado de usuarios
    @Get()
    findAll(): UserPublicData[] {
        return this.usersService.findAll();
    }

    // GET /users/:id: Visualizar usuario por identificador
    @Get(':id')
    findOne(@Param('id') id: string): UserPublicData { 
        return this.usersService.findOne(id);
    }

    // PATCH /users/:id: Editar usuario
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateUserDto: any) {
        const allowedUpdates = { 
            fullName: updateUserDto.fullName,
            username: updateUserDto.username, 
        };
        return this.usersService.update(id, allowedUpdates);
    }

    // DELETE /users/:id: Eliminar usuario (Soft Delete)
    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    remove(@Param('id') id: string): void {
        this.usersService.remove(id);
    }
}