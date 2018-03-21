import 'babel-polyfill';
import Vue from 'vue';
import App from './App';
import router from './router/router.js';
import '@js/rem';

Vue.config.productionTip = false;
new Vue({
    el: '#index',
    router,
    components:{App},
    template:'<App/>'
});
