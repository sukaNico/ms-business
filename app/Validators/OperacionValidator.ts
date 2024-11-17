
import { schema } from '@ioc:Adonis/Core/Validator';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class OperacionValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    fechaInicio: schema.string(),
      fechaFinalizacion: schema.string(),
      municipio_id: schema.number(),
      vehiculo_id: schema.number()
  });

  public messages = {};
}
