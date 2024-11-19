import { schema, rules } from '@ioc:Adonis/Core/Validator';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class CuotaValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    contrato_id: schema.number([
      rules.exists({ table: 'contratos', column: 'id' }), // Verifica que el contrato exista en la base de datos
    ]),
    monto: schema.number([
      rules.unsigned(), // Asegura que el monto no sea negativo
      rules.range(1, 10000000), // Define un rango razonable para el monto de la cuota
    ]),
    tasa_interes: schema.number([
      rules.range(0, 100), // Limita la tasa de interés entre 0 y 100%
    ]),
    fecha_generacion: schema.date({}, [
      rules.beforeField('fecha_vencimiento'), // Asegura que la fecha de generación sea antes de la fecha de vencimiento
    ]),
    fecha_vencimiento: schema.date({}, [
      rules.afterField('fecha_generacion'), // Asegura que la fecha de vencimiento sea después de la fecha de generación
    ]),
  });

  public messages = {
    'contrato_id.required': 'El campo contrato_id es obligatorio.',
    'contrato_id.exists': 'El contrato especificado no existe en el sistema.',
    'monto.required': 'El campo monto es obligatorio.',
    'monto.unsigned': 'El monto no puede ser negativo.',
    'monto.range': 'El monto debe estar entre 1 y 10,000,000.',
    'tasa_interes.required': 'El campo tasa_interes es obligatorio.',
    'tasa_interes.range': 'La tasa de interés debe estar entre 0 y 100.',
    'fecha_generacion.required': 'La fecha de generación es obligatoria.',
    'fecha_generacion.beforeField': 'La fecha de generación debe ser anterior a la fecha de vencimiento.',
    'fecha_vencimiento.required': 'La fecha de vencimiento es obligatoria.',
    'fecha_vencimiento.afterField': 'La fecha de vencimiento debe ser posterior a la fecha de generación.',
    'factura_id.exists': 'La factura especificada no existe en el sistema.',
  };
}
