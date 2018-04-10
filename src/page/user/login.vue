<template>
    <div class="loginBox">
        <Head-top head-title="会员登录" go-back="true"></Head-top>
        <div class="loginContain">
            <form id="command" role="form"  method="post" @submit.prevent="submitForm" >
                <div class="username_row clearfix">
                    <span class="iconfont icon-guanbi f-left"></span>
                    <input class="username f-left" :class="{'input': true, 'is-fault': errors.has('j_username') }" id="username"
                        placeholder="请输入账号" name="j_username" type="text"
                        v-model="ruleForm.j_username" v-validate="{required:true}"
                        @blur="encryptname"
                    >
                    <span v-show="errors.has('j_username')" class="help is-danger">{{ errors.first('j_username') }}</span>
                </div>
                <div class="psw_row clearfix">
                    <span class="iconfont icon-mima f-left"></span>
                    <input class="password f-left" id="InputPassword" placeholder="请输入密码" :class="{'input': true, 'is-fault': errors.has('j_password') }"
                        name="j_password" type="password" v-model="ruleForm.j_password"
                        v-validate="{required:true}"
                        @keyup="encryptpwd"
                    >
                    <span class="eyes iconfont icon-eyeshover" @click="seePwd($event)"></span>
                    <span v-show="errors.has('j_password')" class="help is-danger">{{ errors.first('j_password') }}</span>
                </div>
                <div class="login_tis" id="resultLogin"></div>
                <div class="about_psw">
                    <label class="check-wrap f-left">
                        <span class="checkbox-inner-wrap">
                            <input type="checkbox" name="j_remember" id="j_remember" checked="checked">
                            <span class="checkbox-inner"></span>
                        </span>
                        <span>记住密码</span>
                    </label>
                    <a href="/setPassword/request">
                        <span class="forget_psw f-right" >忘记密码</span>
                    </a>
                </div>
                <div class="login_protocol">
                    <label class="check-wrap">
                        <span class="checkbox-inner-wrap">
                            <input type="checkbox" name="j_receive" id="j_receive" checked="checked" >
                            <span class="checkbox-inner"></span>
                        </span>
                        <span class="readed">阅读并接受
                            <a href="/search/mobileomsAgreement" style="color: #337cbb;">《OMS订单管理服务协议》</a>
                            <a href="/search/mobileelectricContract" style="color: #337cbb;">《交易合同》</a>
                            <a href="/search/mobileElectricTradeService" style="color: #337cbb;">《线上电子交易服务协议》</a>
                        </span>
                    </label>

                </div>
                <div style="margin-top:30px;">
                    <div style="margin:10px 15px;">
                        <button class="login active" type="submit">登录</button>
                    </div>
                </div>
                <div>
                    <input name="CSRFToken" value="ac5cdea9-b670-488d-81d1-cb9e53a236e9" type="hidden">
                </div>
            </form>
        </div>
    </div>
</template>
<style lang='less' scoped>

    .loginContain{
        width:auto;
        min-height: 200px;
        min-width:320px;
        max-width:640px;
        .username_row{
            margin-top: 0.4rem;
            margin-bottom: 0.2rem;
        }
        .username_row, .psw_row{
            margin-left: 0.3rem;
            margin-right: 0.3rem;
            position: relative;
            font-size:14px;
        }
        .iconfont{
            display: inline-block;
            border: 1px solid #e4e4e4;
            width: 0.8rem;
            height: 0.8rem;
            line-height:0.8rem;
            text-align: center;
            font-size:20px;
        }
        .username, .password{
            width: 87%;
            height: 0.8rem;
            padding-left: 0.2rem;
            -webkit-border-radius: 3px;
            -moz-border-radius: 3px;
            border-radius: 3px;
            border:1px solid #e4e4e4;
            border-left:none;

        }
        .check-wrap{
            font-size:0.28rem;
            color:#333;
        }
        .about_psw, .login_protocol{
            line-height: 0.6rem;
            margin-left: 0.3rem;
            margin-right: 0.3rem;
            position: relative;
        }
        .about_psw{
            height:0.6rem;
        }
        .eyes{
            position:absolute;
            top: 0;
            right: 0;
            width: 0.8rem;
            height: 0.8rem;
            text-align: center;
            line-height: 0.8rem;
            border:none;
        }
        .forget_psw{
            font-size:14px;
            color:#333;
        }
        .login{
            height: 0.8rem;
            line-height: 0.8rem;
            -webkit-border-radius: 2px;
            -moz-border-radius: 2px;
            text-align: center;
            color: #666;
            background: #ddd;
            border-radius: 2px;
            width: 100%;
            border: none;
            &.active{
                color: #fff;
                background: #004C97;
            }
        }
        .readed{
            padding-left:0.1rem;
            font-size:.28rem;
            color:#333;
            a{
                font-weight: normal;
            }
        }

    }
    .is-fault{
        color:#ff3a32;
        border:1px solid #ff3a32;
    }
    .is-danger{
        font-size:14px;
        color:#ff3a32;
    }

</style>

<script>
    import Vue from 'vue';
    import VeeValidate,{Validator} from 'vee-validate';//导入vee-validate
    import messages from 'src/static/js/zh_CN';  //自定义的message
    import custom from 'src/static/js/custom';   //自定义的属性message
    import VueI18n from 'vue-i18n';//国际化文件
    import axios from 'axios';
    import { request } from 'common';
    import * as Datas from 'api';
    import HeadTop from 'src/common/header.vue';
    import registerVue from './register.vue';
    import { Notification } from 'element-ui';
    import {mapState, mapMutations} from 'vuex';
import { setTimeout } from 'timers';

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
    Vue.use(VueI18n);
    const i18n = new VueI18n({
        locale: 'zh_CN'
    });

    //定义配置文件
    const config =  {
    i18n:i18n,
    i18nRootKey: 'validation',
    dictionary:dictionary
    }

    Vue.use(VeeValidate,config);

    export default {
        name: 'login',
        components:{
            HeadTop
        },
        data(){
            return{
                ruleForm: {
                    j_username: '',
                    j_password:'',
                    encryptUsername:'',
                    encryptPassword:''
                },
                userInfo:null

            }
        },
        methods:{
            ...mapMutations([
                'RECORD_USERINFO',
            ]),
            seePwd(event){
                let InputPassword = document.querySelector('#InputPassword'),
                    currentTargetDom = event.currentTarget;
                InputPassword.setAttribute('type','text');
                currentTargetDom.className = 'eyes iconfont icon-yanjing';
            },
            encryptname(){
                let _this = this;
                request.get(Datas.encrypt,{
                    'paramData':_this.ruleForm.j_username,
                    'type':'en'
                }).then((resultname) => {
                    console.log('用户名'+resultname.data)
                    if(resultname.status == 200){
                        _this.ruleForm.encryptUsername = resultname.data
                    }

                })
                .catch(function (error) {
                    if (error.response) {
                         // 请求已发出，但服务器响应的状态码不在 2xx 范围内
                        console.log('1'+error.response.data);
                        console.log('2'+error.response.status);
                        console.log('3'+error.response.headers);
                    } else {
                        // Something happened in setting up the request that triggered an Error
                         console.log('Error', error.message);
                    }
                    console.log(error.config);
                });
            },
            encryptpwd(){
                let _this = this;
                request.get(Datas.encrypt,{
                    'paramData':_this.ruleForm.j_password,
                    'type':'en'
                }).then((resultpwd) => {
                    if(resultpwd.status == 200){
                        _this.ruleForm.encryptPassword = resultpwd.data
                    }
                    console.log('已加密'+_this.ruleForm.encryptPassword)
                })
                .catch(function (error) {
                    console.log(error);
                });
            },
            submitForm() {
                let $this = this;
                $this.$validator.validateAll().then(function(success) {
                    if (!success) {
                        console.log("error");
                    }else{
                        console.log("success");
                        axios.create({
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/x-www-form-urlencoded',
                            }
                        });
                        axios.post(Datas.userLogin,'username='+$this.ruleForm.encryptUsername+'&password='+$this.ruleForm.encryptPassword)
                        .then((res)=>{
                            console.log('请求成功')
                            console.log(res)
                            //判断账号密码是否正确
                            if(res.data.status == 401){
                                Notification.error({
                                    message: res.data.message,
                                    type: 'error',
                                    duration:2000,
                                    offset:100
                                })
                            }else if(res.data.status == 200){
                                $this.userInfo = res.data.data;
                                $this.RECORD_USERINFO($this.userInfo);
                                //window.history.go(-1);
                                setTimeout(function(){
                                    $this.$router.go(-1);
                                },500)

                            }
                        })
                        .catch(function (error) {
                            console.log('请求失败')
                            if (error.response) {
                                // 请求已发出，但服务器响应的状态码不在 2xx 范围内
                                console.log('1'+error.response.data);
                                console.log('2'+error.response.status);
                                console.log('3'+error.response.headers);
                            } else {
                                // Something happened in setting up the request that triggered an Error
                                console.log('Error', error.message);
                            }
                            console.log(error.config);
                        });
                    }
                })

            }
        }
    }
</script>
