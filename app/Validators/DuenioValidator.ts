import { schema, rules } from '@ioc:Adonis/Core/Validator';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class DuenioValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    conductor_id: schema.number([
      rules.exists({ table: 'conductores', column: 'id' }), // Verifica que el conductor asociado exista
    ]),
    usuario_id: schema.number([
      rules.exists({ table: 'usuarios', column: 'id' }), // Verifica que el usuario asociado exista
    ]),
  });

  public messages = {
    'conductor_id.required': 'El campo conductor_id es obligatorio.',
    'conductor_id.exists': 'El conductor especificado no existe en el sistema.',
    'usuario_id.required': 'El campo usuario_id es obligatorio.',
    'usuario_id.exists': 'El usuario especificado no existe en el sistema.',
  };
}
