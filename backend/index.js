const express = require('express');
const consign = require('consign');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

//conexão com o banco
mongoose.connect('mongodb+srv://luiz:LS1996Ads@cluster0-qjnm7.mongodb.net/pokeapidb?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.connection.on('open', () => console.log('conectado ao banco!'));

//evita o problema de cors
app.use(cors());

consign({cwd: 'src'})
.include('models')
.then('controllers')
.then('routes')
.into(app);

app.listen(3000, () => console.log('rodando aplicação!'));
