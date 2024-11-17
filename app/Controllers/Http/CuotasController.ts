
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Cuota from 'App/Models/Cuota';
import CuotaValidator from 'App/Validators/CuotaValidator';

export default class CuotasController {
  public async find({ request, params }: HttpContextContract) {
    if (params.id) {
      return await Cuota.findOrFail(params.id);
    } else {
      const data = request.all();
      if ('page' in data && 'per_page' in data) {
        const page = request.input('page', 1);
        const perPage = request.input('per_page', 20);
        return await Cuota.query().paginate(page, perPage);
      } else {
        return await Cuota.query();
      }
    }
  }

  public async create({ request }: HttpContextContract) {
    await request.validate(CuotaValidator);
    const body = request.body();
    return await Cuota.create(body);
  }

  public async update({ params, request }: HttpContextContract) {
    const record = await Cuota.findOrFail(params.id);
    const body = request.body();
    
    record.contrato_id = body.contrato_id;
    record.monto = body.monto;
    record.tasa_interes = body.tasa_interes;
    record.fecha_generacion = body.fecha_generacion;
    record.fecha_vencimiento = body.fecha_vencimiento;

    return await record.save();
  }

  public async delete({ params, response }: HttpContextContract) {
    const record = await Cuota.findOrFail(params.id);
    await record.delete();
    response.status(204);
  }
}
