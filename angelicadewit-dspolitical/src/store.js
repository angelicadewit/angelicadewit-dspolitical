import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
// import router from '@/router';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        lines: [
            { color :'RD'},{ color : 'BL'}, { color : 'YL'}, { color : 'OR'}, { color : 'GR'}, { color : 'SV'}],
        line: "",
        data: [],
        apiKey: "e13626d03d8e4c03ac07f95541b3091b"
    },
    getters: {
        stations: state => {
            return state.stations;
        }
    },
    mutations: {
        setStations(state, payload) {
            state.data = payload;
        },
        setLine(state, payload) {
            state.line = payload;
        },
            
    },
    actions: {
        getStations ({ state, commit }) {
            axios
                .get(`https://api.wmata.com/Rail.svc/json/jStations?LineCode=${state.line}&api_key=${state.apiKey}`)
                .then((response) => {
                    commit('setStations', response.data);
                })
                .catch((error) => {
                    console.warn(error)
                })
        },
        // setLine ({ commit }){
        //     commit('line')
        // }
    },
});