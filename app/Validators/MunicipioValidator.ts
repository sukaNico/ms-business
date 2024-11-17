
import { schema, rules } from '@ioc:Adonis/Core/Validator';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class MunicipioValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    nombre: schema.string({ trim: true }, [rules.minLength(3),rules.maxLength(100)]),
    departamento_id: schema.number([rules.exists({ table: 'departamentos', column: 'id' })])
  });

  public messages = {};
}
