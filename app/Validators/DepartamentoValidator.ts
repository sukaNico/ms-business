
import { schema, rules } from '@ioc:Adonis/Core/Validator';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class DepartamentoValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    nombre: schema.string({ trim: true }, [
      rules.maxLength(50), // Máximo 50 caracteres
      rules.minLength(3),  // Mínimo 3 caracteres
      rules.regex(/^[a-zA-Z\s]+$/), // Solo letras y espacios
    ]),
    superficie: schema.number(),
    poblacion: schema.number([
      rules.range(1, 55000000), // maximo poblacion colombiana
    ]),
    postalCode: schema.number([
      rules.range(1000, 99999), // Códigos postales de 4-5 dígitos
    ]),
  });

  public messages = {};
}
