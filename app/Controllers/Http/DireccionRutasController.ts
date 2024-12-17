
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import DireccionRuta from 'App/Models/DireccionRuta';
import DireccionRutaValidator from 'App/Validators/DireccionRutaValidator';

export default class DireccionRutasController {
  public async find({ request, params }: HttpContextContract) {
    if (params.id) {
      return await DireccionRuta.findOrFail(params.id);
    } else {
      const data = request.all();
      if ('page' in data && 'per_page' in data) {
        const page = request.input('page', 1);
        const perPage = request.input('per_page', 20);
        return await DireccionRuta.query().paginate(page, perPage);
      } else {
        return await DireccionRuta.query();
      }
    }
  }

  public async create({ request }: HttpContextContract) {
    await request.validate(DireccionRutaValidator);
    const body = request.body();
    return await DireccionRuta.create(body);
  }

  public async update({ params, request }: HttpContextContract) {
    const record = await DireccionRuta.findOrFail(params.id);
    const body = request.body();
    
    record.direccion_id = body.direccion_id;
    record.ruta_id = body.ruta_id;
    record.lote_id = body.lote_id;
    record.fecha_entrega = body.fecha_entrega;
    record.distancia = body.distancia;
    record.estado = body.estado;
    record.orden_de_paso= body.orden_de_paso;

    return await record.save();
  }

  public async delete({ params, response }: HttpContextContract) {
    const record = await DireccionRuta.findOrFail(params.id);
    await record.delete();
    response.status(204);
  }
}
