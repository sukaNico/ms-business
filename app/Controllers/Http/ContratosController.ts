
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Contrato from 'App/Models/Contrato';
import ContratoValidator from 'App/Validators/ContratoValidator';

export default class ContratosController {
  public async find({ request, params }: HttpContextContract) {
    if (params.id) {
      return await Contrato.findOrFail(params.id);
    } else {
      const data = request.all();
      if("cliente_id" in data){
              return await Contrato.query().where("cliente_id", request.input("cliente_id"))}
      if ('page' in data && 'per_page' in data) {
        const page = request.input('page', 1);
        const perPage = request.input('per_page', 20);
        return await Contrato.query().paginate(page, perPage);
      } else {
        return await Contrato.query();
      }
    }
  }

  public async create({ request }: HttpContextContract) {
    await request.validate(ContratoValidator);
    const body = request.body();
    return await Contrato.create(body);
  }

  public async update({ params, request }: HttpContextContract) {
    const record = await Contrato.findOrFail(params.id);
    const body = request.body();
    
    record.cliente_id = body.cliente_id;
    record.valor = body.valor;
    record.fecha_inico = body.fecha_inico;
    record.fecha_fin = body.fecha_fin;

    return await record.save();
  }

  public async delete({ params, response }: HttpContextContract) {
    const record = await Contrato.findOrFail(params.id);
    await record.delete();
    response.status(204);
  }
}
