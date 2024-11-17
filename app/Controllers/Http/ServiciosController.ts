
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Servicio from 'App/Models/Servicio';
import ServicioValidator from 'App/Validators/ServicioValidator';

export default class ServiciosController {
  public async find({ request, params }: HttpContextContract) {
    if (params.id) {
      return await Servicio.findOrFail(params.id);
    } else {
      const data = request.all();
      if ('page' in data && 'per_page' in data) {
        const page = request.input('page', 1);
        const perPage = request.input('per_page', 20);
        return await Servicio.query().paginate(page, perPage);
      } else {
        return await Servicio.query();
      }
    }
  }

  public async create({ request }: HttpContextContract) {
    await request.validate(ServicioValidator);
    const body = request.body();
    return await Servicio.create(body);
  }

  public async update({ params, request }: HttpContextContract) {
    const record = await Servicio.findOrFail(params.id);
    const body = request.body();
    
    record.nombre = body.nombre;
    record.direccion = body.direccion;
    record.descripcion = body.descripcion;
    record.fecha = body.fecha;

    return await record.save();
  }

  public async delete({ params, response }: HttpContextContract) {
    const record = await Servicio.findOrFail(params.id);
    await record.delete();
    response.status(204);
  }
}
