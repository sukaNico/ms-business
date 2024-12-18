
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Lote from 'App/Models/Lote';
import LoteValidator from 'App/Validators/LoteValidator';

export default class LotesController {
  public async find({ request, params }: HttpContextContract) {
    if (params.id) {
      return await Lote.findOrFail(params.id);
    } else {
      const data = request.all();
      if("ruta_id" in data){
          return await Lote.query().where("ruta_id", request.input("ruta_id"))}
      if ('page' in data && 'per_page' in data) {
        const page = request.input('page', 1);
        const perPage = request.input('per_page', 20);
        return await Lote.query().paginate(page, perPage);
      } else {
        return await Lote.query();
      }
    }
  }

  public async create({ request }: HttpContextContract) {
    await request.validate(LoteValidator);
    const body = request.body();
    return await Lote.create(body);
  }

  public async update({ params, request }: HttpContextContract) {
    const record = await Lote.findOrFail(params.id);
    const body = request.body();
    
    record.tipo_de_carga = body.tipoDeCarga;
    record.peso = body.peso;
    record.ruta_id = body.ruta_id;

    return await record.save();
  }

  public async delete({ params, response }: HttpContextContract) {
    const record = await Lote.findOrFail(params.id);
    await record.delete();
    response.status(204);
  }
}
