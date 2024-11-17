
import { schema, rules } from '@ioc:Adonis/Core/Validator';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class GastoValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    costo: schema.number(),
    servicio_id: schema.number([
      rules.exists({ table: 'servicios', column: 'id' })
    ]),
    conductor_id: schema.number([
      rules.exists({ table: 'conductores', column: 'id' })
    ]),
    duenios_id: schema.number([
      rules.exists({ table: 'duenios', column: 'id' })
    ]),
    factura_id: schema.number([
      rules.exists({ table: 'facturas', column: 'id' })
    ])
  });

  public messages = {};
}
