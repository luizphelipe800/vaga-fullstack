module.exports = app => {
    const pokemonModel = app.models.PokemonSchema;
    
    return {
        listarTodos: (req, res) => {
            let limit = parseInt(req.query.limit);
            let offset = parseInt(req.query.offset);

            if(!limit && !offset){
                limit = 20;
                offset = 0;
            }

            pokemonModel.paginate({}, { offset, limit}).then((pokemon) => {
                let next = offset + limit < 803 ? `http://localhost:3000/pokemon?offset=${offset+limit}&limit=${limit}`:null;
                let prev = offset - limit > -1 ? `http://localhost:3000/pokemon?offset=${offset-limit}&limit=${limit}`:null;
                let response = {...pokemon, next, prev}

                res.status(200).json(response);
            })
        },

        listarPorID: (req, res) =>{
            let { id } = req.params;
            pokemonModel.find({Row: id}, (err, response) => {
                if(err) return res.json(err);
                res.status(200).json(response);
            })
        },

        buscarPorNome: (req, res) => {
            let { name } = req.query;
            if (!name) name = '0'
            pokemonModel.find({Name: {$regex: new RegExp(`^${name}+`, 'i')}}, (err, response) => {
                if(err) return res.json(err);
                res.status(200).json(response);
            });
        }
    }
}