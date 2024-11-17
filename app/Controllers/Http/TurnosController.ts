
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Turno from 'App/Models/Turno';
import TurnoValidator from 'App/Validators/TurnoValidator';

export default class TurnosController {
  public async find({ request, params }: HttpContextContract) {
    if (params.id) {
      return await Turno.findOrFail(params.id);
    } else {
      const data = request.all();
      if ('page' in data && 'per_page' in data) {
        const page = request.input('page', 1);
        const perPage = request.input('per_page', 20);
        return await Turno.query().paginate(page, perPage);
      } else {
        return await Turno.query();
      }
    }
  }

  public async create({ request }: HttpContextContract) {
    await request.validate(TurnoValidator);
    const body = request.body();
    return await Turno.create(body);
  }

  public async update({ params, request }: HttpContextContract) {
    const record = await Turno.findOrFail(params.id);
    const body = request.body();
    
    record.conductor_id = body.conductor_id;
    record.hora_inico = body.hora_inico;
    record.hora_fin = body.hora_fin;
    record.ubicacion = body.ubicacion;

    return await record.save();
  }

  public async delete({ params, response }: HttpContextContract) {
    const record = await Turno.findOrFail(params.id);
    await record.delete();
    response.status(204);
  }
}
