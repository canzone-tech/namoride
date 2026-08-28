import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import { getEnvironment } from '../config/env';
import { PrismaService } from '../database/prisma.service';

interface HealthResponse {
  status: 'ok';
  service: 'namoride-api';
  version: string;
  timestamp: string;
  uptimeSeconds: number;
  checks?: {
    database: 'up';
  };
}

@Injectable()
export class HealthService {
  constructor(private readonly prisma: PrismaService) {}

  liveness(): HealthResponse {
    const environment = getEnvironment();

    return {
      status: 'ok',
      service: 'namoride-api',
      version: environment.APP_VERSION,
      timestamp: new Date().toISOString(),
      uptimeSeconds: Math.floor(process.uptime()),
    };
  }

  async readiness(): Promise<HealthResponse> {
    try {
      await this.prisma.$queryRaw`SELECT 1`;

      return {
        ...this.liveness(),
        checks: {
          database: 'up',
        },
      };
    } catch {
      throw new ServiceUnavailableException({
        status: 'error',
        service: 'namoride-api',
        timestamp: new Date().toISOString(),
        checks: {
          database: 'down',
        },
      });
    }
  }
}
