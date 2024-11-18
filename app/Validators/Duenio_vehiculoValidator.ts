import { schema, rules } from '@ioc:Adonis/Core/Validator';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class DuenioVehiculoValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    vehiculo_id: schema.number([
      rules.exists({ table: 'vehiculos', column: 'id' }), // Verifica que el vehículo asociado exista
    ]),
    duenio_id: schema.number([
      rules.exists({ table: 'duenios', column: 'id' }), // Verifica que el dueño asociado exista
    ]),
  });

  public messages = {
    'vehiculo_id.required': 'El campo vehiculo_id es obligatorio.',
    'vehiculo_id.exists': 'El vehículo especificado no existe en el sistema.',
    'duenio_id.required': 'El campo duenio_id es obligatorio.',
    'duenio_id.exists': 'El dueño especificado no existe en el sistema.',
  };
}
