import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDTO, RegisterUserDTO } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

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
