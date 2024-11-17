
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Factura from 'App/Models/Factura';
import FacturaValidator from 'App/Validators/FacturaValidator';

export default class FacturasController {
  public async find({ request, params }: HttpContextContract) {
    if (params.id) {
      return await Factura.findOrFail(params.id);
    } else {
      const data = request.all();
      if ('page' in data && 'per_page' in data) {
        const page = request.input('page', 1);
        const perPage = request.input('per_page', 20);
        return await Factura.query().paginate(page, perPage);
      } else {
        return await Factura.query();
      }
    }
  }

  public async create({ request }: HttpContextContract) {
    await request.validate(FacturaValidator);
    const body = request.body();
    return await Factura.create(body);
  }

  public async update({ params, request }: HttpContextContract) {
    const record = await Factura.findOrFail(params.id);
    const body = request.body();
    
    record.fecha = body.fecha;
    record.total = body.total;
    record.estado = body.estado;
    record.cuota_id = body.cuota_id;
    record.gasto_id = body.gasto_id;

    return await record.save();
  }

  public async delete({ params, response }: HttpContextContract) {
    const record = await Factura.findOrFail(params.id);
    await record.delete();
    response.status(204);
  }
}
