
import { schema, rules } from '@ioc:Adonis/Core/Validator';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class DireccionValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    barrio: schema.string({ trim: true }, [
      rules.maxLength(100), // Limitar la longitud del barrio a 100 caracteres
    ]),
    tipoCalle: schema.string({ trim: true }, [
      rules.maxLength(50), // Limitar la longitud del tipo de calle a 50 caracteres
    ]),
    calle: schema.string({ trim: true }, [
      rules.maxLength(100), // Limitar la longitud de la calle a 100 caracteres
    ]),
    numero: schema.number([
      rules.unsigned(), // Solo números positivos
    ]),
    piso: schema.string({ trim: true }, [
      rules.maxLength(10), // Limitar la longitud del piso a 10 caracteres
    ]),
    municipio_id: schema.number([
      rules.exists({ table: 'municipios', column: 'id' }), // Validar existencia de municipio
    ]),
  });

  public messages = {
    'barrio.required': 'El barrio es obligatorio.',
    'barrio.maxLength': 'El barrio no puede exceder los 100 caracteres.',
    'tipoCalle.required': 'El tipo de calle es obligatorio.',
    'tipoCalle.maxLength': 'El tipo de calle no puede exceder los 50 caracteres.',
    'calle.required': 'La calle es obligatoria.',
    'calle.maxLength': 'La calle no puede exceder los 100 caracteres.',
    'numero.required': 'El número es obligatorio.',
    'numero.unsigned': 'El número debe ser un valor positivo.',
    'piso.required': 'El piso es obligatorio.',
    'piso.maxLength': 'El piso no puede exceder los 10 caracteres.',
    'municipio_id.required': 'El ID del municipio es obligatorio.',
    'municipio_id.exists': 'El municipio especificado no existe.',
  };
}

