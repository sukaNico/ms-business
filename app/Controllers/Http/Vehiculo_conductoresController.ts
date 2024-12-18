import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import VehiculoConductor from 'App/Models/VehiculoConductor';

export default class VehiculoConductoresController {
  public async find({ request, params }: HttpContextContract) {
    if (params.id) {
      return await VehiculoConductor.findOrFail(params.id);
    } else {
      const data = request.all();
      if ('page' in data && 'per_page' in data) {
        const page = request.input('page', 1);
        const perPage = request.input('per_page', 20);
        return await VehiculoConductor.query().paginate(page, perPage);
      } else {
        return await VehiculoConductor.query();
      }
    }
  }

  public async create({ request }: HttpContextContract) {
    const body = request.body();
    return await VehiculoConductor.create(body);
  }

  public async update({ params, request }: HttpContextContract) {
    const record = await VehiculoConductor.findOrFail(params.id);
    const body = request.body();

    record.vehiculo_id = body.vehiculo_id;
    record.conductor_id = body.conductor_id;

    return await record.save();
  }

  public async delete({ params, response }: HttpContextContract) {
    const record = await VehiculoConductor.findOrFail(params.id);
    await record.delete();
    response.status(204);
  }
}