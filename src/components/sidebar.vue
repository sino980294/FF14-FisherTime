<template>
  <div class="container navbar-expand-md p-0 ">
    <div class="collapse navbar-collapse " id="navbarNav" >
      <div class="accordion w-100 list-group border-white border-light " id="sidebarList">
        <router-link to="/pinList" class=" list-group-item h5 mb-0  bg-primary text-light border" @click="collapse"  type="button">
          釘選列表
        </router-link>
        <div class=" list-group-item h5 mb-0 bg-warning text-dark border">
          地區
        </div>
        <div class="list-group-item bg-primary text-light border-white pl-0 pr-0" id="headingOne" v-for="(item, location) in location" :key="location">
          <div class="h5 mb-0 "  type="button" data-toggle="collapse" :data-target="`#side${location}`" aria-expanded="false" :aria-controls="item">
            {{item}}
          </div>
          <div :id="`side${location}`" class="collapse list-group border border-light" @click="collapse" aria-labelledby="headingOne" data-parent="#sidebarList">
            <router-link :to="`/${listItem}`" class="list-group-item list-group-item-action bg-info text-light border border-light" v-for="listItem in fishInLocation(item)" :key="listItem">
             {{listItem}}
             </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'sidebar',
  data: function() {
    return {
      data:[],
      location:[]      
    }
  },
  methods: {
    fishInLocation(location) {
      let fish = []; 
      this.data.forEach(item => {
        if(item.Location === location) {
          fish.push(item.Name);
        }        
      })
      return fish;
    },
    collapse() {
      if(document.documentElement.clientWidth <= 768 ) {
        this.$bus.$emit('collapse-click');
      }
    }
  },
  created() {
    this.$http.get( "https://sino980294.github.io/FF14-fish2.0/fish.json").then((response) => {
      this.data = response.data;           
      this.data.forEach(item => {
        if(this.location.indexOf(item.Location) === -1) {
          this.location.push(item.Location);        
        }      
      })
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scope lang="scss">


</style>
