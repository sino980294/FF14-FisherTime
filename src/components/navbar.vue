<template>
  <div class="nav-fixed">
    <nav class="navbar navbar-expand-md navbar-dark bg-primary" >
      <router-link to="/" class="navbar-brand" href="#">FF14魚王時鐘(2.0)</router-link>
      <div class="ml-auto">
        <div class="navbar-brand">{{`ET: ${nowEorzeaTime}`}}</div>
        <div class="navbar-brand">{{`LT: ${nowLocalTime}`}}</div>
      </div>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
    </nav>
  </div>  
</template>

<script>
import EorzeaTime from 'eorzea-time'

export default {
  name: 'navbar',
  data: function() {
  return {
    nowEorzeaTime: "",
    nowLocalTime: "",    
    }
  }, 
    
  mounted() {
    setInterval(function() {  
      const eorzeaTime = new EorzeaTime();
      const localTime = new Date(); 
      this.nowEorzeaTime = eorzeaTime.toString().slice(0,-3);
      this.nowLocalTime = `${localTime.getHours() < 10 ? "0" : ""}${localTime.getHours()}:${localTime.getMinutes() < 10 ? "0" : ""}${localTime.getMinutes()}`;                              
    },1500) 
    this.$bus.$on('collapse-click', function() {
      document.querySelector(".navbar-toggler").click();
    })       
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scope lang="scss">
@media (min-width: 768px){
  .nav-fixed{
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    z-index: 1030;
  }
}
</style>
