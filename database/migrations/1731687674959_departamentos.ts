
import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class Departamentos extends BaseSchema {
  protected tableName = 'departamentos';

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');
      table.string('nombre')
      table.integer('superficie')
      table.integer('poblacion')
      table.integer('postal_code')
      
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    });
  }

  public async down () {
    this.schema.dropTable(this.tableName);
  }
}
