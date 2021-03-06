
import Vue from 'vue'
import App from './App'
import router from './router'
//引入axios
import axios from "axios";
Vue.prototype.axios = axios;
//引入定义api，并且挂载到Vue中
import API from "./api/index";
Vue.prototype.API = API;
//引入ui框架
// import MuseUI from 'muse-ui';
// import 'muse-ui/dist/muse-ui.css';

// Vue.use(MuseUI);
//引入store方法库
import store from "./store/store";


Vue.config.productionTip = false

new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>',
    store,
});
