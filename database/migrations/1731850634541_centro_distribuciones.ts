
import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class Centro_distribuciones extends BaseSchema {
  protected tableName = 'centro_distribuciones';

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');
      table.string('nombre')
      table.integer('capacidad')
      table.integer('telefono')
      table.string('hora_apertura')
      table.string('hora_cierre')
      table.integer('direccion_id').unsigned().references('id').inTable('direcciones').onDelete('CASCADE')
      
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    });
  }

  public async down () {
    this.schema.dropTable(this.tableName);
  }
}
