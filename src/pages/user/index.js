import Vue from 'vue';
import router from './router';
import 'babel-polyfill';
import '@js/rem';
import { request } from 'common';
import * as Datas from 'api';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Login from './login.vue';


Vue.use(ElementUI);
new Vue({
    el: '#app',
    router,
    components:{
        Login
    }
});
