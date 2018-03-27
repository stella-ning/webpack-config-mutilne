export default {
    email: {
        required: '邮箱不能为空'
    },
    j_password: {
        required: '密码不能为空',
        min: (filed,[length]) => '密码不能低于6位'
    },
    paw: {
        required: '确认密码不能为空',
        min: (filed,[length]) => '确认密码不能低于6位',
        confirmed: (field, [confirmedField]) => ` 确认密码必须与密码一致`
    },
    tel:{
        isMobile:'电话格式不正确',
        max: (filed,[length]) => '电话不能超出11位'
    },
    j_username: {
        required: () => '姓名不能为空'
    }
}
