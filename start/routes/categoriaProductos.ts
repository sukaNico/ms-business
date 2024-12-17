
  import Route from '@ioc:Adonis/Core/Route';
  
  Route.group(() => {
    Route.get("/categoriaproductos", "CategoriaProductosController.find");
    Route.get("/categoriaproductos/:id", "CategoriaProductosController.find");
    Route.post("/categoriaproductos", "CategoriaProductosController.create");
    Route.put("/categoriaproductos/:id", "CategoriaProductosController.update");
    Route.delete("/categoriaproductos/:id", "CategoriaProductosController.delete");
  })//.middleware(["security"]);
  