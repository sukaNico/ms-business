import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class Conductores extends BaseSchema {
  protected tableName = 'conductores';

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');
      table.string('usuario_id')
      table.string('licencia_conduccion')
      table.integer('anios_experiencia')
      
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    });
  }

  public async down () {
    this.schema.dropTable(this.tableName);
  }
}