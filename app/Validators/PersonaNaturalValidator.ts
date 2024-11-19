
import { schema, rules } from '@ioc:Adonis/Core/Validator';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class PersonaNaturalValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    nacionalidad: schema.string({ trim: true }, [
      rules.maxLength(50),
    ]),
    genero: schema.string({ trim: true }, [
      rules.maxLength(20), // Evitar cadenas demasiado largas
    ]),
    cliente_id: schema.number([
      rules.exists({ table: 'clientes', column: 'id' }),
    ]),
    usuario_id: schema.string(),
  });

  public messages = {
    'nacionalidad.required': 'La nacionalidad es obligatoria.',
    'nacionalidad.maxLength': 'La nacionalidad no puede exceder los 50 caracteres.',
    'genero.required': 'El género es obligatorio.',
    'genero.maxLength': 'El género no puede exceder los 20 caracteres.',
    'cliente_id.required': 'El ID del cliente es obligatorio.',
    'cliente_id.exists': 'El cliente especificado no existe.',
    'usuario_id.required': 'El ID del usuario es obligatorio.',
    'usuario_id.exists': 'El usuario especificado no existe.',
    'usuario_id.unique': 'El usuario ya está asociado con otra persona natural.',
  };

  /**
   * Validación personalizada para el género
   */
  public validateGenero(genero: string) {
    const generosPermitidos = ['masculino', 'femenino', 'otro'];
    if (!generosPermitidos.includes(genero)) {
      throw new Error('El género debe ser "masculino", "femenino" o "otro".');
    }
  }
}

