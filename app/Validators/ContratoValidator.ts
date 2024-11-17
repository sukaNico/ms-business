
import { schema, rules } from '@ioc:Adonis/Core/Validator';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ContratoValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    cliente_id: schema.number(),
      valor: schema.number(),
      fecha_inico: schema.date(),
      fecha_fin: schema.date()
  });

  public messages = {};
}
