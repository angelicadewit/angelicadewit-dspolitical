<template>
    <div>
        <p>Station Name: {{ selectedStation.Name }}</p>
        <p>Station Street Address: {{ selectedStation.Address.Street }}</p>
        <p>Available Lines:</p>
        <select v-model="selectedLine">
            <option>{{ selectedStation.LineCode1 }}</option>
            <option v-if="selectedStation.LineCode2">{{ selectedStation.LineCode2 }}</option>
            <option v-if="selectedStation.LineCode3">{{ selectedStation.LineCode3 }}</option>
            <option v-if="selectedStation.LineCode4">{{ selectedStation.LineCode4 }}</option>
        </select>
    </div>
</template>

<script>
// import { mapState } from 'vuex'
// import axios from 'axios'

export default {
    name: 'home',
    props: ["selectedStation", "times"],
    data: function(){
        return{
            selectedLine: this.selectedLine,
            apiKey2: `e13626d03d8e4c03ac07f95541b3091b`,
        }
    },
    watch: {
    selectedLine: function() {
        this.$emit('input', this.selectedLine);
    }
  },
};
</script>