
import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class Turnos extends BaseSchema {
  protected tableName = 'turnos';

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');
      table.integer('conductor_id').unsigned().references('id').inTable('conductores')
      table.dateTime('hora_inico')
      table.dateTime('hora_fin')
      table.string('ubicacion')
      
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    });
  }

  public async down () {
    this.schema.dropTable(this.tableName);
  }
}
