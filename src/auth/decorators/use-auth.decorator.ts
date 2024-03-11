import { UseGuards, applyDecorators } from '@nestjs/common';
import { ValidRoles } from '../interfaces';
import { RoleProtected } from './role-protected.decorator';
import { AuthGuard } from '@nestjs/passport';
import { UserRoleGuard } from '../guards';

// * Combinacion de decoradores
export const UseAuth = (...args: ValidRoles[]) => {
  return applyDecorators(
    // * Metadata para los roles
    RoleProtected(...args),
    // * Guardia base + guardia x rol
    UseGuards(AuthGuard(), UserRoleGuard),
  );
};
