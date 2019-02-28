<template>
  <div class="wrap">
  <topNav />
  <div class="show">
      <router-view />
  </div>
  <bottomPlay v-show="currentSong" />
  </div>
</template>

<script>
//引入头部标签
import topNav from "./common/topNav";
//引入底部标签
import bottomPlay from "./common/bottomPlay"
export default {
    name: 'Index',
    data() {
        return {
            currentSong:"",
        }
    },
    beforeMount(){
        this.currentSong = this.$store.state.currentSongId;
    },
    components:{
        topNav,bottomPlay
    },
}
</script>

<style scoped>
    
    .wrap{
        width:100%;
        height:100%;
    }
    .show{
    width:7.5rem;
    position:relative;
    top:1.83rem;
    left:0;
}
</style>
