
import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class Direcciones extends BaseSchema {
  protected tableName = 'direcciones';

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');
      table.string('barrio')
      table.string('tipoCalle')
      table.string('calle')
      table.integer('numero')
      table.string('piso')
      table.integer('municipio_id').unsigned().references('id').inTable('municipios')
      
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    });
  }

  public async down () {
    this.schema.dropTable(this.tableName);
  }
}
