
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Administrador from 'App/Models/Administrador';
import AdministradorValidator from 'App/Validators/AdministradorValidator';

export default class AdministradoresController {
  public async find({ request, params }: HttpContextContract) {
    if (params.id) {
      return await Administrador.findOrFail(params.id);
    } else {
      const data = request.all();
      if ('page' in data && 'per_page' in data) {
        const page = request.input('page', 1);
        const perPage = request.input('per_page', 20);
        return await Administrador.query().paginate(page, perPage);
      } else {
        return await Administrador.query();
      }
    }
  }

  public async create({ request }: HttpContextContract) {
    await request.validate(AdministradorValidator);
    const body = request.body();
    return await Administrador.create(body);
  }

  public async update({ params, request }: HttpContextContract) {
    const record = await Administrador.findOrFail(params.id);
    const body = request.body();
    
    record.nivelAcceso = body.nivelAcceso;
    record.usuario_id = body.usuario_id;
    record.servicio_id = body.servicio_id;

    return await record.save();
  }

  public async delete({ params, response }: HttpContextContract) {
    const record = await Administrador.findOrFail(params.id);
    await record.delete();
    response.status(204);
  }
}
