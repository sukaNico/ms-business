
import { schema } from '@ioc:Adonis/Core/Validator';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AdministradorValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
      nivel_acceso: schema.string([]),
      usuario_id: schema.string([])
  });

  public messages = {};
}
