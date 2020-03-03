const mongoose = require('mongoose');
const paginate = require('mongoose-paginate');

module.exports = app => {
    const PokemonSchema = new mongoose.Schema({});
    PokemonSchema.plugin(paginate);
    const pokemon = mongoose.model('pokemons', PokemonSchema);

    return pokemon;
}