
import { schema, rules } from '@ioc:Adonis/Core/Validator';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class RutaValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    contrato_id: schema.number(),
      vehiculo_id: schema.number(),
      lugar_inicio: schema.string({ trim: true }),
      lugar_fin: schema.string({ trim: true }),
      distancia: schema.number(),
      fecha_inicio: schema.date(),
      fecha_fin: schema.date()
  });

  public messages = {};
}
