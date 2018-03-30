<template>
    <div id="menberCenter">
        <Head-top head-title="会员登录" go-back="true"></Head-top>
        <router-link to='Login'>登录</router-link>
    </div>
</template>
<script>
    import HeadTop from 'src/common/header.vue';
    import Login from './login.vue';
    export default {
        created(){
            console.log(this.$store.state.login)
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

