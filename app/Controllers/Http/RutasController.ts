
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Ruta from 'App/Models/Ruta';
import RutaValidator from 'App/Validators/RutaValidator';

export default class RutasController {
  public async find({ request, params }: HttpContextContract) {
    if (params.id) {
      return await Ruta.findOrFail(params.id);
    } else {
      const data = request.all();
      if ('page' in data && 'per_page' in data) {
        const page = request.input('page', 1);
        const perPage = request.input('per_page', 20);
        return await Ruta.query().paginate(page, perPage);
      } else {
        return await Ruta.query();
      }
    }
  }

  public async create({ request }: HttpContextContract) {
    await request.validate(RutaValidator);
    const body = request.body();
    return await Ruta.create(body);
  }

  public async update({ params, request }: HttpContextContract) {
    const record = await Ruta.findOrFail(params.id);
    const body = request.body();
    
    record.contrato_id = body.contrato_id;
    record.vehiculo_id = body.vehiculo_id;
    record.lugar_inicio = body.lugar_inicio;
    record.lugar_fin = body.lugar_fin;
    record.distancia = body.distancia;
    record.fecha_inicio = body.fecha_inicio;
    record.fecha_fin = body.fecha_fin;

    return await record.save();
  }

  public async delete({ params, response }: HttpContextContract) {
    const record = await Ruta.findOrFail(params.id);
    await record.delete();
    response.status(204);
  }
}
