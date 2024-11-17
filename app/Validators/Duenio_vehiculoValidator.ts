
import { schema, rules } from '@ioc:Adonis/Core/Validator';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class Duenio_vehiculoValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    vehiculo_id: schema.number(),
      duenio_id: schema.number(),
      fecha_compra: schema.date()
  });

  public messages = {};
}
