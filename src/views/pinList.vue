<template>
  <div>
    <h2 class="m-3 display-4">釘選列表</h2>
    <ul class="text-left">
      <li>歡迎使用FF14魚王時鐘，這裡會顯示已釘選的魚類的可釣魚時間</li>
      <li>點選列表之魚王名稱可以進入詳細資訊頁面</li>
      <li>如果需要全部解除訂選請按<a href="#" @click.prevent="deletePins" class="text-danger">這裡</a></li>
      <li>如果需要全部訂選請按<a href="#" @click.prevent="pinAll" class="text-danger">這裡</a></li>
    </ul>
    <fish-time-list :FishData="pinData" :FishPin="pin" @checkPins="changePin" v-if="pin[0]"></fish-time-list>
  </div>
</template>

<script>
import FishTimeList from '../components/FishInfoList.vue'

export default {
  name: 'pinList',
  data: function() {
    return {
      data: [],
      pin: [],
      pinData: [],      
      timeRange: ["00:00", "08:00", "16:00"]      
    }
  },
  components: {
    FishTimeList,
  },
  methods: { 
    pinAll() {
      this.pin = this.data.map(item => item.Name);
      this.pinData = this.data;
      localStorage.setItem('pins', JSON.stringify(this.pin));
    },
    deletePins() {
      this.pin = [];
      this.pinData = [];
      localStorage.setItem('pins', JSON.stringify(this.pin));  
    },
    changePin(propsPin) {
      this.pin = propsPin;
      this.pinData = [];
      this.data.forEach(item => {
        if(this.pin.indexOf(item.Name) !== -1) {
          this.pinData.push(item);
        }
      })  
    }
  },
  created() {
    this.$http.get( "/fish.json").then((response) => {
      this.data = response.data; 
      this.pin = JSON.parse(localStorage.getItem('pins'))
      this.data.forEach(item => {
        if(this.pin.indexOf(item.Name) !== -1){
          this.pinData.push(item)
        }
      })    
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scope lang="scss">
.fishInfoList{
  list-style: none;
}
</style>
