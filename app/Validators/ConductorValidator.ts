
import { schema, rules } from '@ioc:Adonis/Core/Validator';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ConductorValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    usuario_id: schema.number(),
      licencia_conduccion: schema.string({ trim: true }),
      años_experiencia: schema.number()
  });

  public messages = {};
}
