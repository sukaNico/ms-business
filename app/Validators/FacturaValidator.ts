
import { schema, rules } from '@ioc:Adonis/Core/Validator';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class FacturaValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    fecha: schema.date(),
    total: schema.number(),
    estado: schema.string({ trim: true }, [rules.maxLength(50), rules.minLength(3)]),
    cuota_id: schema.number([rules.exists({ table: 'cuotas', column: 'id' })]),
    gasto_id: schema.number([rules.exists({ table: 'gastos', column: 'id' })])
  });

  public messages = {};
}
