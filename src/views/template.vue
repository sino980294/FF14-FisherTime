<template>
  <div>
    <h2 class="m-3 display-4">FF14魚王時鐘</h2>
    <ul class="text-left">
      <li>歡迎使用FF14魚王時鐘，目前僅開放查詢2.0版本之魚王</li>
      <li>可釣時間顯示 "X點~Y點" 即為 "X點00分 至 Y點59分"</li>
      <li>點選列表之魚王名稱可以進入詳細資訊頁面</li>    
      <li>點選星星圖案可以進行釘選，進入釘選欄位可以看到所有已釘選魚王之可釣時間</li>
      <li>如果需要全部釘選請按<a href="#" @click.prevent="pinAll" class ="text-danger">這裡</a></li>
    </ul>
    <fish-time-list :FishData="data" :FishPin="pin" v-if="data[0]"></fish-time-list>
  </div>
</template>

<script>
import FishTimeList from '../components/FishInfoList.vue'

export default {
  name: 'templates',
  data: function(){
    return {
      data: [],
      pin: [],      
      timeRange: ["00:00", "08:00", "16:00"]      
    }
  },
  components: {
    FishTimeList,
  },
  methods: { 
    pinAll() {
      this.pin = this.data.map(item => item.Name)
      localStorage.setItem('pins', JSON.stringify(this.pin));
    }
  },
  created() {
    this.$http.get("https://sino980294.github.io/FF14-fish2.0/fish.json").then((response) => {
      this.data = response.data; 
      this.pin = JSON.parse(localStorage.getItem('pins')) || [];
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
