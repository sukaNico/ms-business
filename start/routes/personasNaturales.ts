
  import Route from '@ioc:Adonis/Core/Route';
  
  Route.group(() => {
    Route.get("/personasnaturales", "PersonasNaturalesController.find");
    Route.get("/personasnaturales/:id", "PersonasNaturalesController.find");
    Route.post("/personasnaturales", "PersonasNaturalesController.create");
    Route.put("/personasnaturales/:id", "PersonasNaturalesController.update");
    Route.delete("/personasnaturales/:id", "PersonasNaturalesController.delete");
  }).middleware(["security"]);
  