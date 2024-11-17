
import { schema, rules } from '@ioc:Adonis/Core/Validator';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class HotelValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    númeroHabitacion: schema.string({ trim: true }),
      serviciosIncluidos: schema.string({ trim: true }),
      servicio_id: schema.number()
  });

  public messages = {};
}
