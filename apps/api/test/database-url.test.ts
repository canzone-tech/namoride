import { describe, expect, it } from 'vitest';
import { parseMysqlConnectionUrl } from '../src/database/database-url';

describe('parseMysqlConnectionUrl', () => {
  it('parses a MySQL URL and applies the default port', () => {
    expect(
      parseMysqlConnectionUrl('mysql://namo:p%40ss@db.internal/namoride'),
    ).toEqual({
      host: 'db.internal',
      port: 3306,
      user: 'namo',
      password: 'p@ss',
      database: 'namoride',
    });
  });

  it('rejects non-MySQL protocols', () => {
    expect(() =>
      parseMysqlConnectionUrl('postgresql://user:pass@localhost/namoride'),
    ).toThrow(/mysql:\/\//);
  });
});
