import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users';
import { LoginUserDTO, RegisterUserDTO } from './dto';
import { JwtPayload } from './interfaces';

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
    const { email, password } = registerDTO;
    const userFound = await this.usersService.findByEmail(email);
    if (userFound) throw new BadRequestException('Usuario ya registrado');
    registerDTO.password = bcrypt.hashSync(password, 10);
    const user = this.usersService.createUser(registerDTO);
    await this.usersService.saveUser(user);
    const token = this.signToken({ id: user.id });
    delete user.password;
    return { user, token };
  }

  signToken(payload: JwtPayload) {
    return this.jwtService.sign(payload);
  }
}
