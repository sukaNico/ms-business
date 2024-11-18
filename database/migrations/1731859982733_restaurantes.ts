
import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class Restaurantes extends BaseSchema {
  protected tableName = 'restaurantes';

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');
      table.string('tipoCocina')
      table.integer('servicio_id').unsigned().references('id').inTable('servicios').onDelete('CASCADE')
      
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    });
  }

  public async down () {
    this.schema.dropTable(this.tableName);
  }
}
