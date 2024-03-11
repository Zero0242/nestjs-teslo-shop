import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { LoginUserDTO, RegisterUserDTO } from './dto';
import { GetUser, RoleProtected } from './decorators';
import { User } from 'src/entities';
import { ValidRoles } from './interfaces';
import { UserRoleGuard } from './guards';

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

  /* Debug Request */

  @RoleProtected(ValidRoles.admin)
  @UseGuards(AuthGuard(), UserRoleGuard)
  @Get('protected')
  adminRequest() {
    return 'request solo para admin';
  }
}
