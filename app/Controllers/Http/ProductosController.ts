
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Producto from 'App/Models/Producto';
import ProductoValidator from 'App/Validators/ProductoValidator';

export default class ProductosController {
  public async find({ request, params }: HttpContextContract) {
    if (params.id) {
      return await Producto.findOrFail(params.id);
    } else {
      const data = request.all();
      if ('page' in data && 'per_page' in data) {
        const page = request.input('page', 1);
        const perPage = request.input('per_page', 20);
        return await Producto.query().paginate(page, perPage);
      } else {
        return await Producto.query();
      }
    }
  }

  public async create({ request }: HttpContextContract) {
    await request.validate(ProductoValidator);
    const body = request.body();
    return await Producto.create(body);
  }

  public async update({ params, request }: HttpContextContract) {
    const record = await Producto.findOrFail(params.id);
    const body = request.body();
    
    record.nombre = body.nombre;
    record.cantidad = body.cantidad;
    record.peso = body.peso;
    record.lote_id = body.lote_id;
    record.cliente_id = body.cliente_id;

    return await record.save();
  }

  public async delete({ params, response }: HttpContextContract) {
    const record = await Producto.findOrFail(params.id);
    await record.delete();
    response.status(204);
  }
}
