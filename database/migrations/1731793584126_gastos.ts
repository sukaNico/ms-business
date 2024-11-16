
import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class Gastos extends BaseSchema {
  protected tableName = 'gastos';

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');
      table.integer('servicio_id').unsigned().references('id').inTable('servicios')
      table.integer('conductor_id').unsigned().references('id').inTable('conductores')
      table.integer('monto')
      table.string('descripcion')
      table.string('estado')
      table.integer('dueño_id').unsigned().references('id').inTable('dueños')
      
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    });
  }

  public async down () {
    this.schema.dropTable(this.tableName);
  }
}
