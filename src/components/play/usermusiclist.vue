<template>
    <div class="userMusicList">
        <div class="ablumname"><span class="back" @click="goback">←</span> <span>{{albumName}}</span> <span class="home" @click="goHome">首页</span></div>
        <ul>
            <router-link v-for="(item) of list" :to="{name:'musicplay',query:item.id}">
                <li>
                    <p class="title" >{{item.name}}</p>
                    <p class="singer" >{{item.singer}}</p>
                </li>
            </router-link>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "usermusiclist",
        data(){
            return{
                albumName:"",
                list:[],
            }
        },
        methods:{
            goback(){
                this.$router.go(-1);
            },
            goHome(){
                this.$router.push({path:'/'})
            },
        },
        mounted() {
            if(this.$route.query){
                //如果有参数，就将参数保存起来
                this.$store.state.userlistsave = this.$route.query.songs;
            }
            //如果没有参数，直接用保存起来的数据
            this.list = this.$store.state.userlistsave;
            this.albumName = this.$route.query.name;
        }
    }
</script>

<style scoped lang="less">
.userMusicList{
    width:100%;
    padding: 0.2rem 0.2rem;
    .ablumname{
        width:100%;
        height:0.6rem;
        line-height:0.6rem;
        font-size: 0.54rem;
        display:flex;
        justify-content: space-around;
        align-items: center;
        span{
            height:0.5rem;
        }
        .back{
            font-size: 0.28rem;
        }
        .home{
            font-size: 0.28rem;
        }
        
    }
    ul{
        width:100%;
        a{
            height:0.62rem;
            li{
                width:100%;
                height:0.62rem;
                margin-top:0.2rem;
                .title{
                    height:0.35rem;
                    line-height:0.35rem;
                    font-size: 0.3rem;
                }
                .singer{
                    height:0.25rem;
                    line-height:0.25rem;
                    font-size: 0.2rem;
                }
            }
        }
        
    }
}
</style>
