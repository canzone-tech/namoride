import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import { getEnvironment } from '../config/env';
import { PrismaClient } from '../generated/prisma/client';
import { parseMysqlConnectionUrl } from './database-url';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    const environment = getEnvironment();
    const connection = parseMysqlConnectionUrl(environment.DATABASE_URL);
    const adapter = new PrismaMariaDb({
      ...connection,
      connectionLimit: environment.DATABASE_CONNECTION_LIMIT,
    });

    super({ adapter });
  }

  async onModuleInit(): Promise<void> {
    await this.$connect();
  }

  async onModuleDestroy(): Promise<void> {
    await this.$disconnect();
  }
}
