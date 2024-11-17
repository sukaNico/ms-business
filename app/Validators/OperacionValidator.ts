
import { schema,rules } from '@ioc:Adonis/Core/Validator';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class OperacionValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    fechaInicio: schema.string([
      rules.regex(/^\d{4}-\d{2}-\d{2}$/), //YYYY-MM-DD
    ]),
    fechaFinalizacion: schema.string([rules.regex(/^\d{4}-\d{2}-\d{2}$/),]),
    municipio_id: schema.number([rules.exists({ table: 'municipios', column: 'id' })]),
    vehiculo_id: schema.number([rules.exists({ table: 'vehiculos', column: 'id' })])
  });
  public messages = {}; 
}
