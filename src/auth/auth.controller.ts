import {
	Body,
	Controller,
	Get,
	HttpCode,
	HttpStatus,
	Post,
	Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { User } from 'src/entities';
import { AuthService } from './auth.service';
import { GetUser, UseAuth } from './decorators';
import { LoginUserDTO, RegisterUserDTO, UpdateUserDto } from './dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@UseAuth()
	@Get('login')
	validateUser(@GetUser() user: User) {
		const token = this.authService.signToken({ id: user.id });
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
}
