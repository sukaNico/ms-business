import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'gastos'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('servicio_id').unsigned().references('id').inTable('servicios')
      table.integer('duenio_id').unsigned().references('id').inTable('duenios')
      table.integer('factura_id').unsigned().references('id').inTable('facturas')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
