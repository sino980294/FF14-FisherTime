<template>
  <div  v-if="id[0]">
    <div class="container p-3 ml-0 ">
      <div class="row">
        <div class="col-3">
          <img :src="`../fishpicture/${id[0].Name}.png`"  class="img-fluid">
        </div>
        <div class="col-9">
          <div class="d-flex">
            <h1 class="text-left">{{id[0].Name}}</h1>
            <font-awesome-icon :icon="[checkPin(id[0]), 'star']" size="2x" class="star ml-auto" @click="localStoraged(id[0])"></font-awesome-icon>
          </div>
          <ul class="fishInfoList text-left pl-0">
            <li>{{`地點: ${id[0].Location}`}}</li>
            <li>{{`漁場: ${id[0].InnerLocation}`}}</li>
            <li>{{`時間: ${id[0].StartTime}點~${id[0].EndTime}點`}}</li>
            <li>{{`天氣限制: ${weatherList()}`}}</li>
            <li>{{`魚餌: ${id[0].Bait}`}}</li>
            <li v-if="id[0].Notice !== ''">{{`${id[0].Notice}`}}</li>
          </ul>
        </div>
      </div>
    </div>
    <fish-time-list :FishData="id" :FishPin="pin" @checkPins="changePin"></fish-time-list>
  </div>
</template>

<script>
import FishTimeList from '../components/FishInfoList.vue'

export default {
  name: 'fishInfo',
  data: function() {
    return {
      data:[],
      pin:[],      
      timeRange:["00:00", "08:00", "16:00"],
      id: []
    }
  },
  components: {
    FishTimeList
  },
  methods: {
    weatherList() {
      let List = ''
      const weather = this.id[0].Weather || []
      if(weather.length !== 0){
        weather.forEach(item =>{
          List += `${item}, `
        })
      }else {
        return '無'
      }
      List = List.slice(0, -2)
      return List
    },
    localStoraged(item) {
      const pinArray = JSON.parse(localStorage.getItem('pins')) || [] ;
      if(pinArray.indexOf(item.Name) === -1) {
        pinArray.push(item.Name)
      }else {
        pinArray.splice(pinArray.indexOf(item.Name), 1)
      }
      localStorage.setItem('pins', JSON.stringify(pinArray));
      this.pin = pinArray
    },
    changePin(propsPin) {
      this.pin = propsPin
    }
  }, 
  
  computed: {
    checkPin() {
      return function(item) {
        let pinArray = this.pin;
        if(pinArray.indexOf(item.Name) === -1) {
          return 'far' 
        }else {
          return 'fas' 
        }
      }          
    }
  }, 
  watch: {
    $route(to, from) {
      const id = this.$route.params.id
      const NameArray = this.data.map(item => item.Name);
      this.id = [this.data[NameArray.indexOf(id)]]; 
    }
  },
  created() {
    this.$http.get( "/fish.json").then((response) => {
      this.data = response.data;
      const id = this.$route.params.id
      const NameArray = this.data.map(item => item.Name); 
      this.id.push(this.data[NameArray.indexOf(id)])
      this.pin = JSON.parse(localStorage.getItem('pins'))
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scope lang="scss">
.star{
  color: yellow; 
  cursor: pointer;
}
.fishInfoList{
  list-style: none;
}
</style>
