
import { schema, rules } from '@ioc:Adonis/Core/Validator';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ServicioValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    nombre: schema.string({ trim: true }),
      direccion: schema.string({ trim: true }),
      descripcion: schema.string({ trim: true }),
      fecha: schema.string()
  });

  public messages = {};
}
