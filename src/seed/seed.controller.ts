import { Controller, Get } from '@nestjs/common';
import { SeedService } from './seed.service';
import { UseAuth, ValidRoles } from 'src/auth';

@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @UseAuth(ValidRoles.superUser)
  @Get()
  generateData() {
    return this.seedService.runSeed();
  }
}
