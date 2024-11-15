
import { schema, rules } from '@ioc:Adonis/Core/Validator';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ProductoValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    nombre: schema.string({ trim: true }),
      cantidad: schema.string(),
      peso: schema.string(),
      lote_id: schema.number(),
      cliente_id: schema.number()
  });

  public messages = {};
}
