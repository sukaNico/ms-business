
  import Route from '@ioc:Adonis/Core/Route';
  
  Route.group(() => {
    Route.get("/direccion_rutas", "DireccionRutasController.find");
    Route.get("/direccion_rutas/:id", "DireccionRutasController.find");
    Route.post("/direccion_rutas", "DireccionRutasController.create");
    Route.put("/direccion_rutas/:id", "DireccionRutasController.update");
    Route.delete("/direccion_rutas/:id", "DireccionRutasController.delete");
  })//.middleware(["security"]);
  