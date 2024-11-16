
import { schema, rules } from '@ioc:Adonis/Core/Validator';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class DepartamentoValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    nombre: schema.string({ trim: true }),
      superficie: schema.number(),
      poblacion: schema.number(),
      postalCode: schema.number()
  });

  public messages = {};
}
