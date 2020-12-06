<template>
  <div id="app">  
    <navbar></navbar>
    <div class="container-fluid pt-md-5">
      <div class="row">
        <div class="col-md-3 bg-secondary pl-0">
         <sidebar class="sidebar" :class="{'sidebar-bottom':scrollTop}"></sidebar>
        </div>
        <div class="col-md-9 bg-secondary">
          <router-view/>
        </div>    
      </div>
    </div> 
    <footbar></footbar>
  </div>
</template>

<script>
import navbar from '@/components/navbar.vue';
import sidebar from '@/components/sidebar.vue';
import footbar from '@/components/footbar.vue';
export default {
  components: {
    navbar,
    sidebar,
    footbar,
  },
  data() {
    return {
      scrollTop: false,
    }
  },
  methods: {
    scrollTopChange() {
      this.scrollTop = (document.documentElement.scrollHeight - document.documentElement.scrollTop <= document.documentElement.clientHeight + 56);
    },
    debounce(func, delay) {
      var timer = null;
      return function () {
        var context = this;
        var args = arguments;
        clearTimeout(timer);
        timer = setTimeout(function() {
          func.apply(context, args)
        }, delay);
      }
    }
  },
  
  mounted() {
    window.addEventListener('scroll', this.debounce(this.scrollTopChange, 200));
  }
}
</script>


<style lang="scss">
@import "./assets/all.scss";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

@media (min-width: 767.98px){
  .sidebar{
    overflow-y:scroll;
    max-height: calc(100vh - 56px);
    position: sticky;
    top:56px;
  }
  .sidebar-bottom{
    max-height: calc(100vh - 150px)
  }
}
</style>
