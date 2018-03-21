import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from './login.vue';
import Register from './register.vue';

Vue.use(VueRouter);

export default new VueRouter({
    mode: 'hash',
    routes: [
        {
            path: '/login',
            component: Login
        },
        {
            path: '/reg',
            component: Register
        }
    ]
})
