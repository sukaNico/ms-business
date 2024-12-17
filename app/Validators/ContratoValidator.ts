import { schema, rules } from '@ioc:Adonis/Core/Validator';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class ContratoValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    cliente_id: schema.number([
      rules.exists({ table: 'clientes', column: 'id' }), // Verifica que el cliente exista en la base de datos
    ]),
    valor: schema.number([
      rules.unsigned(), // Asegura que el valor no sea negativo
      rules.range(1, 10000000), // Define un rango razonable para el valor del contrato
    ]),
    fecha_inicio: schema.date({}, [
      rules.beforeField('fecha_fin'), // Asegura que la fecha de inicio sea antes de la fecha de fin
    ]),
    fecha_fin: schema.date({}, [
      rules.afterField('fecha_inicio'), // Asegura que la fecha de fin sea después de la fecha de inicio
    ]),
  });

  public messages = {
    'cliente_id.required': 'El campo cliente_id es obligatorio.',
    'cliente_id.exists': 'El cliente especificado no existe en el sistema.',
    'valor.required': 'El campo valor es obligatorio.',
    'valor.unsigned': 'El valor del contrato no puede ser negativo.',
    'valor.range': 'El valor del contrato debe estar entre 1 y 10,000,000.',
    'fecha_inico.required': 'La fecha de inicio es obligatoria.',
    'fecha_inico.beforeField': 'La fecha de inicio debe ser anterior a la fecha de fin.',
    'fecha_fin.required': 'La fecha de fin es obligatoria.',
    'fecha_fin.afterField': 'La fecha de fin debe ser posterior a la fecha de inicio.',
  };
}
