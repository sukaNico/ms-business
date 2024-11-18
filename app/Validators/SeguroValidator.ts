import { schema, rules } from '@ioc:Adonis/Core/Validator';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class SeguroValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    vehiculo_id: schema.number([
      rules.exists({ table: 'vehiculos', column: 'id' }), // Verifica que el vehículo asociado exista
    ]),
    tipo: schema.string({ trim: true }, [
      rules.maxLength(255), // Limita el tipo a 255 caracteres
    ]),
    aseguradora: schema.string({ trim: true }, [
      rules.maxLength(255), // Limita el nombre de la aseguradora a 255 caracteres
    ]),
    fecha_inicio: schema.date({}, [
      rules.beforeField('fecha_fin'), // Asegura que la fecha de inicio sea antes de la fecha de fin
    ]),
    fecha_fin: schema.date({}, [
      rules.afterField('fecha_inicio'), // Asegura que la fecha de fin sea después de la fecha de inicio
    ]),
  });

  public messages = {
    'vehiculo_id.required': 'El campo vehiculo_id es obligatorio.',
    'vehiculo_id.exists': 'El vehículo especificado no existe en el sistema.',
    'tipo.required': 'El campo tipo es obligatorio.',
    'tipo.maxLength': 'El tipo no puede exceder los 255 caracteres.',
    'aseguradora.required': 'El campo aseguradora es obligatorio.',
    'aseguradora.maxLength': 'El nombre de la aseguradora no puede exceder los 255 caracteres.',
    'fecha_inicio.required': 'La fecha de inicio es obligatoria.',
    'fecha_inicio.beforeField': 'La fecha de inicio debe ser anterior a la fecha de fin.',
    'fecha_fin.required': 'La fecha de fin es obligatoria.',
    'fecha_fin.afterField': 'La fecha de fin debe ser posterior a la fecha de inicio.',
  };
}
