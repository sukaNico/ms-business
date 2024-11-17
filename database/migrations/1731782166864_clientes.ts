
import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class Clientes extends BaseSchema {
  protected tableName = 'clientes';

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');
      table.string('fechaRegistro')
      table.string('preferencias')
      
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    });
  }

  public async down () {
    this.schema.dropTable(this.tableName);
  }
}
