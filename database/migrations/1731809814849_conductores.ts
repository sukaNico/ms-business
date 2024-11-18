
import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class Conductores extends BaseSchema {
  protected tableName = 'conductores';

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');
      table.integer('usuario_id').unsigned().references('id').inTable('usuarios').onDelete('CASCADE')
      table.string('licencia_conduccion')
      table.integer('años_experiencia')
      
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    });
  }

  public async down () {
    this.schema.dropTable(this.tableName);
  }
}
