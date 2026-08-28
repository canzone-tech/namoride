import { Controller, Get } from '@nestjs/common';
import { HealthService } from './health.service';

@Controller('health')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get()
  readiness() {
    return this.healthService.readiness();
  }

  @Get('live')
  liveness() {
    return this.healthService.liveness();
  }
}
