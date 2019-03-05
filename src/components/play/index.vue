<template>
    <div class="user">
        <div class="listTop">
            <p @click="createNewList">新建歌单+</p>
        </div>
        <div class="userList">
            <ul>
                <router-link v-for="(item,index) of path" :to="{name:'userlist',query:item}">
                    <li class="listItem" ><p>{{item.name}}</p><span @click="deleteList(index)">X</span></li>
                </router-link>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        name: "index",
        data(){
            return {
                //控制新建歌单的数量
                SW:true,
                //歌单名称
                name:"",
                //数据渲染格式
                path:[],
            }
        },
        methods:{
            createNewList(){
                if(!this.SW) return;
                this.SW = false;
                //首先创建DOM元素
                //选中ul
                let oUl = document.querySelector(".userList ul");
                let NodeLi = document.createElement("li");
                let style = {
                    width:"100%",
                    height:"0.6rem",
                    padding: "0 0.25rem",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                };
                NodeLi.innerHTML = `<input type="text"><span>√</span>`
                Object.assign(NodeLi.style,style);
                oUl.appendChild(NodeLi);
                this.confirm(oUl,NodeLi,style);
            },
            confirm(parentNode,node,css){
                let span = node.querySelector("span");
                let input = node.querySelector("input");
                span.onclick =()=>{
                    this.name = input.value;
                    //直接移除节点,更新数据
                    parentNode.removeChild(node);
                    console.log(node);
                    let t = new Date();
                    let id ="" + t.getFullYear() + this.dealdata(t.getMonth()+1) + this.dealdata(t.getDate()) + Math.floor(Math.random()*10000);
                    //构建一个对象格式
                    let json = {
                        id:id,
                        name:this.name,
                        songs:[],
                    };
                    this.path.push(json);
                    this.$store.state.userListinfo = this.path;
                    this.$store.dispatch("saveUserListinfo");
                    //新建歌单按钮打开
                    this.SW = true;
                }
            },
            dealdata(num){
                return num<10?num="0"+num:num;
            },
            deleteList(index){
                console.log(index);
                this.path.splice(index, 1);
                console.log(this.path);
                this.$store.state.userListinfo = this.path;
                this.$store.dispatch("deleteUserListinfo");
            },
        },
        mounted(){
            this.path = JSON.parse(window.localStorage.getItem("userList"))||this.$store.state.userListinfo;
        },
       
    }
</script>

<style scoped lang="less">
.user{
    width:7.5rem;
    .listTop{
        width:100%;
        height:0.8rem;
        p{
            width:100%;
            height:100%;
            line-height:0.8rem;
            padding-left:0.25rem;
        }
    }
    .userList{
        width: 100%;
        ul{
            width:100%;
            .listItem{
                width:100%;
                height:0.6rem;
                padding: 0 0.25rem;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
        }
    }
}
</style>
