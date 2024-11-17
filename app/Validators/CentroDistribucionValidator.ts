
import { schema, rules } from '@ioc:Adonis/Core/Validator';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class CentroDistribucionValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    nombre: schema.string({ trim: true }, [
      rules.maxLength(100), // Limitar la longitud del nombre a 100 caracteres
    ]),
    capacidad: schema.number([
      rules.unsigned(), // Solo números positivos
      rules.range(1, 10000), // Capacidad entre 1 y 10,000
    ]),
    telefono: schema.string([
      rules.mobile(), // Validar formato de número de teléfono
      rules.maxLength(15), // Limitar la longitud a 15 caracteres
    ]),
    hora_apertura: schema.string([
      rules.regex(/^([0-9]{2}):([0-9]{2})$/), // Validar formato de hora (HH:MM)
    ]),
    hora_cierre: schema.string([
      rules.regex(/^([0-9]{2}):([0-9]{2})$/), // Validar formato de hora (HH:MM)
    ]),
    direccion_id: schema.number([
      rules.exists({ table: 'direcciones', column: 'id' }), // Validar existencia de la dirección
    ]),
  });

  public messages = {
    'nombre.required': 'El nombre del centro de distribución es obligatorio.',
    'nombre.maxLength': 'El nombre no puede exceder los 100 caracteres.',
    'capacidad.required': 'La capacidad es obligatoria.',
    'capacidad.unsigned': 'La capacidad debe ser un número positivo.',
    'capacidad.range': 'La capacidad debe estar entre 1 y 10,000.',
    'telefono.required': 'El número de teléfono es obligatorio.',
    'telefono.mobile': 'El número de teléfono no tiene un formato válido.',
    'telefono.maxLength': 'El número de teléfono no puede exceder los 15 caracteres.',
    'hora_apertura.required': 'La hora de apertura es obligatoria.',
    'hora_apertura.regex': 'La hora de apertura debe tener el formato HH:MM.',
    'hora_cierre.required': 'La hora de cierre es obligatoria.',
    'hora_cierre.regex': 'La hora de cierre debe tener el formato HH:MM.',
    'direccion_id.required': 'El ID de la dirección es obligatorio.',
    'direccion_id.exists': 'La dirección especificada no existe.',
  };
}

