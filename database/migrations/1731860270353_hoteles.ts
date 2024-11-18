
import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class Hoteles extends BaseSchema {
  protected tableName = 'hoteles';

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');
      table.string('númeroHabitacion')
      table.string('serviciosIncluidos')
      table.integer('servicio_id').unsigned().references('id').inTable('servicios').onDelete('CASCADE')
      
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    });
  }

  public async down () {
    this.schema.dropTable(this.tableName);
  }
}
