
import { schema, rules } from '@ioc:Adonis/Core/Validator';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class FacturaValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    fecha: schema.date(),
      total: schema.number(),
      estado: schema.string({ trim: true }),
      cuota_id: schema.number(),
      gasto_id: schema.number()
  });

  public messages = {};
}
