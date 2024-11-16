
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Gasto from 'App/Models/Gasto';
import GastoValidator from 'App/Validators/GastoValidator';

export default class GastosController {
  public async find({ request, params }: HttpContextContract) {
    if (params.id) {
      return await Gasto.findOrFail(params.id);
    } else {
      const data = request.all();
      if ('page' in data && 'per_page' in data) {
        const page = request.input('page', 1);
        const perPage = request.input('per_page', 20);
        return await Gasto.query().paginate(page, perPage);
      } else {
        return await Gasto.query();
      }
    }
  }

  public async create({ request }: HttpContextContract) {
    await request.validate(GastoValidator);
    const body = request.body();
    return await Gasto.create(body);
  }

  public async update({ params, request }: HttpContextContract) {
    const record = await Gasto.findOrFail(params.id);
    const body = request.body();
    
    record.servicio_id = body.servicio_id;
    record.conductor_id = body.conductor_id;
    record.monto = body.monto;
    record.descripcion = body.descripcion;
    record.estado = body.estado;
    record.dueño_id = body.dueño_id;

    return await record.save();
  }

  public async delete({ params, response }: HttpContextContract) {
    const record = await Gasto.findOrFail(params.id);
    await record.delete();
    response.status(204);
  }
}
