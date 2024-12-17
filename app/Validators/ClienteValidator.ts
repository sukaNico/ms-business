
import { schema, rules } from '@ioc:Adonis/Core/Validator';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class ClienteValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({

    preferencias: schema.string({ trim: true }, [
      rules.maxLength(100), // Limitar la longitud a 100 caracteres
    ]),
  });

  public messages = {
    'fechaRegistro.required': 'La fecha de registro es obligatoria.',
    'fechaRegistro.date.format': 'La fecha de registro debe tener el formato yyyy-MM-dd.',
    'fechaRegistro.beforeOrEqual': 'La fecha de registro no puede ser una fecha futura.',
    'preferencias.required': 'Las preferencias son obligatorias.',
    'preferencias.maxLength': 'Las preferencias no pueden exceder los 100 caracteres.',
  };
}

