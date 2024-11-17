/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})


import './routes/categorias';
import './routes/productos';
import './routes/categoriaProductos';
import './routes/departamentos';
import './routes/municipios';
import './routes/usuarios';
import './routes/clientes';
import './routes/personasNaturales';
import './routes/empresas';
import './routes/lotes';
import './routes/conductores'
import './routes/turnos';
import './routes/vehiculos';
import './routes/vehiculo_conductores';
import './routes/duenios';
import './routes/duenio_vehiculos';
import './routes/seguros';
import './routes/contratos';
import './routes/cuotas';
import './routes/rutas';
import './routes/direcciones';
import './routes/centro_distribuciones';
import './routes/direccion_rutas';
import './routes/operaciones';
import './routes/gastos';
import './routes/servicios';
import './routes/restaurantes';
import './routes/hoteles';
import './routes/administradores';
import './routes/facturas';
