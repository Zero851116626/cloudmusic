<template>
    <div class="recommend">
        <div class="banner">
            <div class="bannerwrap">
                <swiper :options="swiperOption" ref="mySwiper">
                    <swiper-slide v-for="(item) in banner">
                        <img :src="item.imageUrl" alt="">
                    </swiper-slide>
                </swiper>
            </div>
        </div>
        <div class="fout-item">
            <ul class="clearfix">
                <li><img src="./img/FM.jpg" alt=""></li>
                <li><img src="./img/dayrec.jpg" alt=""></li>
                <li><img src="./img/3.jpg" alt=""></li>
                <li><img src="./img/4.jpg" alt=""></li>
            </ul>
        </div>
        <div class="list recom-list">
            <h2>推荐歌单 <span>></span></h2>
            <div class="list-wrap">
                <ul class="clearfix" >
                    <router-link :to="{name:'musiclist',query:item.id}" v-for="(item) in recommendList">
                        <li>
                            <img :src="item.picUrl" alt="">
                            <p>{{item.name}}</p>
                        </li>
                    </router-link>
                </ul>
            </div>
        </div>
        <div class="list lastest">
            <h2>最新专辑 <span>></span></h2>
            <div class="list-wrap">
                <ul class="clearfix" >
                    <router-link :to="{name:'musiclist',query:item.id}" v-for="(item) in lastestMusic">
                        <li>
                            <img :src="item.picUrl" alt="">
                            <p>{{item.name}}</p>
                        </li>
                    </router-link>
                </ul>
            </div>
        </div>
        <div class="list broadcasting">
            <h2>热播电台 <span>></span></h2>
            <div class="list-wrap">
                <ul class="clearfix" >
                    <router-link :to="{name:'musiclist',query:item.id}" v-for="(item) in hostStation">
                        <li>
                            <img :src="item.picUrl" alt="">
                            <p>{{item.name}}</p>
                        </li>
                    </router-link>
                </ul>
            </div>
        </div>
        <div class="VIP"></div>
    </div>
</template>

<script>
    import 'swiper/dist/css/swiper.css'
    import {swiper, swiperSlide} from 'vue-awesome-swiper'
    export default {
        name: "index",
        data(){
            return {
                swiperOption:{
                    width:725,
                    height:283,
                    autoplay: true,
                    loop : true,
                },
                banner:[],
                recommendList:[],
                lastestMusic:[],
                hostStation:[],
            }
        },
        components:{
            swiper, swiperSlide
        },
        computed:{
            swiper(){
                return this.$refs.mySwiper.swiper
            }
        },
        mounted(){
            this.swiper.slideTo(3,1000,false)
        },
        beforeMount() {
            //请求banner资源
            {
                //目标地址的api
                let url = this.API.getBanner();
                this.axios.get(url)
                    .then((data)=>{
                        if(data.status === 200){
                            this.banner = data.data.banners;
                        }
                    })
            }
            //请求推荐列表资源
            {
                //目标地址的api
                let url = this.API.getRecommendList();
                this.axios.get(url)
                    .then((data)=>{
                        if(data.status === 200){
                            let show = data.data.result.slice(0,6);
                            this.recommendList = show;
                        }
                    })
            }
            //请求最新专辑
            {
                let url = this.API.getLastestMusic();
                this.axios.get(url)
                    .then((data)=>{
                        if(data.status === 200){
                            let show = data.data.albums.slice(0,6);
                            this.lastestMusic = show;
                        }
                    })
            }
            //请求电台
            {
                let url = this.API.getHostStation();
                this.axios.get(url)
                    .then((data)=>{
                        if(data.status === 200){
                            let show = data.data.result.slice(0,6);
                            this.hostStation = show;
                        }
                    })
            }
        }
    }
</script>

<style scoped lang="less">
    .clearfix:after{
        content:"";
        display:block;
        clear:both;
    }
    .recommend{
        margin-bottom:1rem;
        width:100%;
        .banner{
            position: relative;
            width:7.5rem;
            height:3.05rem;
            padding-top:0.1rem;
            background-image: linear-gradient( #e9483e 76%,#FFF 76%);
            .bannerwrap{
                width:7.25rem;
                height:2.83rem;
                position:absolute;
                left:50%;
                transform: translateX(-50%);
            }
            img{
                width:7.25rem;
                height:2.83rem;
            }
        }
        .fout-item{
            width:100%;
            height:2.09rem;
            background-color: yellow;
            border-bottom: 1px solid #ececec;
            ul{
                width:100%;
                height:100%;
                li{
                    float:left;
                    width:25%;
                    height:100%;
                    img{
                        width:100%;
                        height:100%;
                    }
                }
            }
        }
        .list{
            width:100%;
            height:8.18rem;
            background-color: #fff;
            padding:0.47rem 0.12rem 0;
            h2{
                font-size: 0.34rem;
                color:#000;
                margin-bottom: 0.28rem;
                span{
                    color:#a6a6a6;
                }
            }
            ul{
                width:100%;
                li{
                    float:left;
                    width:2.38rem;
                    height:3.25rem;
                    margin-bottom: 0.4rem;
                    &:nth-child(3n+2){
                        margin:0 0.06rem;
                    }
                    img{
                        width:100%;
                        height:2.35rem;
                    }
                    p{
                        margin-top:0.2rem;
                        font-size: 0.26rem;
                        overflow: hidden;
                        display: -webkit-box;
                        -webkit-line-clamp:2;
                        text-overflow: ellipsis;
                        -webkit-box-orient: vertical;
                    }
                }
            }
        }
    }
</style>
