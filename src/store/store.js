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

        //音乐显示总时长
        alltime:"",
        //进度条显示总时长
        numALLTime:"",
        //音乐播放的当前位置
        currenttime:"",
        //进度条比例
        radio:"",
        //当前音乐歌词的进度
        index:"",

        //当前歌单的id
        currentlistId:"",
        //搜索记录
        searchRecorde:"",
        //是否有音乐需要播放
        shouldPlay:false,

        //用户个人歌单列表
        userListinfo:[{
            id:201903050000,
            name:"我喜欢的",
            songs:[],
        }],
        //个人歌单参数保存
        userlistsave:"",
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
        searchRecorde(){
            return this.state.searchRecorde;
        },
        shouldPlay(){
            return this.state.shouldPlay;
        },
        alltime(){
            return this.state.alltime;
        },
        numALLTime(){
            return this.state.numALLTime;
        },
        currenttime(){
            return this.state.currenttime;
        },
        radio(){
            return this.state.radio;
        },
        index(){
            return this.state.index;
        },
        userListinfo(){
            return this.state.userListinfo;
        },
        userlistsave(){
            return this.state.userlistsave;
        },
    },
    mutations:{
        //mutation是用来管理数据的
        //本地添加记录
        addKeyWordsRecord:(state,str)=>{
            this.searchRecorde = [];
            this.searchRecorde.push(str);
            window.localStorage.setItem("record",str)
        },
        //本地删除记录
        removeKeyWordsRecord(){
            window.localStorage.removeItem("record")
        },
        //这个是更改播放状态的方法
        changePlayStatus(){
            this.state.shouldPlay = !this.state.shouldPlay;
        },
        //把歌单信息保存在本地
        saveUserListinfo(){
            console.log(this);
            window.localStorage.setItem("userList",JSON.stringify(this.state.userListinfo));
        },
        deleteUserListinfo(){
            window.localStorage.removeItem("userList");
            window.localStorage.setItem("userList",JSON.stringify(this.state.userListinfo));
        },
    },
    actions:{
        //解构方法
        addKeyWordsRecord({commit},str){
            commit("addKeyWordsRecord",str)
        },
        //常规方法
        getKeyWordsRecord(context){
            //action是用来触发mutations的
            context.commit("getKeyWordsRecord")
        },
        removeKeyWordsRecord(context){
            context.commit("removeKeyWordsRecord")
        },
        changePlayStatus({commit}){
            commit("changePlayStatus");
        },
        saveUserListinfo({commit}){
            commit("saveUserListinfo");
        },
        deleteUserListinfo({commit}){
            commit("deleteUserListinfo")
        },
    }

});

export default store;
