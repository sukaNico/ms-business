
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Duenio from 'App/Models/Duenio';
import DuenioValidator from 'App/Validators/DuenioValidator';

export default class DueniosController {
  public async find({ request, params }: HttpContextContract) {
    if (params.id) {
      return await Duenio.findOrFail(params.id);
    } else {
      const data = request.all();
      if ('page' in data && 'per_page' in data) {
        const page = request.input('page', 1);
        const perPage = request.input('per_page', 20);
        return await Duenio.query().paginate(page, perPage);
      } else {
        return await Duenio.query();
      }
    }
  }

  public async create({ request }: HttpContextContract) {
    await request.validate(DuenioValidator);
    const body = request.body();
    return await Duenio.create(body);
  }

  public async update({ params, request }: HttpContextContract) {
    const record = await Duenio.findOrFail(params.id);
    const body = request.body();
    
    record.conductor_id = body.conductor_id;
    record.usuario_id = body.usuario_id;

    return await record.save();
  }

  public async delete({ params, response }: HttpContextContract) {
    const record = await Duenio.findOrFail(params.id);
    await record.delete();
    response.status(204);
  }
}
