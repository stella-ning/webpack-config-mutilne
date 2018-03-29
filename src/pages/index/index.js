//import 'babel-polyfill';
import Vue from 'vue';
import App from './App';
import router from './router/router.js';
import '@js/rem';
import VueLazyLoad from 'vue-lazyload';
Vue.config.productionTip = false;

Vue.use(VueLazyLoad,{
    error:'../static/images/public/loading.gif',
    loading:'../static/images/public/loading.gif'
});

new Vue({
    el: '#index',
    router,
    components:{App},
    template:'<App/>'
});
