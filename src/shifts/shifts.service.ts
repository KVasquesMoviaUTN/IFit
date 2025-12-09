import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { Shift } from './entities/shift.entity';
import { CreateShiftDto } from './dto/create-shift.dto';
import { UpdateShiftDto } from './dto/update-shift.dto';
import { Users } from '../users/user.entity';

@Injectable()
export class ShiftsService {
  constructor(
    @InjectRepository(Shift)
    private shiftsRepository: Repository<Shift>,
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}

  async create(createShiftDto: CreateShiftDto): Promise<Shift> {
    const user = await this.usersRepository.findOne({ where: { id: createShiftDto.userId } });
    if (!user) {
      throw new NotFoundException(`User with ID ${createShiftDto.userId} not found`);
    }

    const shift = this.shiftsRepository.create({
      ...createShiftDto,
      user,
    });

    return this.shiftsRepository.save(shift);
  }

  async findAll(start?: string, end?: string): Promise<Shift[]> {
    const where: any = {};
    if (start && end) {
        where.startTime = Between(new Date(start), new Date(end));
    }
    return this.shiftsRepository.find({
      where,
      relations: ['user'],
      order: { startTime: 'ASC' },
    });
  }

  async findOne(id: number): Promise<Shift> {
    const shift = await this.shiftsRepository.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!shift) {
      throw new NotFoundException(`Shift with ID ${id} not found`);
    }
    return shift;
  }

  async findByUser(userId: number): Promise<Shift[]> {
    return this.shiftsRepository.find({
      where: { user: { id: userId } },
      order: { startTime: 'DESC' },
    });
  }

  async update(id: number, updateShiftDto: UpdateShiftDto): Promise<Shift> {
    const shift = await this.findOne(id);
    Object.assign(shift, updateShiftDto);
    return this.shiftsRepository.save(shift);
  }

  async remove(id: number): Promise<void> {
    const shift = await this.findOne(id);
    await this.shiftsRepository.remove(shift);
  }
}
