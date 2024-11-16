
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Municipio from 'App/Models/Municipio';
import MunicipioValidator from 'App/Validators/MunicipioValidator';

export default class MunicipiosController {
  public async find({ request, params }: HttpContextContract) {
    if (params.id) {
      return await Municipio.findOrFail(params.id);
    } else {
      const data = request.all();
      if ('page' in data && 'per_page' in data) {
        const page = request.input('page', 1);
        const perPage = request.input('per_page', 20);
        return await Municipio.query().paginate(page, perPage);
      } else {
        return await Municipio.query();
      }
    }
  }

  public async create({ request }: HttpContextContract) {
    await request.validate(MunicipioValidator);
    const body = request.body();
    return await Municipio.create(body);
  }

  public async update({ params, request }: HttpContextContract) {
    const record = await Municipio.findOrFail(params.id);
    const body = request.body();
    
    record.nombre = body.nombre;
    record.departamento_id = body.departamento_id;

    return await record.save();
  }

  public async delete({ params, response }: HttpContextContract) {
    const record = await Municipio.findOrFail(params.id);
    await record.delete();
    response.status(204);
  }
}
