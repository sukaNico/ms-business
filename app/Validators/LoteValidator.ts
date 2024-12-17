
import { schema, rules} from '@ioc:Adonis/Core/Validator';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class LoteValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    tipo_carga: schema.string({ trim: true }, [
      rules.maxLength(50),
    ]),
    peso: schema.number([
      rules.unsigned(),
      rules.range(1, 50000), // Peso entre 1 kg y 50 toneladas
    ]),
    ruta_id: schema.number([
      rules.exists({ table: 'rutas', column: 'id' }),
    ]),
  });

  public messages = {
    'tipoDeCarga.required': 'El tipo de carga es obligatorio.',
    'tipoDeCarga.in': 'El tipo de carga debe ser uno de los valores permitidos.',
  };

  /**
   * Validación personalizada para tipos de carga
   */
  public validateTipoDeCarga(tipoDeCarga: string) {
    const tiposPermitidos = ['alimentosPerecederos', 'refrigerada', 'general', 'liquidos'];
    if (!tiposPermitidos.includes(tipoDeCarga)) {
      throw new Error('El tipo de carga no es válido.');
    }
  }
}
