
  import Route from '@ioc:Adonis/Core/Route';
  
  Route.group(() => {
    Route.get("/vehiculo_conductores", "Vehiculo_conductoresController.find");
    Route.get("/vehiculo_conductores/:id", "Vehiculo_conductoresController.find");
    Route.post("/vehiculo_conductores", "Vehiculo_conductoresController.create");
    Route.put("/vehiculo_conductores/:id", "Vehiculo_conductoresController.update");
    Route.delete("/vehiculo_conductores/:id", "Vehiculo_conductoresController.delete");
  });
  