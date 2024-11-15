
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Categoria from 'App/Models/Categoria';
import CategoriaValidator from 'App/Validators/CategoriaValidator';

export default class CategoriasController {
  public async find({ request, params }: HttpContextContract) {
    if (params.id) {
      return await Categoria.findOrFail(params.id);
    } else {
      const data = request.all();
      if ('page' in data && 'per_page' in data) {
        const page = request.input('page', 1);
        const perPage = request.input('per_page', 20);
        return await Categoria.query().paginate(page, perPage);
      } else {
        return await Categoria.query();
      }
    }
  }

  public async create({ request }: HttpContextContract) {
    await request.validate(CategoriaValidator);
    const body = request.body();
    return await Categoria.create(body);
  }

  public async update({ params, request }: HttpContextContract) {
    const record = await Categoria.findOrFail(params.id);
    const body = request.body();
    
    record.nombre = body.nombre;

    return await record.save();
  }

  public async delete({ params, response }: HttpContextContract) {
    const record = await Categoria.findOrFail(params.id);
    await record.delete();
    response.status(204);
  }
}
