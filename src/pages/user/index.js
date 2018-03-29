import Vue from 'vue';
import router from './router';
//import 'babel-polyfill';
import '@js/rem';
import { request } from 'common';
import * as Datas from 'api';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import store from 'src/store/';
import Login from './login.vue';
import VeeValidate,{Validator} from 'vee-validate';//导入vee-validate
import messages from 'src/static/js/zh_CN';  //自定义的message
import custom from 'src/static/js/custom';   //自定义的属性message
import VueI18n from 'vue-i18n';//国际化文件

Vue.use(VueI18n);
Vue.use(ElementUI);
Vue.use(VeeValidate,config);

//定义字典
const dictionary = {
    zh_CN: {
        /*
        *   自定义统一的消息提示
        * */
        messages:messages,
        /*
        *   自定义字段
        * */
        custom:custom
    },

};

//自定义验证规则
Validator.extend('isMobile', {
    getMessage: field =>  '必须是有效的手机号码',
    validate: value => /^((13|14|15|17|18)[0-9]{1}\d{8})$/.test(value)
});

// 2.0.0之后，引入了国际化文件，想要中文须定义i18n国际化对象

const i18n = new VueI18n({
    locale: 'zh_CN'
});

//定义配置文件
const config =  {
    i18n:i18n,
    i18nRootKey: 'validation',
    dictionary:dictionary
};

new Vue({
    el: '#app',
    router,
    store,
    components:{
        Login
    }
});
