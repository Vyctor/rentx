import { hash } from 'bcryptjs';
import request from 'supertest';
import { DataSource } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

import { AppDataSource } from '@shared/infra/typeorm';
import { app } from '@shared/infra/http/app';

let connection: DataSource;

describe('List Category Controller', () => {
  beforeAll(async () => {
    connection = AppDataSource;
    if (!connection.isInitialized) {
      await connection.initialize();
    }

    await connection.runMigrations();

    const id = uuidV4();
    const password = await hash('admin', 8);

    await connection.query(
      `INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license )
        values('${id}', 'admin', 'admin@rentx.com.br', '${password}', true, 'now()', 'XXXXXX')
      `,
    );
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.destroy();
  });

  it('should be able list all categories', async () => {
    const responseToken = await request(app).post('/sessions').send({
      email: 'admin@rentx.com.br',
      password: 'admin',
    });

    const { token } = responseToken.body;

    await request(app)
      .post('/categories')
      .send({
        name: 'Sedan',
        description: 'A Fancy nice ride',
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    const response = await request(app).get('/categories');

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
    expect(response.body[0]).toHaveProperty('id');
  });
});
