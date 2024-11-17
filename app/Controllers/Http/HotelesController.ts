
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Hotel from 'App/Models/Hotel';
import HotelValidator from 'App/Validators/HotelValidator';

export default class HotelesController {
  public async find({ request, params }: HttpContextContract) {
    if (params.id) {
      return await Hotel.findOrFail(params.id);
    } else {
      const data = request.all();
      if ('page' in data && 'per_page' in data) {
        const page = request.input('page', 1);
        const perPage = request.input('per_page', 20);
        return await Hotel.query().paginate(page, perPage);
      } else {
        return await Hotel.query();
      }
    }
  }

  public async create({ request }: HttpContextContract) {
    await request.validate(HotelValidator);
    const body = request.body();
    return await Hotel.create(body);
  }

  public async update({ params, request }: HttpContextContract) {
    const record = await Hotel.findOrFail(params.id);
    const body = request.body();
    
    record.númeroHabitacion = body.númeroHabitacion;
    record.serviciosIncluidos = body.serviciosIncluidos;
    record.servicio_id = body.servicio_id;

    return await record.save();
  }

  public async delete({ params, response }: HttpContextContract) {
    const record = await Hotel.findOrFail(params.id);
    await record.delete();
    response.status(204);
  }
}
