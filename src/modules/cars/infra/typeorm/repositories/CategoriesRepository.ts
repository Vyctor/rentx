import { Repository } from 'typeorm';

import { Category } from '@modules/cars/infra/typeorm/entities/Category';
import { AppDataSource } from '@shared/infra/typeorm';

import { ICategoriesRepository, ICreateCategoryDTO } from '../../../repositories/ICategoriesRepository';

class CategoriesRepository implements ICategoriesRepository {
  private readonly repository: Repository<Category>;

  constructor() {
    this.repository = AppDataSource.getRepository(Category);
  }

  public async create({ name, description }: ICreateCategoryDTO): Promise<void> {
    const category = this.repository.create({
      description,
      name,
    });

    await this.repository.save(category);
  }

  public async list(): Promise<Array<Category>> {
    const categories = this.repository.find();

    return categories;
  }

  public async findByName(name: string): Promise<Category | null> {
    const category = await this.repository.findOne({ where: { name } });
    return category;
  }
}

export { CategoriesRepository };
