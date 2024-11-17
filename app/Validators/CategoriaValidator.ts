
import { schema, rules } from '@ioc:Adonis/Core/Validator';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CategoriaValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    nombre: schema.string({ trim: true }, [
      rules.maxLength(50),
      rules.unique({ table: 'categorias', column: 'nombre' }),
    ]),
    descripcion: schema.string.optional({ trim: true }, [
      rules.maxLength(255),
    ]),
  });

  public messages = {
    'nombre.required': 'El nombre de la categoría es obligatorio.',
    'nombre.maxLength': 'El nombre de la categoría no puede exceder los 50 caracteres.',
    'nombre.unique': 'El nombre de la categoría ya existe. Elija otro.',
    'descripcion.maxLength': 'La descripción no puede exceder los 255 caracteres.',
  };
}
