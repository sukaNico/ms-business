
import { schema, rules } from '@ioc:Adonis/Core/Validator';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class HotelValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    númeroHabitacion: schema.string({ trim: true }, [rules.minLength(1), rules.maxLength(10)]),
    serviciosIncluidos: schema.string({ trim: true }, [rules.minLength(5)]),
    servicio_id: schema.number([rules.exists({ table: 'servicios', column: 'id' })])
  });

  public messages = {};
}
