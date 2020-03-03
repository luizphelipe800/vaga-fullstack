module.exports = app => {
    const pokemonController = app.controllers.PokemonController;

    app.get('/pokemon/', pokemonController.listarTodos);
    app.get('/pokemon/search', pokemonController.buscarPorNome);
    app.get('/pokemon/:id', pokemonController.listarPorID);
}