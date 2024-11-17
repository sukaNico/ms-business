
import { schema, rules } from '@ioc:Adonis/Core/Validator';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class DireccionRutaValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    direccion_id: schema.number(),
      ruta_id: schema.number(),
      lote_id: schema.number(),
      fechaEntrega: schema.string(),
      distancia: schema.number(),
      estado: schema.string({ trim: true }),
      ordenDePaso: schema.number()
  });

  public messages = {};
}
