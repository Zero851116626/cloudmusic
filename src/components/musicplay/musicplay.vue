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
            <div class="playbody"  @click="toggleLyricAndCircle">
                <div class="circle" v-show="imageOrLyric">
                    <img :src="musicpic" alt="" class="circleImg">
                </div>
                <div class="lyric" v-show="!imageOrLyric" >
                    <ul>
                    </ul>
                </div>
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
                </div>
                <div class="musiccontral">
                    <div class="model">
                        <span class="iconfont icon-icon--"></span>
                    </div>
                    <div class="last">
                        <span class="iconfont icon-shangyiqu101"></span>
                    </div>
                    <div class="pauseOrPlay">
                        <span class="iconfont icon-bofang" @click="changePlayStatus"></span>
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
                musicname:"",
                singer:"",
                musicpic:"",
                
                //时间
                //用在span中显示的
                alltime:"",
                //当前时间
                currenttime:"00:00",
                //进度条进度
                radio:0,
                //用在进度条中计算的
                numALLTime:0,
                
                //控制歌词或者图片的变量
                imageOrLyric:true,
                currentMusicLyric:"",
                //circle
                deg:"",
                time:"",
            }
        },
        methods:{
            toggleLyricAndCircle(){
                this.imageOrLyric = !this.imageOrLyric;
                //每次点击之后，需要重新转圈圈
                this.circle();
            },
            circle(){
                if (this.imageOrLyric) {
                    clearInterval(this.timer);
                    let circle = document.getElementsByClassName("circleImg")[0];
                    //处理爱的魔力转圈圈
                    this.timer = setInterval(() => {
                        this.deg = (++this.deg) % 360;
                        circle.style.transform = `rotate(${this.deg}deg)`
                    }, 60);
                }
            },
            //做编程导航
            goback(){
                this.$router.go(-1);
            },
            //获取歌词
            getLyric(){
                let u = this.API.getMusicLyric(),
                    url = u + "?id=" +this.$route.query;
                this.axios.get(url)
                    .then((data)=>{
                        this.currentMusicLyric = data.data.lrc.lyric;
                        this.dealLyric();
                    })
            },
            //分割歌词，并且添加歌词到页面
            dealLyric(){
                //用来存放歌词的变量
                let lyrics = "";
                //先换行
                let lyricArr = this.currentMusicLyric.split(/\n/);
                console.log(lyricArr);
                //上一次的时间
                let lastTime = 0;
                //时间差
                let dt = [];
                lyricArr.forEach((v)=>{
                    //处理歌词前的时间
                    if(typeof v === null)  return;
                    let timetab = new RegExp(/\d{2}:\d{2}.\d{0,}/g)
                    if(!v.match(timetab)) return;
                    let curTime = Number.parseInt(v.match(timetab)["0"].split(":"));
                    //处理curTime的后半段
                    let second = Number.parseFloat(v.match(timetab)["0"].split(":")[1].slice(0,5));
                    let newTime = curTime*60 + second;
                    //保存时间差
                    dt.push(newTime-lastTime);
                    lastTime = newTime;
    
                    //处理歌词
                    let lyric = "";
                    let length = v.match(timetab)["0"].split(":")[1].length;
                    //因为歌词时间牌长度不一样，所以做一下兼容处理吧
                    console.log(length);
                    if(length === 5){
                        lyric = v.slice(10,v.length)
                    }else {
                        lyric = v.slice(11,v.length);
                    }
                    
                    let li = `<li style="height:0.35rem; line-height:0.35rem;color:rgba(207,207,207,.5);text-align: center">${lyric}</li>`;
                    lyrics += li;
                });
                //为歌词制作一个初始位置
                let wrap = document.querySelector(".playbody .lyric ul");
                wrap.innerHTML =lyrics;
                wrap.style.top = "240px";
                
                //调用歌词行高变化方法
                let fixedHeight = 0.17*100;
                this.setScrollHeight(wrap,240,fixedHeight,dt)
            },
            addProgressInfo(){
                this.alltime = this.$store.state.alltime;
                setInterval(()=>{
                    this.currenttime = this.$store.state.currenttime;
                },500)
                
                this.radio = this.$store.state.radio;
                this.numALLTime = this.$store.state.numALLTime;
            },
            setScrollHeight(Node,startHeight,fixedHeight,time){
                let timer;
                let index = 1;
                let lis = document.querySelectorAll(".playbody .lyric ul li");
                let that = this;
                function scroll(){
                    //暂停状态
                    if(!that.$store.state.shouldPlay){
                        //如果状态为false，就清除定时器，也就暂停了歌词的滚动
                        //然后不断检测shouldPlay的状态
                        let timer2 = setInterval(()=>{
                            if(that.$store.state.shouldPlay){
                                clearInterval(timer2);
                                lis[index-2].style.color = "rgba(207,207,207,.5)";
                                timer = setTimeout(scroll,time[index]*1000);
                            }
                        },500);
                    }else{
                        //正常播放状态
                        startHeight = startHeight -fixedHeight;
                        Node.style.top = startHeight + "px";
                        if(index>1){
                            lis[index-1].style.color = "#FFF";
                            lis[index-2].style.color = "rgba(207,207,207,.5)";
                        }
                        timer = setTimeout(scroll,time[index]*1000);
                        index++;
                    }
                }
                scroll();
            },
            
            //歌曲播放状态的改变
            changePlayStatus(){
                console.log("dispatch执行了");
                this.$store.dispatch("changePlayStatus");
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
                //获取当前歌曲详情
                let u = this.API.getmusicDetails();
                let url = u + "?ids=" + this.$store.state.currentSongId;
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
            this.circle();
            //一旦进入这个页面就代表可以播放了
            this.$store.state.shouldPlay = true;
            this.currenttime = this.$store.state.currenttime;
            this.getLyric();
        },
        beforeDestroy () {
            if (this.timer) clearInterval(this.timer);
           
        },
        updated:function() {
            this.$nextTick(function(){
                this.addProgressInfo();
            })
        }
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
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
                .singer{
                    height:50%;
                    font-size: 0.32rem;
                    color:rgba(255,255,255,.5);
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
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
                position:relative;
                width:100%;
                height:100%;
                padding:0.5rem 0 0.2rem;
                overflow: scroll;
                ul{
                    position:absolute;
                    width:100%;
                    height:100%;
                    top:0;
                    left:0;
                }
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
