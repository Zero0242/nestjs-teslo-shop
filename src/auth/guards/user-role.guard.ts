import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { User } from 'src/entities';
import { META_ROLES } from '../decorators';

type GuardReturn = boolean | Promise<boolean> | Observable<boolean>;

// * Injectable porque es una clase
@Injectable()
export class UserRoleGuard implements CanActivate {
  // * reflector para lectura de metadata
  constructor(private readonly reflector: Reflector) {}
  canActivate(context: ExecutionContext): GuardReturn {
    const validRoles: string[] = this.reflector.get(
      META_ROLES,
      context.getHandler(),
    );

    // * Validacion del array del decorator
    if (!validRoles) return true;
    if (validRoles.length === 0) return true;

    // * Extraccion del usuario REQ
    const req = context.switchToHttp().getRequest();
    const user = req.user as User;
    if (!user) throw new BadRequestException('User not found');

    // * Verificacion roles
    for (const role of user.roles) {
      if (validRoles.includes(role)) return true;
    }

    // ! Punto sin retorno :c
    throw new ForbiddenException(
      'User ' + user.username + ' needs a valid role',
    );
  }
}
