
import { schema, rules } from '@ioc:Adonis/Core/Validator';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CategoriaProductoValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    categoria_id: schema.number(),
      producto_id: schema.number()
  });

  public messages = {};
}
