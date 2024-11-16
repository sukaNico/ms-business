
import { schema, rules } from '@ioc:Adonis/Core/Validator';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class LoteValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    tipoDeCarga: schema.string({ trim: true }),
      peso: schema.number(),
      ruta_id: schema.number()
  });

  public messages = {};
}
