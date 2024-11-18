
import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class Municipios extends BaseSchema {
  protected tableName = 'municipios';

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');
      table.string('nombre')
      table.integer('departamento_id').unsigned().references('id').inTable('departamentos').onDelete("CASCADE")
      
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    });
  }

  public async down () {
    this.schema.dropTable(this.tableName);
  }
}
