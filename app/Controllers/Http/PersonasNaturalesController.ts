
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import PersonaNatural from 'App/Models/PersonaNatural';
import PersonaNaturalValidator from 'App/Validators/PersonaNaturalValidator';
import axios from 'axios';
import Env from '@ioc:Adonis/Core/Env';

export default class PersonasNaturalesController {
  public async find({ request, params }: HttpContextContract) {
    if (params.id) {
      const persona_natural= await PersonaNatural.findOrFail(params.id);
      try {
        const usuarioResponse = await axios.get(
          `${Env.get('MS_SECURITY')}/api/users/${persona_natural.usuario_id}`
        );
  
        persona_natural.$extras.usuario = usuarioResponse.data;

        return {
          persona_natural,
          usuario: usuarioResponse.data,
        };
      } catch (error) {
        console.error('Error al obtener el usuario:', error.message);
        throw new Error('No se pudo obtener la información del usuario');
      }
    } else {
      const data = request.all();
      if ('page' in data && 'per_page' in data) {
        const page = request.input('page', 1);
        const perPage = request.input('per_page', 20);
        return await PersonaNatural.query().paginate(page, perPage);
      } else {
        return await PersonaNatural.query();
      }
    }
  }

  public async create({ request }: HttpContextContract) {
    await request.validate(PersonaNaturalValidator);
    const body = request.body();
    return await PersonaNatural.create(body);
  }

  public async update({ params, request }: HttpContextContract) {
    const record = await PersonaNatural.findOrFail(params.id);
    const body = request.body();
    
    record.nacionalidad = body.nacionalidad;
    record.genero = body.genero;
    record.cliente_id = body.cliente_id;
    record.usuario_id = body.usuario_id;

    return await record.save();
  }

  public async delete({ params, response }: HttpContextContract) {
    const record = await PersonaNatural.findOrFail(params.id);
    await record.delete();
    response.status(204);
  }
}
