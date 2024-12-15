
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Direccion from 'App/Models/Direccion';
import DireccionValidator from 'App/Validators/DireccionValidator';

export default class DireccionesController {
  public async find({ request, params }: HttpContextContract) {
    if (params.id) {
      return await Direccion.findOrFail(params.id);
    } else {
      const data = request.all();
      if ('page' in data && 'per_page' in data) {
        const page = request.input('page', 1);
        const perPage = request.input('per_page', 20);
        return await Direccion.query().paginate(page, perPage);
      } else {
        return await Direccion.query();
      }
    }
  }

  public async create({ request }: HttpContextContract) {
    await request.validate(DireccionValidator);
    const body = request.body();
    return await Direccion.create(body);
  }

  public async update({ params, request }: HttpContextContract) {
    const record = await Direccion.findOrFail(params.id);
    const body = request.body();
    
    record.barrio = body.barrio;
    record.tipo_calle = body.tipoCalle;
    record.calle = body.calle;
    record.numero = body.numero;
    record.piso = body.piso;
    record.municipio_id = body.municipio_id;

    return await record.save();
  }

  public async delete({ params, response }: HttpContextContract) {
    const record = await Direccion.findOrFail(params.id);
    await record.delete();
    response.status(204);
  }
}
