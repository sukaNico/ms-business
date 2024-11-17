
import { schema, rules } from '@ioc:Adonis/Core/Validator';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class DireccionRutaValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    direccion_id: schema.number([
      rules.exists({ table: 'direcciones', column: 'id' }), // Validar que la dirección exista
    ]),
    ruta_id: schema.number([
      rules.exists({ table: 'rutas', column: 'id' }), // Validar que la ruta exista
    ]),
    lote_id: schema.number([
      rules.exists({ table: 'lotes', column: 'id' }), // Validar que el lote exista
    ]),
    fechaEntrega: schema.string([
      rules.regex(/^\d{4}-\d{2}-\d{2}$/), // Formato de fecha YYYY-MM-DD
    ]),
    distancia: schema.number([
      rules.unsigned(), // La distancia debe ser un número positivo
    ]),
    estado: schema.string({ trim: true }, [
      rules.maxLength(50), // Limitar la longitud del estado a 50 caracteres
    ]),
    ordenDePaso: schema.number([
      rules.unsigned(), // El orden de paso debe ser un número positivo
    ]),
  });

  public messages = {
    'direccion_id.required': 'El ID de la dirección es obligatorio.',
    'direccion_id.exists': 'La dirección especificada no existe.',
    'ruta_id.required': 'El ID de la ruta es obligatorio.',
    'ruta_id.exists': 'La ruta especificada no existe.',
    'lote_id.required': 'El ID del lote es obligatorio.',
    'lote_id.exists': 'El lote especificado no existe.',
    'fechaEntrega.required': 'La fecha de entrega es obligatoria.',
    'fechaEntrega.regex': 'La fecha de entrega debe tener el formato YYYY-MM-DD.',
    'distancia.required': 'La distancia es obligatoria.',
    'distancia.unsigned': 'La distancia debe ser un número positivo.',
    'estado.required': 'El estado es obligatorio.',
    'estado.maxLength': 'El estado no puede exceder los 50 caracteres.',
    'ordenDePaso.required': 'El orden de paso es obligatorio.',
    'ordenDePaso.unsigned': 'El orden de paso debe ser un número positivo.',
  };
}
