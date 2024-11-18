
import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class Cuotas extends BaseSchema {
  protected tableName = 'cuotas';

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');
      table.integer('contrato_id').unsigned().references('id').inTable('contratos').onDelete('CASCADE')
      table.integer('factura_id').unsigned().references('id').inTable('facturas').onDelete('CASCADE')
      table.integer('monto')
      table.integer('tasa_interes')
      table.date('fecha_generacion')
      table.date('fecha_vencimiento')
      
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    });
  }

  public async down () {
    this.schema.dropTable(this.tableName);
  }
}
