
import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class Servicios extends BaseSchema {
  protected tableName = 'servicios';

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');
      table.string('nombre')
      table.string('direccion')
      table.string('descripcion')
      table.string('fecha')
      
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    });
  }

  public async down () {
    this.schema.dropTable(this.tableName);
  }
}
