
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Operacion from 'App/Models/Operacion';
import OperacionValidator from 'App/Validators/OperacionValidator';

export default class OperacionesController {
  public async find({ request, params }: HttpContextContract) {
    if (params.id) {
      return await Operacion.findOrFail(params.id);
    } else {
      const data = request.all();
      if ('page' in data && 'per_page' in data) {
        const page = request.input('page', 1);
        const perPage = request.input('per_page', 20);
        return await Operacion.query().paginate(page, perPage);
      } else {
        return await Operacion.query();
      }
    }
  }

  public async create({ request }: HttpContextContract) {
    await request.validate(OperacionValidator);
    const body = request.body();
    return await Operacion.create(body);
  }

  public async update({ params, request }: HttpContextContract) {
    const record = await Operacion.findOrFail(params.id);
    const body = request.body();
    
    record.fechaInicio = body.fechaInicio;
    record.fechaFinalizacion = body.fechaFinalizacion;
    record.municipio_id = body.municipio_id;
    record.vehiculo_id = body.vehiculo_id;

    return await record.save();
  }

  public async delete({ params, response }: HttpContextContract) {
    const record = await Operacion.findOrFail(params.id);
    await record.delete();
    response.status(204);
  }
}
