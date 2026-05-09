import { Repository, In } from 'typeorm';

import { Specification } from '@modules/cars/infra/typeorm/entities/Specification';
import { AppDataSource } from '@shared/infra/typeorm';
import { ICreateSpecificationDTO, ISpecificationsRepository } from '@modules/cars/repositories/ISpecificationRepository';

class SpecificationsRepository implements ISpecificationsRepository {
  private readonly repository: Repository<Specification>;
  constructor() {
    this.repository = AppDataSource.getRepository(Specification);
  }

  public async create({ name, description }: ICreateSpecificationDTO): Promise<Specification> {
    const specification = this.repository.create({
      name,
      description,
    });
    await this.repository.save(specification);
    return specification;
  }

  public async findByName(name: string): Promise<Specification | null> {
    return this.repository.findOne({ where: { name } });
  }

  public async findByIds(idList: string[]): Promise<Specification[]> {
    return this.repository.findBy({ id: In(idList) });
  }
}

export { SpecificationsRepository };
