
import { schema, rules } from '@ioc:Adonis/Core/Validator';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ServicioValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    nombre: schema.string({ trim: true }),
    direccion: schema.string({ trim: true }),
    descripcion: schema.string({ trim: true }),
    fecha: schema.string([
      rules.regex(/^\d{4}-\d{2}-\d{2}$/),
    ]),
    administrador_id: schema.number([
      rules.exists({ table: 'administradores', column: 'id' })  // Reglas para verificar si el administrador_id existe
    ])
  });
  
  public messages = {};
}
