
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Turno from 'App/Models/Turno';
import TurnoValidator from 'App/Validators/TurnoValidator';
import Notificaciones from 'App/Models/notification'
import Database from '@ioc:Adonis/Lucid/Database';

export default class TurnosController {
  public async find({ request, params }: HttpContextContract) {
    if (params.id) {
      return await Turno.findOrFail(params.id);
    } else {
      const data = request.all();
      if ('page' in data && 'per_page' in data) {
        const page = request.input('page', 1);
        const perPage = request.input('per_page', 20);
        return await Turno.query().paginate(page, perPage);
      } else {
        return await Turno.query();
      }
    }
  }

  public async create({ request }: HttpContextContract) {
    // Validar los datos
    await request.validate(TurnoValidator);
    const body = request.body();
  
    // Crear el turno
    const turno = await Turno.create(body);
  
    // Obtener el conductor relacionado
    const conductor = await Database
      .from('conductores') 
      .where('id', body.conductor_id)
      .firstOrFail();
  
    // Obtener el correo del usuario relacionado con el conductor
    const usuario = await Database
      .from('usuarios') 
      .where('id', conductor.usuario_id)
      .firstOrFail();
  
    const correoConductor = usuario.email;
    console.log(correoConductor);
    
  
    // Enviar el correo al conductor
    const asunto = 'Nuevo turno asignado';
    const contenido = `Se le ha asignado un nuevo turno con los siguientes detalles:
    - Hora inicio: ${turno.hora_inico}
    - Hora fin: ${turno.hora_fin}
    - Ubicación: ${turno.ubicacion}`;
  
    await Notificaciones.enviarNotificacion(asunto, correoConductor, contenido);
  
    return turno;
  }

  public async update({ params, request }: HttpContextContract) {
    const record = await Turno.findOrFail(params.id);
    const body = request.body();
    
    record.conductor_id = body.conductor_id;
    record.hora_inico = body.hora_inico;
    record.hora_fin = body.hora_fin;
    record.ubicacion = body.ubicacion;

    return await record.save();
  }

  public async delete({ params, response }: HttpContextContract) {
    const record = await Turno.findOrFail(params.id);
    await record.delete();
    response.status(204);
  }
}
