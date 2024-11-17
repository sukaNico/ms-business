
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Restaurante from 'App/Models/Restaurante';
import RestauranteValidator from 'App/Validators/RestauranteValidator';

export default class RestaurantesController {
  public async find({ request, params }: HttpContextContract) {
    if (params.id) {
      return await Restaurante.findOrFail(params.id);
    } else {
      const data = request.all();
      if ('page' in data && 'per_page' in data) {
        const page = request.input('page', 1);
        const perPage = request.input('per_page', 20);
        return await Restaurante.query().paginate(page, perPage);
      } else {
        return await Restaurante.query();
      }
    }
  }

  public async create({ request }: HttpContextContract) {
    await request.validate(RestauranteValidator);
    const body = request.body();
    return await Restaurante.create(body);
  }

  public async update({ params, request }: HttpContextContract) {
    const record = await Restaurante.findOrFail(params.id);
    const body = request.body();
    
    record.tipoCocina = body.tipoCocina;
    record.servicio_id = body.servicio_id;

    return await record.save();
  }

  public async delete({ params, response }: HttpContextContract) {
    const record = await Restaurante.findOrFail(params.id);
    await record.delete();
    response.status(204);
  }
}
