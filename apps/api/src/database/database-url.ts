export interface MysqlConnectionOptions {
  host: string;
  port: number;
  user: string;
  password: string;
  database: string;
}

export function parseMysqlConnectionUrl(value: string): MysqlConnectionOptions {
  const url = new URL(value);

  if (url.protocol !== 'mysql:') {
    throw new Error('Database URL must use the mysql:// protocol');
  }

  const database = decodeURIComponent(url.pathname.replace(/^\/+/, ''));
  const user = decodeURIComponent(url.username);

  if (!url.hostname || !database || !user) {
    throw new Error('Database URL must include host, user, and database name');
  }

  const port = url.port ? Number.parseInt(url.port, 10) : 3306;

  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error('Database URL contains an invalid port');
  }

  return {
    host: url.hostname,
    port,
    user,
    password: decodeURIComponent(url.password),
    database,
  };
}
