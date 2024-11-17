
import { schema, rules } from '@ioc:Adonis/Core/Validator';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class VehiculoValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    matricula: schema.string({ trim: true }),
      modelo: schema.string({ trim: true }),
      capacidad: schema.string(),
      tipo_carga: schema.string({ trim: true }),
      longitud: schema.number(),
      latitud: schema.number(),
      
  });

  public messages = {};
}
