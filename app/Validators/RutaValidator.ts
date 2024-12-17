import { schema, rules } from '@ioc:Adonis/Core/Validator';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class RutaValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    contrato_id: schema.number([
      rules.exists({ table: 'contratos', column: 'id' }), // Verifica que el contrato asociado exista
    ]),
    vehiculo_id: schema.number([
      rules.exists({ table: 'vehiculos', column: 'id' }), // Verifica que el vehículo asociado exista
    ]),
    lugar_inicio: schema.string({ trim: true }, [
      rules.maxLength(255), // Limita la longitud del lugar de inicio
    ]),
    lugar_fin: schema.string({ trim: true }, [
      rules.maxLength(255), // Limita la longitud del lugar de fin
    ]),
    distancia: schema.number([
      rules.range(1, 10000), // Define un rango lógico para la distancia (1-10,000)
    ])
  });

  public messages = {
    'contrato_id.required': 'El campo contrato_id es obligatorio.',
    'contrato_id.exists': 'El contrato especificado no existe.',
    'vehiculo_id.required': 'El campo vehiculo_id es obligatorio.',
    'vehiculo_id.exists': 'El vehículo especificado no existe.',
    'lugar_inicio.required': 'El campo lugar_inicio es obligatorio.',
    'lugar_inicio.maxLength': 'El lugar de inicio no puede exceder los 255 caracteres.',
    'lugar_fin.required': 'El campo lugar_fin es obligatorio.',
    'lugar_fin.maxLength': 'El lugar de fin no puede exceder los 255 caracteres.',
    'distancia.required': 'El campo distancia es obligatorio.',
    'distancia.range': 'La distancia debe estar entre 1 y 10,000.',
    'fecha_inicio.required': 'El campo fecha_inicio es obligatorio.',
    'fecha_fin.required': 'El campo fecha_fin es obligatorio.',
  };
}
