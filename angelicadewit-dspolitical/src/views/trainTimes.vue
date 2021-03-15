<template>
    <div v-if="selectedLine && filteredTimes.length">
        Current Train Status:

        <ul>
            <li v-for="time in filteredTimes" :key="time.index">
                <span v-if="time.Min === 'ARR'">The {{ time.Line }} is arriving</span>
                <span v-else-if="time.Min === 'BRD'">The {{ time.Line }} is boarding</span>
                <span v-else>{{time.Line}} - {{time.Min}} mins</span>
                
            </li>
        </ul>
    </div>

    <div v-else-if="selectedLine && !filteredTimes.length">
        There are no times available
    </div>

    <div v-else>
    </div>
</template>

<script>
// import { mapState } from 'vuex'
// import axios from 'axios'

export default {
    name: 'train-times',
    props: ["times", "selectedLine"],
    data: function(){
        return{
        }
    },
    computed: {
        filteredTimes: function(){
            return this.times.filter(time => !time.Line.indexOf(this.selectedLine))
        }
    }
};
</script>

<style>

ul{
    padding-inline-start: 0px;
}
ul li{
    list-style: none;
}
</style>