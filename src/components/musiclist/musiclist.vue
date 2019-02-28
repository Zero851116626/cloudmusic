<template>
    <div class="musiclist">
        <div class="head">
            <span class="iconfont icon-guanbi " @click="goback"></span>
            <div class="aboutmusic">
                <p class="title">歌单</p>
                <p class="listdecoration">编辑推荐，浪费时间，听首慢歌</p>
            </div>
            <div class="searchandorthers">
                <span class="iconfont icon-sousuo "></span>
                <span class="iconfont icon-qita "></span>
            </div>
        
        </div>
        <div class="listinfo">
            <div class="picAndTitle">
                <div class="picture"><img :src="imgurl" alt=""></div>
                <div class="titleAndAuthor">
                    <h2>{{listTitle}}</h2>
                    <span class="circle"><img :src="creator.headimg" alt=""></span>
                    <span class="name">{{creator.nickname}}</span>
                    <span class="iconfont icon-arrow-right-copy "></span>
                </div>
            </div>
            <div class="items">
                <ul>
                    <li>
                        <span class="iconfont icon-weibiaoti-"></span>
                        <span class="num">{{someData.commentNum}}</span>
                    </li>
                    <li>
                        <span class="iconfont icon-fenxiang"></span>
                        <span class="num">{{someData.shareNum}}</span>
                    </li>
                    <li>
                        <span class="iconfont icon-xiazai"></span>
                        <span class="num">下载</span>
                    </li>
                    <li>
                        <span class="iconfont icon-duoxuankuang"></span>
                        <span class="num">多选</span>
                    </li>
                </ul>
            </div>
        </div>
        <div class="playlist">
            <div class="playAll">
                <span class="iconfont icon-bofang"></span>
                <span class="play">播放全部（共{{musicnum}}首）</span>
                <span class="collect">+收藏（{{subscribedCount}}）</span>
            </div>
            <ul class="list">
                <router-link :to="{name:'musicplay',query:item}" v-for="(item,index) in musicId ">
                    <li>
                        <span class="index">{{index+1}}</span>
                        <div class="song">
                            <p class="musicname">{{musicnameArr[index]}}</p>
                            <p class="singer">{{singernameArr[index]}}</p>
                        </div>
                        <div class="contral">
                            <span class="iconfont icon-bofang "></span>
                            <span class="iconfont icon-qita "></span>
                        </div>
                    </li>
                </router-link>
            
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        name: "musiclist",
        data(){
            return{
                imgurl:"",
                listTitle:"",
                userId:"",
                someData:{
                    commentNum:"",
                    shareNum:"",
                },
                //歌曲列表
                musicArr:[],
                musicId:[],
                musicnum:"",
                subscribedCount:"",
                musicnameArr:[],
                singernameArr:[],
                //歌单创建者信息
                creator:{
                    headimg:"",
                    nickname:"",
                    backgroundimg:"",
                },
            }
        },
        beforeMount(){
            {
                //获取歌单详情的api
                let u = this.API.getListDetails();
                //如果是主页进来的，一定有传参，如果是歌曲页返回的，不会有传参
                let url;
                if(typeof (this.$route.query)==="number"){
                    url = u+"?id="+this.$route.query;
                    //将当前歌单id保存
                    this.$store.state.currentlistId = this.$route.query;
                }else{
                    url = u+"?id="+this.$store.state.currentlistId;
                }
                this.axios.get(url)
                    .then((data)=>{
                        let listdetails = data.data.playlist;
                        //关于歌单提供者的信息
                        this.creator.headimg = listdetails.creator.avatarUrl;
                        this.creator.nickname = listdetails.creator.nickname;
                        this.creator.bankground = listdetails.creator.backgroundUrl;
                        
                        this.imgurl = listdetails.coverImgUrl;
                        this.listTitle = listdetails.name;
                        this.userId = listdetails.userId;
                        this.someData.commentNum = listdetails.commentCount;
                        this.someData.shareNum = listdetails.shareCount;
                        this.subscribedCount =this.dealcollectnum(listdetails.subscribedCount);
                        this.musicArr = data.data.privileges;
                        this.dealmusiclist(this.musicArr);
                    })
            }
        },
        methods:{
            dealmusiclist(arr){
                this.musicnum = arr.length;
                arr.forEach((v,i)=>{
                    
                    //获取歌曲详情的api
                    let u = this.API.getmusicDetails();
                    let url = u+"?ids="+v.id;
                    this.axios.get(url)
                        .then((data)=>{
                            let musicdetails =  data.data.songs[0];
                            this.musicnameArr.push(musicdetails.name);
                            this.musicId.push(musicdetails.id);
                            let tempsinger = null;
                            musicdetails.ar.forEach((v2,i2)=>{
                                i2===0?tempsinger =v2.name:tempsinger+=" / "+v2.name;
                            });
                            this.singernameArr.push(tempsinger);
                        })
                })
            },
            goback(){
                this.$router.go(-1);
            },
            dealcollectnum(num){
                let result;
                if(num>10000){
                    result = Math.floor(num/1000)/10+"万";
                }else{
                    result = num;
                }
                return result;
            },
        },
    }
</script>

<style scoped lang="less">
    @import "icon/iconfont.css";
.musiclist{
    width:100%;
    background-color: #EEE;
    .head{
        width:100%;
        padding:0 0.3rem;
        height:1rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .aboutmusic{
            width:4.50rem;
        }
        .searchandorthers{
            width:1.85rem;
            text-align: center;
            span{
                font-size: 0.54rem;
            }
        }
    }
    .listinfo{
        width:100%;
        padding:0 0.3rem;
        .picAndTitle{
            width: 100%;
            height:3.4rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .picture{
                width:2.65rem;
                height:2.65rem;
                img{
                    width:100%;
                    height:100%;
                }
            }
            .titleAndAuthor{
                width:3.8rem;
                height:2.65rem;
                h2{
                    font-size: 0.38rem;
                    margin-bottom: 0.4rem;
                }
                span{
                    vertical-align: middle;
                }
                .circle{
                    display: inline-block;
                    width:0.54rem;
                    height:0.54rem;
                    border-radius: 50%;
                    img{
                        width:100%;
                        height:100%;
                        border-radius: 50%;
                    }
                }
                .name{
                    font-size: 0.26rem;
                    color:rgba(207,207,207,.5);
                }
            }
        }
        .items{
            width:100%;
            height:1.28rem;
            ul{
                width:100%;
                height:100%;
                display: flex;
                justify-content: space-around;
                align-items: center;
                li{
                    width:25%;
                    height:100%;
                    line-height:0.64rem;
                    text-align: center;
                    .num{
                        display: block;
                        font-size: 0.2rem;
                    }
                    span{
                        font-size: 0.5rem;
                    }
                }
            }
        }
    }
    .playlist{
        width:100%;
        border-radius: 0.2rem 0.2rem 0 0;
        .playAll{
            width:100%;
            height:0.94rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .iconfont{
                font-size: 0.44rem;
                margin-left:0.3rem;
            }
            .play{
                font-size: 0.36rem;
            }
            .collect{
                width:2.69rem;
                height:100%;
                line-height:0.94rem;
                text-align: center;
                border-radius: 0 0.2rem 0 0;
                color:#FFF;
                background-color: #f75445;
                font-size: 0.3rem;
            }
        }
        .list{
            width:100%;
            padding:0 0.3rem;
            li{
                margin-top:0.2rem;
                width:100%;
                height:100%;
                border-top:1px solid #EEE;
                display: flex;
                justify-content: space-around;
                align-items: center;
                .index{
                    width:0.46rem;
                    height:0.46rem;
                    line-height:0.46rem;
                    text-align: center;
                }
                .song{
                    width:4.8rem;
                    height:0.8rem;
                    .musicname{
                        font-size: 0.34rem;
                        color:#000;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                    }
                    .singer{
                        font-size: 0.24rem;
                        color:rgba(0,0,0,.5);
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                    }
                }
                .contral{
                    width:1.25rem;
                    height:0.6rem;
                    span{
                        font-size: 0.5rem;
                    }
                }
            
            }
        }
    }
}
</style>
