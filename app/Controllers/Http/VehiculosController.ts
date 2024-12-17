
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Vehiculo from 'App/Models/Vehiculo';
import VehiculoValidator from 'App/Validators/VehiculoValidator';

export default class VehiculosController {
  public async find({ request, params }: HttpContextContract) {
    if (params.id) {
      return await Vehiculo.findOrFail(params.id);
    } else {
      const data = request.all();
      if ('page' in data && 'per_page' in data) {
        const page = request.input('page', 1);
        const perPage = request.input('per_page', 20);
        return await Vehiculo.query().paginate(page, perPage);
      } else {
        return await Vehiculo.query();
      }
    }
  }

  public async create({ request }: HttpContextContract) {
    await request.validate(VehiculoValidator);
    const body = request.body();
    return await Vehiculo.create(body);
  }

  public async update({ params, request }: HttpContextContract) {
    const record = await Vehiculo.findOrFail(params.id);
    const body = request.body();
    
    record.matricula = body.matricula;
    record.modelo = body.modelo;
    record.capacidad = body.capacidad;
    record.tipo_carga = body.tipo_carga;
    record.latitud = body.latitud;
    record.longitud = body.longitud;

    return await record.save();
  }

  public async delete({ params, response }: HttpContextContract) {
    const record = await Vehiculo.findOrFail(params.id);
    await record.delete();
    response.status(204);
  }

  public async updateCoordinates({ params, request, response }: HttpContextContract) {
    const record = await Vehiculo.findOrFail(params.id);
  
    // Validar la entrada para que solo acepte longitud y latitud
    const body = request.only(['latitud', 'longitud']);
    if (!body.latitud || !body.longitud) {
      return response.badRequest({ message: 'Latitud y longitud son requeridas' });
    }
  
    // Actualizar solo las coordenadas
    record.latitud = body.latitud;
    record.longitud = body.longitud;
  
    await record.save();
    return response.ok({ message: 'Coordenadas actualizadas', vehiculo: record });
  }
  
}
