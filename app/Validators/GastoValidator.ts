
import { schema, rules } from '@ioc:Adonis/Core/Validator';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class GastoValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    costo: schema.number(),
      servicio_id: schema.number(),
      conductor_id: schema.number(),
      duenios_id: schema.number(),
      factura_id: schema.number()
  });

  public messages = {};
}
