import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Put,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDTO, RegisterUserDTO, UpdateUserDto } from './dto';
import { GetUser, UseAuth } from './decorators';
import { ValidRoles } from './interfaces';
import { User } from 'src/entities';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseAuth()
  @Get('login')
  validateUser(@GetUser() user: User) {
    const token = this.authService.signToken({ id: user.id });
    delete user.password;
    return { user, token };
  }

  @Post('login')
  authenticateUser(@Body() loginDTO: LoginUserDTO) {
    return this.authService.loginUser(loginDTO);
  }

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  registerUser(@Body() registerDTO: RegisterUserDTO) {
    return this.authService.registerUser(registerDTO);
  }

  @UseAuth()
  @Put('edit')
  updateUser(@GetUser() user: User, @Body() updateDTO: UpdateUserDto) {
    return this.authService.updateUser(user, updateDTO);
  }

  /* Debug Request */

  @UseAuth(ValidRoles.superUser)
  @Get('protected')
  adminRequest() {
    return 'request solo para admin';
  }
}
