import { Controller, Get, Post, Body, Param, Delete, Put, HttpException, HttpStatus, Logger, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { UsersService } from './users.service';
import { Users } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  private readonly logger = new Logger(UsersController.name);

  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<Users> {
    this.logger.log('Received request to create user');
    try {
      return await this.usersService.create(createUserDto);
    } catch (error) {
      this.logger.error(`Error creating user: ${error.message}`);
      if (error.message === 'El correo electrónico ya está en uso. Por favor, elija otro.') {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }
      throw error;
    }
  }

  @Get()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  findAll(): Promise<Users[]> {
    this.logger.log('Received request to find all users');
    return this.usersService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  findOne(@Param('id') id: number, @Req() req): Promise<Users | null> {
    this.logger.log(`Received request to find user with ID: ${id}`);
    if (req.user.role !== 'admin' && req.user.userId !== +id) {
       throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
    return this.usersService.findOne(id);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  update(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
    @Req() req
  ): Promise<Users | null> {
    this.logger.log(`Received request to update user with ID: ${id}`);
    if (req.user.role !== 'admin' && req.user.userId !== +id) {
       throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  remove(@Param('id') id: number): Promise<void> {
    this.logger.log(`Received request to delete user with ID: ${id}`);
    return this.usersService.delete(id);
  }
}
