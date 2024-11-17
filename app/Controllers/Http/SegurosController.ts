
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Seguro from 'App/Models/Seguro';
import SeguroValidator from 'App/Validators/SeguroValidator';

export default class SegurosController {
  public async find({ request, params }: HttpContextContract) {
    if (params.id) {
      return await Seguro.findOrFail(params.id);
    } else {
      const data = request.all();
      if ('page' in data && 'per_page' in data) {
        const page = request.input('page', 1);
        const perPage = request.input('per_page', 20);
        return await Seguro.query().paginate(page, perPage);
      } else {
        return await Seguro.query();
      }
    }
  }

  public async create({ request }: HttpContextContract) {
    await request.validate(SeguroValidator);
    const body = request.body();
    return await Seguro.create(body);
  }

  public async update({ params, request }: HttpContextContract) {
    const record = await Seguro.findOrFail(params.id);
    const body = request.body();
    
    record.vehiculo_id = body.vehiculo_id;
    record.tipo = body.tipo;
    record.aseguradora = body.aseguradora;
    record.fecha_inicio = body.fecha_inicio;
    record.fecha_fin = body.fecha_fin;

    return await record.save();
  }

  public async delete({ params, response }: HttpContextContract) {
    const record = await Seguro.findOrFail(params.id);
    await record.delete();
    response.status(204);
  }
}
