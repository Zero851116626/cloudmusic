import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);
// 创建方法仓库
const store = new Vuex.Store({
    state:{
        //当前播放的歌曲
        currentSongId:"",
        // currentSongPrograss:"",
        //这个是存放当前歌曲详情的
        currentSongSource:"",
        currentSongUrl:"",
        //音乐播放的当前位置
        currentTime:"",

        //当前歌单的id
        currentlistId:"",

    },
    computed:{
        currentSongId(){
            return this.state.currentSongId;
        },
        currentSongSource(){
            return this.state.currentSongSource;
        },
        currentSongUrl(){
            return this.state.currentSongUrl;
        },
        currentlistId(){
            return this.state.currentlistId;
        },

    },
    mutations:{
        //本地添加记录
        addKeyWordsRecord:(state,str)=>{
            window.localStorage.setItem("record",str)
        },
        //获取本地记录
        getKeyWordsRecord(){
            window.localStorage.getItem("record")
        },
        //本地删除记录
        removeKeyWordsRecord(str){
            window.localStorage.removeItem("record",str)
        },
    },
    actions:{
        //结构方法
        addKeyWordsRecord({commit},str){
            commit("addKeyWordsRecord",str)
        },
        //常规方法
        getKeyWordsRecord(context){
            context.commit("getKeyWordsRecord")
        },
        removeKeyWordsRecord(context){
            context.commit("removeKeyWordsRecord")
        },
    }

});

export default store;
