
import Vue from 'vue';
import 'babel-polyfill';
import router from './router';
import '@js/rem';
import { request } from 'common';
import * as Datas from 'api';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import store from 'src/store/';
import Login from './login.vue';


new Vue({
    el: '#app',
    router,
    store,
    components:{
        Login
    }
});

