
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Cliente from 'App/Models/Cliente';
import PersonaNatural from 'App/Models/PersonaNatural';
import ClienteValidator from 'App/Validators/ClienteValidator';

export default class ClientesController {
  public async find({ request, params }: HttpContextContract) {
    if (params.id) {
      return await Cliente.findOrFail(params.id);
    } else {
      const data = request.all();
      if ('page' in data && 'per_page' in data) {
        const page = request.input('page', 1);
        const perPage = request.input('per_page', 20);
        return await Cliente.query().paginate(page, perPage);
      } else {
        return await Cliente.query();
      }
    }
  }

  public async create({ request }: HttpContextContract) {
    // Validar los datos del cliente
    await request.validate(ClienteValidator);
    const body = request.body();

    // Crear el cliente
    const cliente = await Cliente.create(body);

    const personaNaturalData = request.input('personanatural'); // Extrae solo los datos de personaNatural

    // Verificar si hay datos para persona natural
    if (personaNaturalData) {
    
      await cliente.related('personanatural').create(personaNaturalData);
    }

    return cliente;
  }

  public async update({ params, request }: HttpContextContract) {
    const record = await Cliente.findOrFail(params.id);
    const body = request.body();
    
    record.preferencias = body.preferencias;

    return await record.save();
  }

  public async delete({ params, response }: HttpContextContract) {
    const record = await Cliente.findOrFail(params.id);
    await record.delete();
    response.status(204);
  }
}
