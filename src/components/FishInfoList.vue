<template>
<div>
  <ul class="list-group" v-for="nums in checkFishTime()" :key="nums" >
    <li class="list-group-item active d-flex justify-content-between" >
      <div>
        {{nowTimeRange(nums)}}
      </div>
      <div>
        {{timeChangeTemplate(nums)}}
      </div>     
    </li>
    <li class="list-group-item text-left list-group-item-action container-fluid bg-secondary" v-for="item in fishTimeCheckList(nums)" :key="item.Name">
      <div class="row">
        <div class="col-lg-2 col-3">
          <img :src="require(`@/assets/fishpicture/${item.Name}.png`)" class="img-fluid">
        </div>
        <div class="col-lg-10 col-9">
          <div class="d-flex">
            <router-link :to="`/${item.Name}`" class="h4 text-left text-dark font-weight-bold">{{item.Name}}</router-link>
            <font-awesome-icon :icon="[checkPin(item), 'star']" size="2x" class="star ml-auto" @click="localStoraged(item)"></font-awesome-icon>
          </div>
          <div>
            <div class="container-fluid h6">
              <ul class="row pl-0 fishInfoList text-dark font-weight-bold">
                <li class="col-lg-6 pb-lg-3 pb-2">天氣-{{locationWeather(item.Location, timeChange(nums))}}</li>
                <li class="col-lg-6 pb-lg-3 pb-2">地點-{{item.Location}}</li>
                <li class="col-lg-6 pb-lg-3 pb-2">漁場-{{item.InnerLocation}}</li>
                <li class="col-lg-6 pb-lg-3 pb-2">時間-{{item.StartTime}}點~{{item.EndTime}}點</li>
              </ul>  
            </div>
          </div>
        </div> 
      </div> 
    </li>  
  </ul>
</div>
</template>

<script>
import EorzeaTime from 'eorzea-time';
import EorzeaWeather from 'eorzea-weather';
import getLocationWeather from '../components/getLocationWeather';
import weatherName from '../components/weatherName';

export default {
  name: 'FishTimeList',
  props:{
    FishData : Array,
    FishPin : Array
  },
  data : function() {
    return {
      data : [],
      pin :[],
      timeRange:["00:00", "08:00", "16:00"]
    }
  },
  
  methods: {
    timeRangeCal(Hours, num) {
      return (Math.floor(Hours / 8) + num ) % 3;
    },
    backSecond() {
      const eorzeaTime = new EorzeaTime();
      return ((eorzeaTime.getHours() % 8)  * 60 + eorzeaTime.getMinutes()) * 60 + eorzeaTime.getSeconds();
    }, 
    realTimeChange(seconds) {
      return seconds / 3600 * 175 * 1000;
    },
    timeChange(num){
      const backSeconds = this.backSecond();
      const backRealSeconds = this.realTimeChange(backSeconds);
      const hoursAfter = this.realTimeChange(num * 8 * 3600);
      let realTime = new Date();
      realTime.setTime(realTime.getTime() - backRealSeconds + hoursAfter);
      return realTime;
    },
    locationWeather(location, time){
      const weather = getLocationWeather(location, time);       
      const weatherNamed = weatherName(weather);
      return weatherNamed;
    },
    checkFishTime() {
      const eorzeaTime = new EorzeaTime();
      const eorzeaHour = eorzeaTime.getHours();
      let fishTimeArray = [];
      for(let num = 0; fishTimeArray.length < 5 && num < 1000; num++) { 
        this.data.forEach(item => {
          if(fishTimeArray.indexOf(num) === -1) {         
            if((item.StartTime === 0 && item.EndTime === 23) || Math.floor(item.StartTime / 8) === this.timeRangeCal( eorzeaHour, num) || Math.floor((item.EndTime) / 8) === this.timeRangeCal( eorzeaHour, num)) {
              if(item.Weather.length === 0 || item.Weather.indexOf(this.locationWeather(item.Location, this.timeChange(num))) >= 0 ) {              
                fishTimeArray.push(num);                   
              }              
            }
          }          
        })         
      }
      return fishTimeArray;
    },
    nowTimeRange(num) {
      const eorzeaHour = new EorzeaTime().getHours();
      return `ET : ${this.timeRange[this.timeRangeCal(eorzeaHour, num)]} ~ ET : ${this.timeRange[this.timeRangeCal(eorzeaHour, num + 1)]} `;
    },
    timeChangeTemplate(num) {
      const realTime = this.timeChange(num);
      return `LT : ${realTime.getMonth() + 1}/${realTime.getDate()}  ${realTime.getHours() < 10 ? "0" : ""}${realTime.getHours()}:${realTime.getMinutes() < 10 ? "0" : ""}${realTime.getMinutes()}`;
    }, 
    fishTimeCheckList(num) {
      const eorzeaHour = new EorzeaTime().getHours();      
      let fish = [];      
      this.data.forEach(item =>{
        if((item.StartTime === 0 && item.EndTime === 23)||Math.floor(item.StartTime / 8) === this.timeRangeCal( eorzeaHour, num) || Math.floor((item.EndTime) / 8) === this.timeRangeCal( eorzeaHour, num)){
          if(item.Weather.length === 0 || item.Weather.indexOf(this.locationWeather(item.Location, this.timeChange(num))) >= 0 ){
            fish.push(item);
          }          
        }
      })      
      return fish;
    },
    localStoraged(item) {
      let pinArray = JSON.parse(localStorage.getItem('pins')) || [];
      if(pinArray.indexOf(item.Name) === -1){
        pinArray.push(item.Name);
      }else{
        pinArray.splice(pinArray.indexOf(item.Name), 1);
      }
      localStorage.setItem('pins', JSON.stringify(pinArray));
      this.pin = pinArray;
      this.$emit('checkPins',this.pin);
    }
  },
  computed: {
    checkPin() {
      this.pin = this.FishPin || this.pin;
      this.data = this.FishData || this.data;
      return function(item) {
        const pinArray = this.pin;
        if(pinArray.indexOf(item.Name) === -1) {
          return 'far';
        }else {
          return 'fas'; 
        }
      }          
    }
  },
  watch: {
    $route(to, from) {
      this.data = this.FishData;
    }
  },
  created() {
    this.pin = JSON.parse(localStorage.getItem('pins'))
    this.data = this.FishData;
  }
}
</script>

<style>

</style>