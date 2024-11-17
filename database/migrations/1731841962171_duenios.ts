
import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class Duenios extends BaseSchema {
  protected tableName = 'duenios';

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');
      table.integer('conductor_id').unsigned().references('id').inTable('conductores')
      table.integer('usuario_id').unsigned().references('id').inTable('usuarios')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    });
  }

  public async down () {
    this.schema.dropTable(this.tableName);
  }
}
