import { schema, rules } from '@ioc:Adonis/Core/Validator';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class VehiculoConductorValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    vehiculo_id: schema.number([
      rules.exists({ table: 'vehiculos', column: 'id' }), // Verifica que el vehículo asociado exista
    ]),
    conductor_id: schema.number([
      rules.exists({ table: 'conductores', column: 'id' }), // Verifica que el conductor asociado exista
    ]),
  });

  public messages = {
    'vehiculo_id.required': 'El campo vehiculo_id es obligatorio.',
    'vehiculo_id.exists': 'El vehículo especificado no existe en el sistema.',
    'conductor_id.required': 'El campo conductor_id es obligatorio.',
    'conductor_id.exists': 'El conductor especificado no existe en el sistema.',
  };
}
