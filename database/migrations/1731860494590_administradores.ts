
import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class Administradores extends BaseSchema {
  protected tableName = 'administradores';

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');
      table.string('nivelAcceso')
      table.integer('usuario_id').unsigned().references('id').inTable('usuarios')
      table.integer('servicio_id').unsigned().references('id').inTable('servicios')
      
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    });
  }

  public async down () {
    this.schema.dropTable(this.tableName);
  }
}