import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
import { Users } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<Users> {
    this.logger.log(`Creating user with mail: ${createUserDto.mail}`);
    try {
      const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
      const user = this.usersRepository.create({ 
        password: hashedPassword,
        name: createUserDto.name,
        mail: createUserDto.mail, 
        phone: createUserDto.phone,
        address: createUserDto.address,
        surname: createUserDto.surname,
      });
      const savedUser = await this.usersRepository.save(user);
      this.logger.log(`User created successfully with ID: ${savedUser.id}`);
      return savedUser;
    } catch (error) {
      this.logger.error(`Failed to create user: ${error.message}`, error.stack);
      if (error instanceof QueryFailedError && error.message.includes('duplicate key value violates unique constraint')) {
        throw new Error('El correo electrónico ya está en uso. Por favor, elija otro.');
      }
      throw error;
    }
  }

  async findAll(): Promise<Users[]> {
    this.logger.log('Fetching all users');
    return this.usersRepository.find();
  }

  async findOne(id: number): Promise<Users | null> {
    this.logger.log(`Fetching user with ID: ${id}`);
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      this.logger.warn(`User with ID ${id} not found`);
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<Users | null> {
    this.logger.log(`Updating user with ID: ${id}`);
    if (updateUserDto.password) {
      const hashedPassword = await bcrypt.hash(updateUserDto.password, 10);
      updateUserDto.password = hashedPassword;
    }

    await this.usersRepository.update(id, updateUserDto);

    const updatedUser = await this.usersRepository.findOne({ 
      where: { id } ,
      select: ['id', 'name', 'surname', 'address', 'phone'],
    });
    
    if (updatedUser) {
        this.logger.log(`User with ID ${id} updated successfully`);
    } else {
        this.logger.warn(`User with ID ${id} not found for update`);
    }
    
    return updatedUser;
  }

  async delete(id: number): Promise<void> {
    this.logger.log(`Deleting user with ID: ${id}`);
    await this.usersRepository.delete(id);
    this.logger.log(`User with ID ${id} deleted`);
  }
}
