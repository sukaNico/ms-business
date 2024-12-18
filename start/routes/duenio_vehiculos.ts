
  import Route from '@ioc:Adonis/Core/Route';
  
  Route.group(() => {
    Route.get("/duenio_vehiculos", "Duenio_vehiculosController.find");
    Route.get("/duenio_vehiculos/:id", "Duenio_vehiculosController.find");
    Route.post("/duenio_vehiculos", "Duenio_vehiculosController.create");
    Route.put("/duenio_vehiculos/:id", "Duenio_vehiculosController.update");
    Route.delete("/duenio_vehiculos/:id", "Duenio_vehiculosController.delete");
  })//.middleware(["security"]);
  