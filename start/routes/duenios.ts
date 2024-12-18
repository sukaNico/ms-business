
  import Route from '@ioc:Adonis/Core/Route';
  
  Route.group(() => {
    Route.get("/duenios", "DueniosController.find");
    Route.get("/duenios/:id", "DueniosController.find");
    Route.post("/duenios", "DueniosController.create");
    Route.put("/duenios/:id", "DueniosController.update");
    Route.delete("/duenios/:id", "DueniosController.delete");
  })//.middleware(["security"]);
  