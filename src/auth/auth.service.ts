import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { Users } from '../users/user.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Users)
    private userRepository: Repository<Users>,
  ) {}

  async validateUser(mail: string, password: string): Promise<any> {
    const user = await this.userRepository.findOne({ where: { mail: ILike(mail) }, });
    
    // if (!user) return null;

    // const isMatch = await bcrypt.compare(password, user.password);
    // if (!isMatch) {
    //   return null;
    // }

    if (!user || !(await bcrypt.compare(password, user.password))) return null;

    const { id, name, surname, address, phone } = user;

    return { message: 'Inicio de sesión exitoso',     
      user: {
        id,
        name,
        phone,
        address,
        surname,
      }, 
    };
  }
}
