
import { schema, rules } from '@ioc:Adonis/Core/Validator';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class EmpresaValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    nombre: schema.string({ trim: true }, [
      rules.maxLength(100),
      rules.unique({ table: 'empresas', column: 'nombre' }),
    ]),
    nit: schema.number([
      rules.unsigned(),
      rules.unique({ table: 'empresas', column: 'nit' }),
    ]),
    persona_natural_id: schema.number([
      rules.exists({ table: 'personas_naturales', column: 'id' }),
    ]),
    cliente_id: schema.number([
      rules.exists({ table: 'clientes', column: 'id' }),
    ]),
  });

  public messages = {
    'nombre.required': 'El nombre de la empresa es obligatorio.',
    'nombre.maxLength': 'El nombre de la empresa no puede exceder los 100 caracteres.',
    'nombre.unique': 'El nombre de la empresa ya está registrado.',
    'nit.required': 'El NIT de la empresa es obligatorio.',
    'nit.number': 'El NIT debe ser un número.',
    'nit.unique': 'El NIT ya está registrado.',
    'persona_natural_id.required': 'El ID de la persona natural es obligatorio.',
    'persona_natural_id.exists': 'La persona natural especificada no existe.',
    'cliente_id.required': 'El ID del cliente es obligatorio.',
    'cliente_id.exists': 'El cliente especificado no existe.',
  };
}

