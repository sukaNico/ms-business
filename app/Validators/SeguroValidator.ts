
import { schema, rules } from '@ioc:Adonis/Core/Validator';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class SeguroValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    vehiculo_id: schema.number(),
      tipo: schema.string({ trim: true }),
      aseguradora: schema.string({ trim: true }),
      fecha_inicio: schema.date(),
      fecha_fin: schema.date()
  });

  public messages = {};
}
