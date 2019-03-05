import Vue from 'vue'
import Router from 'vue-router'
import Index from "../components/index";
import Play from "../components/play/index";
import Video from "../components/video/index";
import Recommend from "../components/home/recommend/index";
import Friend from "../components/home/friend/index";
import Broadcasting from "../components/home/Broadcasting/index";
import Search from "../components/common/search";
import MusicPlay from "../components/musicplay/musicplay";
import Musiclist from "../components/musiclist/musiclist";
import Notfound from "../components/not/notfound";
import UserMusicList from "../components/play/usermusiclist";



Vue.use(Router);

export default new Router({
  routes: [
      {
          //登录页
          path: '/',
          name: 'index',
          component: Index,
          children:[
              {
                  //推荐，这是主要完成的路由
                  path:'/',
                  name:'recommend',
                  component:Recommend,
              },
              {
                  //朋友，暂时不做处理
                  path:'friend',
                  name:'friend',
                  component:Friend,
              },
              {
                  //电台，暂时不做处理
                  path:'broadcasting',
                  name:'broadcasting',
                  component:Broadcasting,
              },
              //子项
              {
                  //左边音乐页,暂时不做处理
                  path: '/play',
                  name: 'play',
                  component: Play,
              },
              {
                  //右边视频推荐页，暂时不做处理
                  path:'/video',
                  name:'video',
                  component:Video,
              },
          ],
      },
      {
          path:'/play/userlist',
          name:'userlist',
          component:UserMusicList,
      },
      {
          path:'/search',
          name:'search',
          component:Search,
      },
      {
          //歌单列表页
          path:"/musiclist",
          name:'musiclist',
          component:Musiclist,
          meta:{
              keepAlive:true,
          }
      },
      {
          path:'/musicplay',
          name:'musicplay',
          component:MusicPlay,
      },
      {
          //404
          path:'*',
          name:"notfound404",
          component:Notfound,
      }
  ]
})
