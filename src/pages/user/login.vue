<template>
    <div class="loginBox">
        <Head-top head-title="会员登录" go-back="true"></Head-top>
        <div class="login">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
                <el-form-item prop="name">
                    <el-input v-model="ruleForm.name" placeholder="请输入账号">
                        <template slot="prepend">
                            <span class="iconfont icon-huiyuanzhongxin"></span>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item prop="pass">
                    <el-input type="password" class="pwd" v-model="ruleForm.pass" auto-complete="off" placeholder="请输入密码">
                        <template slot="prepend">
                            <span class="iconfont icon-mima"></span>
                        </template>
                        <template slot="append" class="eyeIcon">
                            <span class="iconfont icon-eyeshover"></span>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item class="submitBtn-wraper">
                    <el-button class="submitBtn"  @click="submitForm('ruleForm')">登录</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<style lang='less' scoped>

    .login{
        width: 85%;
        margin: 25px auto;
        text-align: center;
        .el-button{
            width:100%;
            background:#ddd;
            color:#666;
        }
    }
</style>

<script>
    import Vue from 'vue';
    import { request } from 'common';
    import * as Datas from 'api';
    import HeadTop from 'src/common/header.vue';
    import ElementUI from 'element-ui';
    import 'element-ui/lib/theme-chalk/index.css';
    Vue.use(ElementUI);
    export default {
        name: 'login',
        components:{
            HeadTop
        },
        data(){
            let validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.ruleForm.checkPass !== '') {
                        this.$refs.ruleForm.validateField('checkPass');
                    }
                    callback();
                }
            };
            let validateName = (rule,value,callback) =>{
                if(value === ''){
                    callback(new Error('账号不能为空'))
                }else{
                    callback();
                }
            }
            return{
                ruleForm: {
                    name: '',
                    pass:'',
                    checkPass:'',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: ''
                },
                rules: {
                    name: [
                        {validator: validateName, trigger: 'blur' }
                    ],
                    pass: [
                        { validator: validatePass, trigger: 'blur' }
                    ],
                }
            }
        },
        methods:{
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                if (valid) {
                    alert('submit!');
                } else {
                    console.log('error submit!!');
                    return false;
                }
                });
            },
        }
    }
</script>
