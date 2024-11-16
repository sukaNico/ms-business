
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Departamento from 'App/Models/Departamento';
import DepartamentoValidator from 'App/Validators/DepartamentoValidator';

export default class DepartamentosController {
  public async find({ request, params }: HttpContextContract) {
    if (params.id) {
      return await Departamento.findOrFail(params.id);
    } else {
      const data = request.all();
      if ('page' in data && 'per_page' in data) {
        const page = request.input('page', 1);
        const perPage = request.input('per_page', 20);
        return await Departamento.query().paginate(page, perPage);
      } else {
        return await Departamento.query();
      }
    }
  }

  public async create({ request }: HttpContextContract) {
    await request.validate(DepartamentoValidator);
    const body = request.body();
    return await Departamento.create(body);
  }

  public async update({ params, request }: HttpContextContract) {
    const record = await Departamento.findOrFail(params.id);
    const body = request.body();
    
    record.nombre = body.nombre;
    record.superficie = body.superficie;
    record.poblacion = body.poblacion;
    record.postalCode = body.postalCode;

    return await record.save();
  }

  public async delete({ params, response }: HttpContextContract) {
    const record = await Departamento.findOrFail(params.id);
    await record.delete();
    response.status(204);
  }
}
