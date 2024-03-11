import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { User } from 'src/entities';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  createUser(userDTO: DeepPartial<User>) {
    return this.userRepository.create(userDTO);
  }

  saveUser(user: User) {
    return this.userRepository.save(user);
  }

  updateUser(id: string, partialData: QueryDeepPartialEntity<User>) {
    return this.userRepository.update(id, partialData);
  }

  findById(id: string) {
    return this.userRepository.findOneBy({ id });
  }

  findByEmail(email: string) {
    return this.userRepository.findOneBy({ email });
  }
}
