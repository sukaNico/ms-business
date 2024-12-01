import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Conductor from 'App/Models/Conductor';
import ConductorValidator from 'App/Validators/ConductorValidator';
import axios from 'axios';
import Env from '@ioc:Adonis/Core/Env';
import Notificaciones from 'App/Models/notification'

export default class ConductoresController {
  public async find({ request, params }: HttpContextContract) {
    if (params.id) {
      const conductor = await Conductor.findOrFail(params.id);
  
      try {
        // Petición al microservicio para obtener información del usuario
        const usuarioResponse = await axios.get(
          `${Env.get('MS_SECURITY')}/api/users/${conductor.usuario_id}`
        );
  
        // Agregar la información del usuario al conductor
        conductor.$extras.usuario = usuarioResponse.data;
  
        // Incluir el conductor y la información del usuario en la respuesta
        return {
          conductor,
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
        return await Conductor.query().paginate(page, perPage);
      } else {
        return await Conductor.query();
      }
    }
  }  
  
  public async create({ request }: HttpContextContract) {
    await request.validate(ConductorValidator);
    const body = request.body();
    const conductor = await Conductor.create(body);

    try {
      // Obtener la información del usuario asociado al conductor
      const usuarioResponse = await axios.get(
        `${Env.get('MS_SECURITY')}/api/users/${conductor.usuario_id}`
      );

      const usuario = usuarioResponse.data;

      // Enviar el correo al usuario asociado
      const asunto = 'Registro exitoso como conductor';
      const contenido = `Hola ${usuario.name}, bienvenido al sistema como conductor. A continuación, los datos de su registro:
      - Licencia de Conducción: ${conductor.licencia_conduccion}
      - Años de Experiencia: ${conductor.anios_experiencia}`;

      if (usuario.email) {
        await Notificaciones.enviarNotificacion(asunto, usuario.email, contenido);
      } else {
        console.warn('No se pudo enviar el correo: el usuario asociado no tiene dirección de correo.');
      }
    } catch (error) {
      console.error('Error al obtener el usuario o enviar el correo:', error.message);
      
    }

    return conductor;
  }

  public async update({ params, request }: HttpContextContract) {
    const record = await Conductor.findOrFail(params.id);
    const body = request.body();
    
    record.usuario_id = body.usuario_id;
    record.licencia_conduccion = body.licencia_conduccion;
    record.anios_experiencia = body.años_experiencia;

    return await record.save();
  }

  public async delete({ params, response }: HttpContextContract) {
    const record = await Conductor.findOrFail(params.id);
    await record.delete();
    response.status(204);
  }
}
