
import { schema } from '@ioc:Adonis/Core/Validator';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AdministradorValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
      nivelAcceso: schema.string({ trim: true }),
      usuario_id: schema.string(),
      servicio_id: schema.number()
  });

  public messages = {};
}
