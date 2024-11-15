
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import CategoriaProducto from 'App/Models/CategoriaProducto';
import CategoriaProductoValidator from 'App/Validators/CategoriaProductoValidator';

export default class CategoriaProductosController {
  public async find({ request, params }: HttpContextContract) {
    if (params.id) {
      return await CategoriaProducto.findOrFail(params.id);
    } else {
      const data = request.all();
      if ('page' in data && 'per_page' in data) {
        const page = request.input('page', 1);
        const perPage = request.input('per_page', 20);
        return await CategoriaProducto.query().paginate(page, perPage);
      } else {
        return await CategoriaProducto.query();
      }
    }
  }

  public async create({ request }: HttpContextContract) {
    await request.validate(CategoriaProductoValidator);
    const body = request.body();
    return await CategoriaProducto.create(body);
  }

  public async update({ params, request }: HttpContextContract) {
    const record = await CategoriaProducto.findOrFail(params.id);
    const body = request.body();
    
    record.categoria_id = body.categoria_id;
    record.producto_id = body.producto_id;

    return await record.save();
  }

  public async delete({ params, response }: HttpContextContract) {
    const record = await CategoriaProducto.findOrFail(params.id);
    await record.delete();
    response.status(204);
  }
}
