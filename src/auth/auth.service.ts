import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { Users } from '../users/user.entity';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

export interface ValidatedUser {
  id: number;
  name: string;
  surname: string;
  address: object; // Or the specific Address type if it exists
  phone: string;
  role: string;
}

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Users)
    private userRepository: Repository<Users>,
    private jwtService: JwtService,
  ) {}

  async validateUser(mail: string, password: string): Promise<ValidatedUser | null> {
    Logger.log(`Validating user: ${mail}`, 'AuthService');
    const user = await this.userRepository.findOne({ where: { mail: ILike(mail) }, });
    Logger.log(`User found: ${user ? user.mail : 'not found'}`, 'AuthService');
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      Logger.log(`Password match: ${isMatch}`, 'AuthService');
      if (!isMatch) return null;
    } else {
      return null;
    }

    const { id, name, surname, address, phone, role } = user;

    return {
      id,
      name,
      phone,
      address,
      surname,
      role,
    };
  }

  async login(user: ValidatedUser) {
    const payload = { sub: user.id.toString(), role: user.role };
    return {
      user,
      token: this.jwtService.sign(payload),
    };
  }
}
