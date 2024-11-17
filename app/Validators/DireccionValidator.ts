
import { schema, rules } from '@ioc:Adonis/Core/Validator';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class DireccionValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    barrio: schema.string({ trim: true }),
      tipoCalle: schema.string({ trim: true }),
      calle: schema.string({ trim: true }),
      numero: schema.number(),
      piso: schema.string({ trim: true }),
      municipio_id: schema.number()
  });

  public messages = {};
}
