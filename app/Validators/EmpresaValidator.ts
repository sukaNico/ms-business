
import { schema, rules } from '@ioc:Adonis/Core/Validator';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class EmpresaValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    nombre: schema.string({ trim: true }),
      nit: schema.number(),
      persona_natural_id: schema.number(),
      cliente_id: schema.number()
  });

  public messages = {};
}
