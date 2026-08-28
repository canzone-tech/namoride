import { describe, expect, it } from 'vitest';
import { getCorsOrigins, parseEnvironment } from '../src/config/env';

const validEnvironment = {
  NODE_ENV: 'test',
  APP_VERSION: '0.1.0-test',
  API_HOST: '127.0.0.1',
  API_PORT: '3100',
  DATABASE_URL: 'mysql://user:pass@localhost:3306/namoride',
  DATABASE_CONNECTION_LIMIT: '7',
  REDIS_URL: 'redis://localhost:6379',
  CORS_ORIGINS: 'http://localhost:3001,https://admin.example.test',
} satisfies NodeJS.ProcessEnv;

describe('environment configuration', () => {
  it('parses and coerces valid values', () => {
    const environment = parseEnvironment(validEnvironment);

    expect(environment.API_PORT).toBe(3100);
    expect(environment.DATABASE_CONNECTION_LIMIT).toBe(7);
    expect(getCorsOrigins(environment)).toEqual([
      'http://localhost:3001',
      'https://admin.example.test',
    ]);
  });

  it('rejects a non-MySQL primary database URL', () => {
    expect(() =>
      parseEnvironment({
        ...validEnvironment,
        DATABASE_URL: 'postgresql://user:pass@localhost:5432/namoride',
      }),
    ).toThrow(/DATABASE_URL must use mysql:\/\//);
  });
});
