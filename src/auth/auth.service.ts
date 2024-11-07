import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async register(userData: Partial<User>) {
    const user = this.usersRepository.create(userData);
    return await this.usersRepository.save(user);
  }

  async login(email: string, carPlateNumber: string) {
    return await this.usersRepository.findOne({
      where: { email, car_plate_number: carPlateNumber },
    });
  }
}
