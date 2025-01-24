import { UseGuards, applyDecorators } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
	ApiBearerAuth,
	ApiForbiddenResponse,
	ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { UserRoleGuard } from '../guards';
import { ValidRoles } from '../interfaces';
import { RoleProtected } from './role-protected.decorator';

// * Combinacion de decoradores
export const UseAuth = (...args: ValidRoles[]) => {
	return applyDecorators(
		// * Documentacion del swaggeer
		ApiBearerAuth(),
		ApiUnauthorizedResponse({
			description: 'Unauthorized User',
		}),
		ApiForbiddenResponse({ description: 'No tiene el rol para esta request' }),
		// * Metadata para los roles
		RoleProtected(...args),
		// * Guardia base + guardia x rol
		UseGuards(AuthGuard(), UserRoleGuard),
	);
};
