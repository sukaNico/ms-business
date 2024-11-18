
import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class Facturas extends BaseSchema {
  protected tableName = 'facturas';

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');
      table.date('fecha')
      table.integer('total')
      table.string('estado')
      
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    });
  }

  public async down () {
    this.schema.dropTable(this.tableName);
  }
}
