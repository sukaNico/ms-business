
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import CentroDistribucion from 'App/Models/CentroDistribucion';
import CentroDistribucionValidator from 'App/Validators/CentroDistribucionValidator';

export default class CentroDistribucionesController {
  public async find({ request, params }: HttpContextContract) {
    if (params.id) {
      return await CentroDistribucion.findOrFail(params.id);
    } else {
      const data = request.all();
      if ('page' in data && 'per_page' in data) {
        const page = request.input('page', 1);
        const perPage = request.input('per_page', 20);
        return await CentroDistribucion.query().paginate(page, perPage);
      } else {
        return await CentroDistribucion.query();
      }
    }
  }

  public async create({ request }: HttpContextContract) {
    await request.validate(CentroDistribucionValidator);
    const body = request.body();
    return await CentroDistribucion.create(body);
  }

  public async update({ params, request }: HttpContextContract) {
    const record = await CentroDistribucion.findOrFail(params.id);
    const body = request.body();
    
    record.nombre = body.nombre;
    record.capacidad = body.capacidad;
    record.telefono = body.telefono;
    record.hora_apertura = body.hora_apertura;
    record.hora_cierre = body.hora_cierre;
    record.direccion_id = body.direccion_id;

    return await record.save();
  }

  public async delete({ params, response }: HttpContextContract) {
    const record = await CentroDistribucion.findOrFail(params.id);
    await record.delete();
    response.status(204);
  }
}
