
import { schema, rules } from '@ioc:Adonis/Core/Validator';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CuotaValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    contrato_id: schema.number(),
      monto: schema.number(),
      tasa_interes: schema.number(),
      fecha_generacion: schema.date(),
      fecha_vencimiento: schema.date()
  });

  public messages = {};
}
