
import { schema, rules } from '@ioc:Adonis/Core/Validator';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ClienteValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    fechaRegistro: schema.string(),
      preferencias: schema.string({ trim: true })
  });

  public messages = {};
}
