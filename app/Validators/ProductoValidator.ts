
import { schema, rules } from '@ioc:Adonis/Core/Validator';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class ProductoValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    nombre: schema.string({ trim: true }, [
      rules.maxLength(50),
      rules.unique({ table: 'productos', column: 'nombre' }),
    ]),
    cantidad: schema.number([
      rules.unsigned(),
    ]),
    peso: schema.number([
      rules.unsigned(),
    ]),
    lote_id: schema.number([
      rules.exists({ table: 'lotes', column: 'id' }),
    ]),
    cliente_id: schema.number([
      rules.exists({ table: 'clientes', column: 'id' }),
    ]),
  });

  public messages = {
    'nombre.required': 'El nombre del producto es obligatorio.',
    'nombre.maxLength': 'El nombre no puede exceder los 100 caracteres.',
    'nombre.unique': 'El nombre del producto ya existe. Elija otro.',
    'cantidad.required': 'La cantidad del producto es obligatoria.',
    'cantidad.number': 'La cantidad debe ser un número.',
    'cantidad.unsigned': 'La cantidad no puede ser negativa.',
    'peso.required': 'El peso del producto es obligatorio.',
    'peso.number': 'El peso debe ser un número.',
    'peso.unsigned': 'El peso no puede ser negativo.',
    'lote_id.required': 'El ID del lote es obligatorio.',
    'lote_id.exists': 'El lote especificado no existe.',
    'cliente_id.required': 'El ID del cliente es obligatorio.',
    'cliente_id.exists': 'El cliente especificado no existe.',
  };
}

