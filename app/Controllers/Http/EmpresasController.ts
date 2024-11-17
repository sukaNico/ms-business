
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Empresa from 'App/Models/Empresa';
import EmpresaValidator from 'App/Validators/EmpresaValidator';

export default class EmpresasController {
  public async find({ request, params }: HttpContextContract) {
    if (params.id) {
      return await Empresa.findOrFail(params.id);
    } else {
      const data = request.all();
      if ('page' in data && 'per_page' in data) {
        const page = request.input('page', 1);
        const perPage = request.input('per_page', 20);
        return await Empresa.query().paginate(page, perPage);
      } else {
        return await Empresa.query();
      }
    }
  }

  public async create({ request }: HttpContextContract) {
    await request.validate(EmpresaValidator);
    const body = request.body();
    return await Empresa.create(body);
  }

  public async update({ params, request }: HttpContextContract) {
    const record = await Empresa.findOrFail(params.id);
    const body = request.body();
    
    record.nombre = body.nombre;
    record.nit = body.nit;
    record.persona_natural_id = body.persona_natural_id;
    record.cliente_id = body.cliente_id;

    return await record.save();
  }

  public async delete({ params, response }: HttpContextContract) {
    const record = await Empresa.findOrFail(params.id);
    await record.delete();
    response.status(204);
  }
}
