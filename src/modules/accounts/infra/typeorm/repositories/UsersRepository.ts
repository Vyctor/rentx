import { Repository } from 'typeorm';

import ICreateUserDTO from '@modules/accounts/dtos/ICreateUserDTO';
import { User } from '@modules/accounts/infra/typeorm/entities/User';
import { AppDataSource } from '@shared/infra/typeorm';

import { IUsersRepository } from '../../../repositories/IUsersRepository';

class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = AppDataSource.getRepository(User);
  }

  public async create({ name, email, password, driver_license, avatar, id }: ICreateUserDTO): Promise<void> {
    const user = this.repository.create({
      name,
      email,
      password,
      driver_license,
      avatar,
      id,
    });

    await this.repository.save(user);
  }

  public async findByEmail(email: string): Promise<User | null> {
    const user = await this.repository.findOne({ where: { email } });
    return user;
  }

  public async findById(id: string): Promise<User | null> {
    const user = await this.repository.findOne({ where: { id } });
    return user;
  }
}

export { UsersRepository };
