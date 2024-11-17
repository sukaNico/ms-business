
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Conductor from 'App/Models/Conductor';
import ConductorValidator from 'App/Validators/ConductorValidator';

export default class ConductoresController {
  public async find({ request, params }: HttpContextContract) {
    if (params.id) {
      return await Conductor.findOrFail(params.id);
    } else {
      const data = request.all();
      if ('page' in data && 'per_page' in data) {
        const page = request.input('page', 1);
        const perPage = request.input('per_page', 20);
        return await Conductor.query().paginate(page, perPage);
      } else {
        return await Conductor.query();
      }
    }
  }

  public async create({ request }: HttpContextContract) {
    await request.validate(ConductorValidator);
    const body = request.body();
    return await Conductor.create(body);
  }

  public async update({ params, request }: HttpContextContract) {
    const record = await Conductor.findOrFail(params.id);
    const body = request.body();
    
    record.usuario_id = body.usuario_id;
    record.licencia_conduccion = body.licencia_conduccion;
    record.años_experiencia = body.años_experiencia;

    return await record.save();
  }

  public async delete({ params, response }: HttpContextContract) {
    const record = await Conductor.findOrFail(params.id);
    await record.delete();
    response.status(204);
  }
}
