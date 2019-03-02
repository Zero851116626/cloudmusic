<template>
  <div id="app">
      <router-view/>
      <audio id="audio" :src="musicurl"  loop="loop"></audio>
  </div>
</template>

<script>
export default {
    name: 'App',
    data(){
        return {
            musicurl:"",
        }
    },
    methods:{
        getMusicUrl(){
            if(!this.$store.state.currentSongId) return;
            //获取当前歌曲url
            let u = this.API.getmusicUrl();
            let url = u + "?id=" + this.$store.state.currentSongId;
            this.axios.get(url)
                .then((data) => {
                    this.musicurl = data.data.data[0].url;
                })
        },
        isPlay(){
            let audio;
            //数据是异步获取的
            new Promise ((res)=>{
                this.getMusicUrl();
                res();
            })
                .then(()=>{
                    console.log(1);
                    audio = document.querySelector("#audio");
                    audio.autoplay = "autoplay";
                    this.dealprograss();
            })
        },
        dealtime( time ){
            //获取整分钟数
            let min = Number.parseInt(time/60);
            let sec = Number.parseInt(time - min*60);
            if(min<10){
                min = `0${min}`;
            }
            if(sec<10){
                sec = `0${sec}`;
            }
            return `${min}:${sec}`;
        },
        dealcurrenttime(){
            this.$store.state.currenttime = 0;
            let audio = document.querySelector("#audio");
            let currentTime = 0;
            let timer = setInterval(()=>{
                
                if( currentTime=== audio.duration){
                    currentTime = 0;
                    clearInterval(timer)
                }
                currentTime = audio.currentTime;
                let curTime = this.dealtime(currentTime);
                this.$store.state.currenttime = curTime;
                this.$store.state.radio = Number.parseInt(currentTime);
            },1000)
        },
        dealprograss(){
            //处理总时长的
            let audio = document.querySelector("#audio");
            audio.oncanplay = ()=>{
                this.$store.state.alltime = this.dealtime(audio.duration);
                this.$store.state.numALLTime = audio.duration;
            }
        },
    },
    mounted(){
        this.dealcurrenttime();
    },
    updated:function(){
        if(!this.$store.state.shouldPlay) return;
        this.$nextTick(function(){
            this.isPlay();
        })
    },
    
}
</script>

<style>
    html {
        font-family: Helvetica Neue, Tahoma, Arial, PingFangSC-Regular, Hiragino Sans GB, Microsoft Yahei, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        -webkit-text-size-adjust: 100%;
        text-size-adjust: none;
        color: #747474;
        -webkit-user-select: none;
        font-size: 13.33vw;
    }
    * {
        margin: 0;
        padding: 0;
        -webit-box-sizing: border-box;
        box-sizing: border-box;
    }
    a {
        text-decoration: none;
        color: rgba(0, 0, 0, 0.5);
    }
    img {
        vertical-align: top;
    }
    li {
        list-style: none;
    }
    #app{
        position: relative;
        width:7.5rem;
    }
</style>
