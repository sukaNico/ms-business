
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Administrador from 'App/Models/Administrador';
import AdministradorValidator from 'App/Validators/AdministradorValidator';
import axios from 'axios';
import Env from '@ioc:Adonis/Core/Env';
import { log } from 'node:console';

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

  public async create({ request, response }: HttpContextContract) {
    // Validar el payload con el validador definido
    await request.validate(AdministradorValidator);
    const body = request.body();

    try {
      // Verificar si el usuario existe en el microservicio ms_security
      const usuarioResponse = await axios.get(
        `${Env.get('MS_SECURITY')}/api/users/${body.usuario_id}`
      );

      // Si el usuario no existe, lanzar un error
      if (!usuarioResponse.data || usuarioResponse.status !== 200) {
        return response.status(404).send({
          message: 'El usuario proporcionado no existe.',
        });
      }

      // Crear el administrador si el usuario es válido
      const administrador = await Administrador.create(body);
      return response.status(201).send(administrador);

    } catch (error) {
      // Manejar errores de conexión o del API externo
      console.error('Error al verificar el usuario:', error.message);
      return response.status(500).send({
        message: 'No se pudo verificar el usuario. Inténtalo de nuevo más tarde.',
      });
    }
  }

  public async update({ params, request }: HttpContextContract) {
    const record = await Administrador.findOrFail(params.id);
    const body = request.body();

    record.nivel_acceso = body.nivel_acceso;
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
