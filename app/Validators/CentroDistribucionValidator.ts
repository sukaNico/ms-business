
import { schema, rules } from '@ioc:Adonis/Core/Validator';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CentroDistribucionValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    nombre: schema.string({ trim: true }),
      capacidad: schema.number(),
      telefono: schema.number(),
      hora_apertura: schema.string(),
      hora_cierre: schema.string(),
      direccion_id: schema.number()
  });

  public messages = {};
}
