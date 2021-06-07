import { Category } from '../model/category.model';

interface ICreateCategoryDTO {
  name: string;
  description: string;
}

class CategoriesRepository {
  private categories: Array<Category>;

  constructor() {
    this.categories = [];
  }

  public create({ name, description }: ICreateCategoryDTO): void {
    const category = new Category(name, description, new Date());
    this.categories.push(category);
  }

  public list(): Array<Category> {
    return this.categories;
  }

  public findByName(name: string): Category {
    return this.categories.find((category) => category.name === name);
  }
}

export { CategoriesRepository };
