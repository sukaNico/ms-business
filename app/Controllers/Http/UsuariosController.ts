
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Usuario from 'App/Models/Usuario';
import UsuarioValidator from 'App/Validators/UsuarioValidator';

export default class UsuariosController {
  public async find({ request, params }: HttpContextContract) {
    if (params.id) {
      return await Usuario.findOrFail(params.id);
    } else {
      const data = request.all();
      if ('page' in data && 'per_page' in data) {
        const page = request.input('page', 1);
        const perPage = request.input('per_page', 20);
        return await Usuario.query().paginate(page, perPage);
      } else {
        return await Usuario.query();
      }
    }
  }

  public async create({ request }: HttpContextContract) {
    await request.validate(UsuarioValidator);
    const body = request.body();
    return await Usuario.create(body);
  }

  public async update({ params, request }: HttpContextContract) {
    const record = await Usuario.findOrFail(params.id);
    const body = request.body();
    
    record.nombre = body.nombre;
    record.cedula = body.cedula;
    record.email = body.email;
    record.telefono = body.telefono;

    return await record.save();
  }

  public async delete({ params, response }: HttpContextContract) {
    const record = await Usuario.findOrFail(params.id);
    await record.delete();
    response.status(204);
  }
}
