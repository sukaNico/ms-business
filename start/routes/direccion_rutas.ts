
  import Route from '@ioc:Adonis/Core/Route';
  
  Route.group(() => {
    Route.get("/direccion_rutas", "Direccion_rutasController.find");
    Route.get("/direccion_rutas/:id", "Direccion_rutasController.find");
    Route.post("/direccion_rutas", "Direccion_rutasController.create");
    Route.put("/direccion_rutas/:id", "Direccion_rutasController.update");
    Route.delete("/direccion_rutas/:id", "Direccion_rutasController.delete");
  });
  