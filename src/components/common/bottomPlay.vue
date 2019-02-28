<template>
    <router-link :to="{name:'musicplay'}">
        <div class="bottomPlay">
            <div class="pic"><img :src="musicPic" alt=""></div>
            <div class="details">
                <p class="title">{{musicName}}</p>
                <p class="singer">{{musicSinger}}</p>
            </div>
            <div class="btns">
                <span class="iconfont icon-bofang"></span>
                <span class="iconfont icon-liebiao"></span>
            </div>
        </div>
    </router-link>
</template>

<script>
    //底部组件，完全是根据store中的id来的
    export default {
        name: "bottomPlay",
        data(){
            return{
                musicName:"",
                musicSinger:"",
                musicPic:"",
                musicID:"",
            }
        },
        beforeMount() {
            let path = this.$store.state.currentSongSource
            console.log(this.$store.state.currentSongSource);
            this.musicName = path.musicName;
            this.musicSinger = path.musicSinger;
            this.musicPic = path.musicpic;
            this.musicID = this.$store.state.currentSongId;
            console.log(path.musicID)
        },
        methods:{
            addAudio(){
                let audio = document.createElement("audio");
                audio.src = this.$store.state.currentSongUrl;
                audio.onload = function(){
                    audio.currentTime = this.$store.state.currentTime;
                }
            }
        }
        
    }
</script>

<style scoped lang="less">
    @import "./icon/bottomicon/iconfont.css";
.bottomPlay{
    position:fixed;
    bottom:0;
    left:0;
    width:7.5rem;
    height:1.03rem;
    background-color: #FFF;
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding:0 0.12rem;
    z-index: 10;
    .pic{
        width:0.8rem;
        height:0.8rem;
        img{
            width:0.8rem;
            height:0.8rem;
            border-radius:0.1rem;
        }
    }
    .details{
        width:4.9rem;
        padding:0.18rem 0;
        margin-left:0.2rem;
        color:#484848;
        .title{
            font-size: 0.28rem;
        }
        .singer{
            font-size: 0.2rem;
        }
    }
    .btns{
        width:1.6rem;
        height:1.03rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        span{
            font-size: 0.6rem;
        }
    }
}
</style>
