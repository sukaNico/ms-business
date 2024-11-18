
import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class Contratos extends BaseSchema {
  protected tableName = 'contratos';

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');
      table.integer('cliente_id').unsigned().references('id').inTable('clientes').onDelete('CASCADE')
      table.integer('valor')
      table.date('fecha_inico')
      table.date('fecha_fin')
      
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    });
  }

  public async down () {
    this.schema.dropTable(this.tableName);
  }
}
