import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDTO, RegisterUserDTO } from './dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard())
  @Get('login')
  validateUser() {
    return 'TODO: implementar login x token';
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
