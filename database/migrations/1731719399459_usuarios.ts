
import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class Usuarios extends BaseSchema {
  protected tableName = 'usuarios';

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');
      table.string('nombre')
      table.integer('cedula')
      table.string('email')
      table.integer('telefono')
      
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    });
  }

  public async down () {
    this.schema.dropTable(this.tableName);
  }
}
