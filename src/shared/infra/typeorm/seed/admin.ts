import { hash } from 'bcryptjs';
import { v4 as uuidV4 } from 'uuid';

import { AppDataSource } from '../index';

async function create() {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
  }

  const id = uuidV4();
  const password = await hash('admin', 8);

  await AppDataSource.query(
    `INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license )
      values('${id}', 'admin', 'admin@rentx.com.br', '${password}', true, 'now()', 'XXXXXX')
    `,
  );

  await AppDataSource.destroy();
}

create().then(() => console.log('User admin created!'));
