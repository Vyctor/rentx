import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { DevolutionRentalUseCase } from './DevolutionRentalUseCase';

class DevolutionRentalController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { id: user_id } = request.user;
    const devolutionRentalUseCase = container.resolve(DevolutionRentalUseCase);

    const rental = devolutionRentalUseCase.execute({
      id: id as string,
      user_id,
    });

    return response.status(200).json(rental);
  }
}

export { DevolutionRentalController };
