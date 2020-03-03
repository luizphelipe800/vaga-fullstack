<template>
  <div class="container">
    <div class="search-box">
      <input type="text" required v-model="pokemonName"/>
      <button v-on:click="searchByName(pokemonName)">Procurar</button>
    </div>

    <div class="poke-grid">
      <div
        class="poke-card"
        v-for="(pokemon, index) in pokemons" 
        v-bind:key="index" 
        v-on:click="showPokemonInfo"
      >
        <img v-bind:src="formatUrl(pokemon['Img name'])" v-bind:alt="pokemon.Name"/>
        <p>{{pokemon.Name}}</p>
      </div>
    </div>

    <div class="poke-info-box">
      <PokeInfo class="poke-info" v-bind:target="pokeTarget"/>
    </div>

    <div class="button-group">
      <button v-if="prev" v-on:click="changePage(prev)">anterior</button>
      <button v-if="next" v-on:click="changePage(next)">proximo</button>
    </div>
  </div>
</template>

<script>

import PokeInfo from './components/PokeInfo';
import api from './services/api';

export default {
  name: 'App',
  data: () => ({
    pokemons: [],
    next: '',
    prev: '',
    pokemonName: '',
    pokeTarget: ''
  }),

  components: {
    PokeInfo
  },

  beforeMount: async function(){
    await api.get('/pokemon').then(response => {
      this.pokemons = response.data.docs;
      this.next = response.data.next;
      this.prev = response.data.prev;
    })
  },

  methods: {
    changePage: async function(page){
      let query = '/' + page.split('/')[3]
      
      await api.get(query).then(response => {
        this.pokemons = response.data.docs;
        this.next = response.data.next;
        this.prev = response.data.prev;
      })
    },
    searchByName: async function(name){
      let url = '/pokemon/search?name='+name;
      if(name){
        await api.get(url).then(response => {
          this.pokemons = response.data;
          this.next = null;
          this.prev = null;
        })
      }else{
        await api.get('/pokemon').then(response => {
          this.pokemons = response.data.docs;
          this.next = response.data.next;
          this.prev = response.data.prev;
        })
      }
    },
    formatUrl: function(id){
      return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
    },
    showPokemonInfo: function(event){
      if(event.target.tagName == 'IMG') return this.pokeTarget = event.target.alt;
      if(event.target.tagName == 'P'){
        return this.pokeTarget = event.target.parentElement.children[0].alt;
      }

      return this.pokeTarget = event.target.children[0].alt;
    }
  }
}

</script>



<style lang="css">
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: none;
  }

  .container{
    display: grid;
    grid-template-columns: 1fr 40vh;
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
  }

  .search-box{
    grid-column: 1 / 3;
    padding: 15px;
  }
  .search-box input{
    padding: 10px;
    background-color: #ffffff;
    border: 1px solid #ff4f4f;
    border-radius: 15px 0 0 15px;
  }

  .search-box button{
    padding: 10px;
    background-color: #ff4f4f;
    border: 1px solid #ff4f4f;
    border-radius: 0 10px 10px 0;
    color: #ffffff;
    font-weight: bold;
    cursor: pointer;
  }

  .poke-grid{
    grid-column: 1 / 2;
    margin: 15px auto;
    width: 60vw;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    justify-content: center;
    align-items: start;
    text-align: center;
    gap: 10px
  }

  .poke-grid .poke-card{
    background-color: #ff4f4f;
    padding: 10px 0;
    height: 160px;
    border-radius: 15px;
    box-shadow: 0 0 5px #e84e4a;
    cursor: pointer;
  }

  .poke-info-box{
    grid-column: 2 / 3;
    margin: 15px 0;
    padding: 10px;
    width: 100%;
    height: 500px;
    border: 1px solid#3d3d3d;
    border-radius: 0 0 0 10px;
    text-align: center;
    position: sticky;
    top: 0;
  }

  .poke-info-box h1{
    color: #ff4f4f;
    margin: 10px 0;
  }

  .poke-info-box h4{
    margin: 10px 0 5px 0;
  }

  .button-group{
    grid-column: 1 / 3;
    justify-self: center;
  }

  .button-group button{
    padding: 10px;
    margin: 10px 15px;
    border: none;
    background-color: #3e3e3e;
    color: #ffffff;
    font-weight: bold;
    border-radius: 5px;
    box-shadow: 0 0 10px #3e3e3e;
    cursor: pointer;
  }

  .button-group button:hover{
    background-color: #e84a4a;
  }
</style>