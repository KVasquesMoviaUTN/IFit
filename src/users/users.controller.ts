import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { Users } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<Users> {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll(): Promise<Users[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Users | null> {
    return this.usersService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() updateProductDto: UpdateUserDto,
  ): Promise<Users | null> {
    return this.usersService.update(id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.usersService.delete(id);
  }
}
