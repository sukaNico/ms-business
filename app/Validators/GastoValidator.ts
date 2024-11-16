
import { schema, rules } from '@ioc:Adonis/Core/Validator';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class GastoValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    servicio_id: schema.number(),
      conductor_id: schema.number(),
      monto: schema.number(),
      descripcion: schema.string({ trim: true }),
      estado: schema.string({ trim: true }),
      dueño_id: schema.number()
  });

  public messages = {};
}
