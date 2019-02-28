<template>
    <div class="wrap">
        <div class="topNav">
            <span class="iconfont icon-liebiao "></span>
            <div class="middle">
                <router-link to="/play"><span class="iconfont icon-yinyue"></span></router-link>
                <router-link to="/"><span class="icon">logo</span></router-link>
                <router-link to="/video"><span class="iconfont icon-shipinbofangyingpian"></span></router-link>
            </div>
            <router-link to="/search"><span class="iconfont icon-sousuo"></span></router-link>
        </div>
        <div class="item">
            <span>推荐</span>
            <span>朋友</span>
            <span>电台</span>
        </div>
    </div>
    
</template>

<script>
    export default {
        name: "topNav"
    }
</script>

<style scoped lang="less">
    @import "./icon/iconfont.css";
    .wrap{
        position:fixed;
        top:0;
        left:0;
        width:7.5rem;
        height:1.83rem;
        display: flex;
        flex-wrap: wrap;
        z-index: 10;
        .topNav{
            width:100%;
            height:1.13rem;
            padding:0 0.25rem;
            background-color: #e9483e;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .middle{
                display: flex;
                justify-content: space-between;
                width:3rem;
                .icon{
                    line-height:0.65rem;
                    text-align: center;
                    font-size: 0.25rem;
                }
            }
            span{
                display: block;
                width:0.65rem;
                height:0.65rem;
                font-size: 0.62rem;
                color:#eb8e87;
            }
        }
        .item{
            width:100%;
            height:0.7rem;
            display: flex;
            justify-content: space-around;
            align-items: center;
            color:#eb8e87;
            font-size: 0.34rem;
            background-color: #e9483e;
        }
    }
    
    
</style>
