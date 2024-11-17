
import { schema, rules } from '@ioc:Adonis/Core/Validator';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class PersonaNaturalValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    nacionalidad: schema.string({ trim: true }),
      genero: schema.string({ trim: true }),
      cliente_id: schema.number(),
      usuario_id: schema.number()
  });

  public messages = {};
}
