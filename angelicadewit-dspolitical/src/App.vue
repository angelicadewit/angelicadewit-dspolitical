<template>
  <div id="app">

    <select v-model="selectedStation">
        <option v-for="resultsStation in resultsStations" :key="resultsStation.Code"  v-bind:value="resultsStation">
            {{ resultsStation.Name }}
        </option>
    </select>

    <home :selectedStation="selectedStation" :times="times" v-model="selectedLine"></home>
    <train-times :times="times" :selectedLine="selectedLine"></train-times>
  </div>
</template>

<script>
import home from './views/Home.vue'
import trainTimes from './views/trainTimes.vue'
import axios from 'axios'

export default {
  name: 'App',
  components: {
    home,
    trainTimes
  },
  data (){
    return{
        resultsStations: [],
        times:[],
        specificTimes: [],
        selectedStation: ``,
        selectedStationCode: ``,
        selectedLine: ``,
        apiKey: `e13626d03d8e4c03ac07f95541b3091b`,
    }
	},
  watch: {
		selectedStation: function(){
      console.log(this.selectedStation.Code)
      this.times = []
			this.selectedStationCode = this.selectedStation.Code
      // this.getTimes()
		},
    selectedLine: function(){
      console.log(this.selectedLine)
			// this.selectedStationCode = this.selectedStation.Code
      this.times = []
      console.log(this.times)
      this.getTimes()
		},
  },
	created: function() {
		this.doStationsSearch()
	},
	methods: {
		doStationsSearch: function(){
			axios.get(`https://api.wmata.com/Rail.svc/json/jStations?api_key=${this.apiKey}`)
			.then((response) => {
				this.resultsStations = response.data.Stations.sort((a, b) => (a.Name > b.Name) ? 1 : -1);
				console.log(this.resultsStations)
			})
			.catch((error) => {
				console.warn(error)
			})
		},
    getTimes: function(){
      console.log(`get time from line:`, this.selectedLine)
      axios.get(`https://api.wmata.com/StationPrediction.svc/json/GetPrediction/${this.selectedStationCode}?Line=${this.selectedLine}&api_key=${this.apiKey}`)
        .then((response) => {
          this.times = [],
          this.times = response.data.Trains
          console.log(this.times)
        })
        .catch((error) => {
        console.warn(error)
        })
    }
	}
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
