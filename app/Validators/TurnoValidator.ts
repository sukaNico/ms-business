import { schema, rules } from '@ioc:Adonis/Core/Validator';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class TurnoValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    conductor_id: schema.number([
      rules.exists({ table: 'conductores', column: 'id' }), // Verifica que el conductor asociado exista
    ]),
    hora_inico: schema.date(),
    hora_fin: schema.date(),
    ubicacion: schema.string({ trim: true }, [
      rules.maxLength(255), // Limita la longitud de la ubicación
    ]),
  });

  public messages = {
    'conductor_id.required': 'El campo conductor_id es obligatorio.',
    'conductor_id.exists': 'El conductor especificado no existe.',
    'hora_inico.required': 'El campo hora_inico es obligatorio.',
    'hora_inico.date': 'La hora de inicio debe ser una fecha válida.',
    'hora_fin.required': 'El campo hora_fin es obligatorio.',
    'hora_fin.date': 'La hora de fin debe ser una fecha válida.',
    'ubicacion.required': 'El campo ubicacion es obligatorio.',
    'ubicacion.maxLength': 'La ubicación no puede exceder los 255 caracteres.',
  };
}
