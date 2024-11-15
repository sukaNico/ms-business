
import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class Productos extends BaseSchema {
  protected tableName = 'productos';

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');
      table.string('nombre')
      table.integer('cantidad')
      table.integer('peso')
      table.integer('lote_id').unsigned().references('id').inTable('lotes')
      table.integer('cliente_id').unsigned().references('id').inTable('clientes')
      
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    });
  }

  public async down () {
    this.schema.dropTable(this.tableName);
  }
}
