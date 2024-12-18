
  import Route from '@ioc:Adonis/Core/Route';
  
  Route.group(() => {
    Route.get("/centro_distribuciones", "Centro_distribucionesController.find");
    Route.get("/centro_distribuciones/:id", "Centro_distribucionesController.find");
    Route.post("/centro_distribuciones", "Centro_distribucionesController.create");
    Route.put("/centro_distribuciones/:id", "Centro_distribucionesController.update");
    Route.delete("/centro_distribuciones/:id", "Centro_distribucionesController.delete");
  })//.middleware(["security"]);
  