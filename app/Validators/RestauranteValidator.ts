
import { schema, rules } from '@ioc:Adonis/Core/Validator';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class RestauranteValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    tipoCocina: schema.string({ trim: true }),
    servicio_id: schema.number([
      rules.exists({ table: 'servicios', column: 'id' }),
    ])
  });

  public messages = {};
}
