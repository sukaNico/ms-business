
import { schema, rules } from '@ioc:Adonis/Core/Validator';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class TurnoValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    conductor_id: schema.number(),
      hora_inico: schema.date(),
      hora_fin: schema.date(),
      ubicacion: schema.string({ trim: true })
  });

  public messages = {};
}
