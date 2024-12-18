import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import DuenioVehiculo from 'App/Models/DuenioVehiculo';

export default class DuenioVehiculosController {
  public async find({ request, params }: HttpContextContract) {
    if (params.id) {
      return await DuenioVehiculo.findOrFail(params.id);
    } else {
      const data = request.all();
      if ('page' in data && 'per_page' in data) {
        const page = request.input('page', 1);
        const perPage = request.input('per_page', 20);
        return await DuenioVehiculo.query().paginate(page, perPage);
      } else {
        return await DuenioVehiculo.query();
      }
    }
  }

  public async create({ request }: HttpContextContract) {
    const body = request.body();
    return await DuenioVehiculo.create(body);
  }

  public async update({ params, request }: HttpContextContract) {
    const record = await DuenioVehiculo.findOrFail(params.id);
    const body = request.body();

    record.vehiculo_id = body.vehiculo_id;
    record.duenio_id = body.duenio_id;
    record.fecha_compra = body.fecha_compra;

    return await record.save();
  }

  public async delete({ params, response }: HttpContextContract) {
    const record = await DuenioVehiculo.findOrFail(params.id);
    await record.delete();
    response.status(204);
  }
}
