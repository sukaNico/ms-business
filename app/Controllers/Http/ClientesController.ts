
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Cliente from 'App/Models/Cliente';
import ClienteValidator from 'App/Validators/ClienteValidator';

export default class ClientesController {
  public async find({ request, params }: HttpContextContract) {
    if (params.id) {
      return await Cliente.findOrFail(params.id);
    } else {
      const data = request.all();
      if ('page' in data && 'per_page' in data) {
        const page = request.input('page', 1);
        const perPage = request.input('per_page', 20);
        return await Cliente.query().paginate(page, perPage);
      } else {
        return await Cliente.query();
      }
    }
  }

  public async create({ request }: HttpContextContract) {
    await request.validate(ClienteValidator);
    const body = request.body();
    return await Cliente.create(body);
  }

  public async update({ params, request }: HttpContextContract) {
    const record = await Cliente.findOrFail(params.id);
    const body = request.body();
    
    record.fechaRegistro = body.fechaRegistro;
    record.preferencias = body.preferencias;

    return await record.save();
  }

  public async delete({ params, response }: HttpContextContract) {
    const record = await Cliente.findOrFail(params.id);
    await record.delete();
    response.status(204);
  }
}
