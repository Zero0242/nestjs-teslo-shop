import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { LoginUserDTO, RegisterUserDTO } from './dto';
import { GetUser } from './decorators';
import { User } from 'src/entities';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard())
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
  registerUser(@Body() registerDTO: RegisterUserDTO) {
    return this.authService.registerUser(registerDTO);
  }
}
