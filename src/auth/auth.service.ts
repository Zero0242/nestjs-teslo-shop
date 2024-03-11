import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users';
import { LoginUserDTO, RegisterUserDTO, UpdateUserDto } from './dto';
import { JwtPayload } from './interfaces';
import { User } from 'src/entities';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async loginUser(loginDTO: LoginUserDTO) {
    const { email, password } = loginDTO;
    const user = await this.usersService.findByEmail(email);
    if (!user) throw new UnauthorizedException('Invalid Credentials');
    const passCheck = bcrypt.compareSync(password, user.password);
    if (!passCheck) throw new UnauthorizedException('Invalid Credentials');
    const token = this.signToken({ id: user.id });
    delete user.password;
    return { user, token };
  }

  async registerUser(registerDTO: RegisterUserDTO) {
    try {
      const { password } = registerDTO;
      registerDTO.password = bcrypt.hashSync(password, 10);
      const user = this.usersService.createUser(registerDTO);
      await this.usersService.saveUser(user);
      const token = this.signToken({ id: user.id });
      delete user.password;
      return { user, token };
    } catch (error) {
      if (error.code === '23505')
        throw new BadRequestException('Email ya en uso');
      throw new InternalServerErrorException('Consulte con el admin');
    }
  }

  async updateUser(user: User, updateDTO: UpdateUserDto) {
    const values = Object.entries(updateDTO);

    if (values.length === 0) {
      throw new BadRequestException('No se pudo actualizar');
    }
    const { id } = user;
    const { affected = 0 } = await this.usersService.updateUser(id, updateDTO);
    if (affected === 0) {
      throw new InternalServerErrorException('No se pudo actualizar');
    }
    return {
      ...user,
      username: updateDTO.username ?? user.username,
      birthday: updateDTO.birthday ?? user.birthday,
      phone: updateDTO.phone ?? user.phone,
    };
  }

  signToken(payload: JwtPayload) {
    return this.jwtService.sign(payload);
  }
}
