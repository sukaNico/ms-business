
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Administrador from 'App/Models/Administrador';
import AdministradorValidator from 'App/Validators/AdministradorValidator';
import axios from 'axios';
import Env from '@ioc:Adonis/Core/Env';

export default class AdministradoresController {
  public async find({ request, params }: HttpContextContract) {
    if (params.id) {
      const administrador = await Administrador.findOrFail(params.id);
      try {
        const usuarioResponse = await axios.get(
          `${Env.get('MS_SECURITY')}/api/users/${administrador.usuario_id}`
        );
  
        administrador.$extras.usuario = usuarioResponse.data;

        return {
          administrador,
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
        return await Administrador.query().paginate(page, perPage);
      } else {
        return await Administrador.query();
      }
    }
  }

  public async create({ request }: HttpContextContract) {
    await request.validate(AdministradorValidator);
    const body = request.body();
    return await Administrador.create(body);
  }

  public async update({ params, request }: HttpContextContract) {
    const record = await Administrador.findOrFail(params.id);
    const body = request.body();
    
    record.nivelAcceso = body.nivelAcceso;
    record.usuario_id = body.usuario_id;

    return await record.save();
  }

  public async delete({ params, response }: HttpContextContract) {
    const record = await Administrador.findOrFail(params.id);
    await record.delete();
    response.status(204);
  }

  //V
}
