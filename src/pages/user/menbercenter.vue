<template>
    <div id="menberCenter">
        <Head-top head-title="会员登录" go-back="true"></Head-top>
        <router-link to='Login'>登录</router-link>
    </div>
</template>
<script>
    import HeadTop from 'src/common/header.vue';
    import Login from './login.vue';
    import {setStore,getStore} from '@js/config';
    export default {
        created(){
            console.log(this.$store.state.login);
            let user_id = getStore('user_id');
            console.log(user_id);
        },
        components:{
            HeadTop,
            Login
        },
        computed: {
            isLogin() {
                return this.$store.state.login;
            }
        },
    }

</script>

