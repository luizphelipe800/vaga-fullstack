<template>
    <div v-if="pokemon">
        <h1>{{pokemon['Name']}}</h1>
        <img v-bind:src="formatUrl(pokemon['Img name'])"/>
        <h4>Tipo</h4>
        <p>{{pokemon['Type 1']}}</p>
        <p v-if="pokemon['Type 2']">{{pokemon['Type 2']}}</p>
        <h4>weather</h4>
        <p>{{pokemon['Weather 1']}}</p>
        <p v-if="pokemon['Weather 2']">{{pokemon['Weather 2']}}</p>
        <h4>Status</h4>
        <div class="stats">
            <p>Atk: {{pokemon['ATK']}}</p>
            <p>Def: {{pokemon['DEF']}}</p>
            <p>Sta: {{pokemon['STA']}}</p>
        </div>
    </div>
</template>

<script>
import api from '../services/api'

export default {
    name: 'poke-info',
    props: ['target'],
    data: () => ({
        pokemon: null
    }),

    watch: {
        target: async function(){
            await api.get('/pokemon/search?name='+this.target)
            .then((response) => {
                this.pokemon = response.data[0];
            })
        }
    },

    methods: {
        formatUrl: function(id){
            return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
        }
    }
}
</script>