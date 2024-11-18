import { schema, rules } from '@ioc:Adonis/Core/Validator';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class VehiculoValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    matricula: schema.string({ trim: true }, [
      rules.unique({ table: 'vehiculos', column: 'matricula' }), // Asegura que la matrícula sea única
      rules.maxLength(20), // Limita la longitud de la matrícula
    ]),
    modelo: schema.string({ trim: true }, [
      rules.maxLength(255), // Limita el nombre del modelo a 255 caracteres
    ]),
    capacidad: schema.number([
      rules.range(1, 10000), // Define un rango razonable para la capacidad del vehículo
    ]),
    tipo_carga: schema.string({ trim: true }, [
      rules.maxLength(100), // Limita el tipo de carga a 100 caracteres
    ]),
    longitud: schema.number(),
    latitud: schema.number(),
  });

  public messages = {
    'matricula.required': 'El campo matricula es obligatorio.',
    'matricula.unique': 'Ya existe un vehículo con esta matrícula.',
    'matricula.maxLength': 'La matrícula no puede exceder los 20 caracteres.',
    'modelo.required': 'El campo modelo es obligatorio.',
    'modelo.maxLength': 'El modelo no puede exceder los 255 caracteres.',
    'capacidad.required': 'El campo capacidad es obligatorio.',
    'capacidad.range': 'La capacidad debe estar entre 1 y 10,000.',
    'tipo_carga.required': 'El campo tipo_carga es obligatorio.',
    'tipo_carga.maxLength': 'El tipo de carga no puede exceder los 100 caracteres.',
    'longitud.required': 'El campo longitud es obligatorio.',
    'latitud.required': 'El campo latitud es obligatorio.',
  };
}
