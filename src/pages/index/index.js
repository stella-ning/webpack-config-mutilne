//import 'babel-polyfill';
import Vue from 'vue';
import App from './App';
import router from './router/router.js';
import '@js/rem';
import VueLazyLoad from 'vue-lazyload';
import store from 'src/store/';
Vue.config.productionTip = false;

Vue.use(VueLazyLoad,{
    error:'../static/images/public/loading.gif',
    loading:'../static/images/public/loading.gif'
});

new Vue({
    el: '#index',
    router,
    store,
    components:{App},
    template:'<App/>'
});
