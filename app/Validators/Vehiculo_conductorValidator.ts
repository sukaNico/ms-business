
import { schema, rules } from '@ioc:Adonis/Core/Validator';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class Vehiculo_conductorValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    vehiculo_id: schema.number(),
      conductor_id: schema.number()
  });

  public messages = {};
}
