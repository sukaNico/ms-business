import { schema, rules } from '@ioc:Adonis/Core/Validator';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class ConductorValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    usuario_id: schema.number([
      rules.exists({ table: 'usuarios', column: 'id' }), // Verifica que el usuario exista en la base de datos
    ]),
    vehiculo_id: schema.number.optional([
      rules.exists({ table: 'vehiculos', column: 'id' }), // Verifica si el vehículo es válido (opcional)
    ]),
    licencia_conduccion: schema.string({ trim: true }, [
      rules.minLength(5), // Longitud mínima para la licencia
      rules.maxLength(20), // Longitud máxima para la licencia
    ]),
    anios_experiencia: schema.number([
      rules.unsigned(), // Asegura que el número no sea negativo
      rules.range(0, 50), // Limita los años de experiencia entre 0 y 50
    ]),
  });

  public messages = {
    'usuario_id.required': 'El campo usuario_id es obligatorio.',
    'usuario_id.exists': 'El usuario especificado no existe en el sistema.',
    'vehiculo_id.exists': 'El vehículo especificado no existe en el sistema.',
    'licencia_conduccion.required': 'El campo licencia_conduccion es obligatorio.',
    'licencia_conduccion.minLength': 'La licencia debe tener al menos 5 caracteres.',
    'licencia_conduccion.maxLength': 'La licencia no puede tener más de 20 caracteres.',
    'años_experiencia.required': 'El campo años_experiencia es obligatorio.',
    'anios_experiencia.unsigned': 'Los años de experiencia no pueden ser negativos.',
    'anios_experiencia.range': 'Los años de experiencia deben estar entre 0 y 50.',
  };
}
