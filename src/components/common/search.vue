<template>
    <div class="search">
        <div class="search-box">
            <span class="iconfont icon-houtui" @click="goback"></span>
            <input type="text" v-model="keywords"  class="searchContent">
            <span class="confirm" @click="keyWordsSearch">确认</span>
        </div>
        <div class="static" v-if="songname.length===0">
            <div class="singerSearch">
                <h2>按歌手搜索
                    <span class="iconfont icon-arrow-right-copy"></span>
                </h2>
                <div class="threeCircle">
                    <span class="circle1"></span>
                    <span class="circle2"></span>
                    <span class="circle3"></span>
                </div>
            </div>
            <div class="hotSearch">
                <h3>热门搜索</h3>
                <div class="items clearfix">
                    <span>起风了</span>
                    <span>以团之名</span>
                    <span>艾薇儿</span>
                </div>
            </div>
            <div class="history">
                <h3>历史搜索</h3>
                <div class="items clearfix">
                    <span>啦啦啦</span>
                </div>
            </div>
        </div>
        <div class="dynamic" v-else>
            <ul>
                <router-link :to="{name:'musicplay',query:musicId[index]}" v-for="(item,index) in songname">
                    <li>
                        <p class="title">{{item}}</p>
                        <p class="singger">{{singers[index]}}-{{album[index]}}</p>
                    </li>
                </router-link>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        name: "search",
        data(){
            return {
                keywords:"",
                songname:[],
                singers:[],
                album:[],
                musicId:[],
                
                //本地记录的 存储数组
                localstorerecord:[],
            }
        },
        methods:{
            goback(){
                this.$router.go(-1);
            },
            dealsinger(arr){
                let str;
                arr.forEach((v,i)=>{
                    i===0?str =v.name:str+=" / "+v.name;
                });
                return str;
            },
            keyWordsSearch(){
                if(!this.keywords) return;
                let u = this.API.Searchinfo(),
                    keywords = this.keywords,
                    url = u + "?keywords=" + keywords;
                this.axios.get(url)
                    .then((data)=>{
                        let songArr = data.data.result.songs;
                        songArr.forEach((v,i)=>{
                            this.songname.push(v.name);
                            let singername = this.dealsinger(v.artists);
                            this.singers.push(singername)
                            this.album.push(v.album.name);
                            this.musicId.push(v.id);
                        })
                    })
                this.localstorerecord.push(""+keywords);
                this.saveSearchList(this.localstorerecord);
            },
            //保存搜索记录
            saveSearchList(record){
                //点一次确定，保存一次keywords,保存在本地应该更好
                this.$store.dispatch("addKeyWordsRecord",record)
            },
            getlocalStore(){
                this.$store.dispatch("getKeyWordsRecord")
            }
        },
        mounted() {
            this.getlocalStore();
        }
    }
</script>

<style scoped lang="less">
    @import "./icon/searchicon/iconfont.css";
.clearfix:after{
    display: block;
    content:"";
    clear:both;
}
.search{
    width:7.5rem;
    height:100vh;
    background: #FFF;
    .search-box{
        width:100%;
        height:1.08rem;
        padding:0 0.2rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: #e04438;
        .iconfont{
            height:0.6rem;
            font-size: 0.5rem;
            color:#FFF;
            vertical-align: center;
        }
        .searchContent{
            width:6.10rem;
            height:0.7rem;
            text-indent: 0.1rem;
            color:#EEE;
            border:none;
            border-bottom: 0.01rem solid #eb9189;
            background-color: #e04438;
        }
        .confirm{
            display:block;
            width:0.6rem;
            height:0.3rem;
            font-size: 0.28rem;
            color:#FFF;
        }
    }
    .static{
        .singerSearch{
            position: relative;
            width:100%;
            height:1.08rem;
            padding:0  0.25rem;
            border-bottom: 1px solid #EEE;
            h2{
                position: absolute;
                top:50%;
                left:0.2rem;
                transform: translateY(-50%);
                width:1.80rem;
                height:0.58rem;
                font-size: 0.36rem;
            }
            .iconfont{
                position:absolute;
                top:50%;
                left:2rem;
                transform: translateY(-50%);
            }
            .threeCircle{
                position:absolute;
                top:50%;
                left:6.04rem;
                transform: translateY(-50%);
                width:1.45rem;
                height:0.46rem;
                span{
                    position:absolute;
                    top:50%;
                    transform: translateY(-50%);
                    display: block;
                    width:0.46rem;
                    height:0.46rem;
                    border-radius: 50%;
                }
                .circle1{
                    left:0;
                    border:1px solid skyblue;
                }
                .circle2{
                    left:0.36rem;
                    border:1px solid yellow;
                }
                .circle3{
                    left:0.72rem;
                    border:1px solid red;
                }
            }
        }
        .hotSearch{
            width:100%;
            padding:0 0.25rem;
        }
        .history{
            width:100%;
            padding:0 0.25rem;
        }
        h3{
            height:0.54rem;
            margin-top:0.36rem;
            font-size: 0.26rem;
        }
        .items{
            width:100%;
            span{
                float:left;
                height:0.62rem;
                line-height:0.62rem;
                margin-right:0.2rem;
                padding:0 0.2rem;
                text-align: center;
                border-radius: 0.26rem;
                background-color: #DDD;
            }
        }
    }
    .dynamic{
        width: 100%;
        height:1.20rem;
        ul{
            width:100%;
            height:100%;
            li{
                width:100%;
                height:100%;
                padding:0.22rem 0.25rem;
                border-bottom:1px solid #EEE;
                .title{
                    font-size: 0.3rem;
                }
                .singer{
                    font-size: 0.24rem;
                }
            }
        }
    }
   
}
</style>
