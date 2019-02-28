<template>
    <div class="musicplay">
            <div class="topNav">
                <div class="back" @click="goback">
                    <span class="iconfont icon-houtui"></span>
                </div>
                <div class="detail">
                    <p class="title">{{musicname}}</p>
                    <p class="singer">{{singer}}</p>
                </div>
                <div class="attention">
                    <span class="headpic"><img src="" alt=""></span>
                    <span class="text">关注</span>
                </div>
                <div class="share">
                    <span class="iconfont icon-fenxiang2"></span>
                </div>
            </div>
            <div class="playbody">
                <div class="circle">
                    <img :src="musicpic" alt="">
                </div>
                <div class="lyric"></div>
            </div>
            <div class="contral">
                <div class="items">
                    <ul>
                        <li><span class="iconfont icon-xihuan"></span></li>
                        <li><span class="iconfont icon-xiazai "></span></li>
                        <li><span class="iconfont icon-ziyuanldpi1"></span></li>
                        <li><span class="iconfont icon-weibiaoti- "></span></li>
                        <li><span class="iconfont icon-qita"></span></li>
                    </ul>
                </div>
                <div class="progress">
                    <span>{{currenttime}}</span>
                    <div class="progressbox" >
                        <mu-container>
                            <mu-flex class="demo-linear-progress">
                                <mu-linear-progress mode="determinate" :max="numALLTime" :value="radio"
                                                    color="rgba(207,207,207,.3)"></mu-linear-progress>
                            </mu-flex>
                        </mu-container>
                    </div>
                    <span>{{alltime}}</span>
                    <audio id="audio" :src="musicurl"  loop="loop" autoplay="autoplay"></audio>
                </div>
                <div class="musiccontral">
                    <div class="model">
                        <span class="iconfont icon-icon--"></span>
                    </div>
                    <div class="last">
                        <span class="iconfont icon-shangyiqu101"></span>
                    </div>
                    <div class="pauseOrPlay">
                        <span class="iconfont icon-bofang"></span>
                        <span class="iconfont icon-zanting"></span>
                    </div>
                    <div class="next">
                        <span class="iconfont icon-xiayiqu101"></span>
                    </div>
                    <div class="musiclist">
                        <span class="iconfont icon-liebiao"></span>
                    </div>
                </div>
            </div>
        </div>
</template>

<script>
    export default {
        name: "musicplay",
        data(){
            return {
                //整个页面渲染的所有依据
                id:"",
                linear: 10,
                //歌曲的连接
                musicurl:"",
                musicname:"",
                singer:"",
                musicpic:"",
                //时间
                alltime:"",
                currenttime:"00:00",
                radio:"",
                numALLTime:"",
            }
        },
        methods:{
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
                let currenttime = 0;
                let curTime;
                let timer = setInterval(()=>{
                    if(curTime === this.alltime){
                        clearInterval(timer)
                    }
                    currenttime++;
                    curTime = this.dealtime(currenttime);
                    this.currenttime = curTime;
                    this.radio = Number.parseInt(currenttime);
                },1000)
            },
            circle(){
                //处理爱的魔力转圈圈
                let circle = document.querySelector(".circle img")
                let deg = 0;
                setInterval(()=>{
                    deg = (++deg)%360;
                    circle.style.transform = `rotate(${deg}deg)`
                },60);
            },
            dealprograss(){
                let audio = document.querySelector("#audio");
                audio.oncanplay = ()=>{
                    let alltime = this.dealtime(audio.duration);
                    this.alltime = alltime;
                    this.dealcurrenttime();
                    this.numALLTime = audio.duration;
                }
            },
            //做编程导航
            goback(){
                this.$router.go(-1);
            },
        },
        created () {
            this.timer = setInterval(() => {
                this.linear += 10;
                if (this.linear > 100) this.linear = 0;
            }, 1000)
        },
        beforeMount(){
            //设置全局的当前音乐
            this.$store.state.currentSongId = this.$route.query;
            {
                //获取当前歌曲url
                let u = this.API.getmusicUrl();
                let url = u + "?id=" + this.$route.query;
                this.axios.get(url)
                    .then((data)=>{
                        this.musicurl = data.data.data[0].url;
                        this.$store.state.musicSongUrl = this.musicurl;
                    })
            }
            {
                //获取当前歌曲详情
                let u = this.API.getmusicDetails();
                let url = u + "?ids=" + this.$route.query;
                this.axios.get(url)
                    .then((data)=>{
                        let musicdetail = data.data.songs[0];
                        this.musicname = musicdetail.name;
                        this.singer = musicdetail.ar[0].name;
                        this.musicpic = musicdetail.al.picUrl;
                        //设置底部组件需要的内容
                        let path = {
                            musicpic:this.musicpic,
                            musicName:this.musicname,
                            musicSinger:this.singer,
                        };
                        //把path保存起来
                        this.$store.state.currentSongSource = path;
                    })
            }
            
        },
        mounted(){
            this.dealprograss();
            this.circle();
            
            
        },
        beforeDestroy () {
            if (this.timer) clearInterval(this.timer);
           
        },
    }
</script>

<style scoped lang="less">
    @import "./icon/iconfont.css";
    .demo-linear-progress {
        margin: 16px 0;
    }
    .musicplay{
        width:100%;
        height:100vh;
        padding:0 0.24rem 0.3rem;
        background: url("./img/playbg.jpg") no-repeat center/cover;
        .topNav{
            width:100%;
            height:1.02rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid rgba(204,204,204,.1);
            .back{
                width:0.6rem;
                height:0.6rem;
                span{
                    width:0.6rem;
                    height:0.6rem;
                    font-size: 0.56rem;
                    color:#FFF;
                }
            }
            .detail{
                width:4rem;
                height:1.02rem;
                .title{
                    height:50%;
                    font-size: 0.34rem;
                    color:#FFF;
                }
                .singer{
                    height:50%;
                    font-size: 0.32rem;
                    color:rgba(255,255,255,.5);
                }
            }
            .attention{
                position: relative;
                width:1.5rem;
                height:0.76rem;
                .headpic{
                    position: absolute;
                    top:0;
                    left:0;
                    display: block;
                    width:0.76rem;
                    height:0.76rem;
                    border-radius: 50%;
                    border:1px solid yellow;
                }
                .text{
                    position:absolute;
                    top:50%;
                    left:0.5rem;
                    transform: translateY(-50%);
                    width:0.92rem;
                    height:0.54rem;
                    border-radius: 0 40% 40% 0;
                    line-height:0.54rem;
                    text-align: right;
                    padding-right:0.1rem;
                    background-color: rgba(255,255,255,.2);
                }
                
            }
            .share{
                span{
                    font-size: 0.56rem;
                    color:#FFF;
                }
            }
        }
        .playbody{
            position:relative;
            width:100%;
            height:9.6rem;
            .circle{
                display: block;
                position:absolute;
                top:1.59rem;
                left:50%;
                transform: translateX(-50%);
                width:5rem;
                height:5rem;
                border-radius: 50%;
                background-color: yellow;
                img{
                    width:5rem;
                    height:5rem;
                    border-radius: 50%;
                }
            }
            .lyric{
                display: none;
                width:100%;
                height:100%;
                padding:0.5rem 0 0.2rem;
                background-color: skyblue;
            }
        }
        .contral{
            width:100%;
            .items{
                width:100%;
                height:0.9rem;
                ul{
                    width:100%;
                    height:100%;
                    padding:0 0.48rem;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    li{
                        position: relative;
                        width:20%;
                        height:100%;
                        span{
                            position: absolute;
                            top:50%;
                            left:50%;
                            transform: translate(-50%,-50%);
                            font-size: 0.48rem;
                            color:rgba(207,207,207,.5);
                        }
                    }
                }
            }
            .progress{
                width:100%;
                height:0.47rem;
                display: flex;
                justify-content: space-between;
                align-items: center;
                span{
                    color:rgba(207,207,207,.5);
                    font-size: 0.14rem;
                }
                .progressbox{
                    width:5.5rem;
                }
                
            }
            .musiccontral{
                width:100%;
                display: flex;
                justify-content: space-between;
                align-items: center;
                div{
                    span{
                        color:rgba(207,207,207,.6);
                    }
                }
                .model,.musiclist{
                    span{
                        font-size: 0.64rem;
                    }
                }
                .last,.next{
                    span{
                        font-size: 0.72rem;
                    }
                }
                .pauseOrPlay{
                    .icon-bofang{
                        font-size: 0.92rem;
                    }
                    .icon-zanting{
                        display: none;
                        font-size: 0.8rem;
                    }
                }
            }
        }
    }
</style>
