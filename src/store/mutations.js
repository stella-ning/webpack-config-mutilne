import {
    RECORD_USERINFO
} from './types';

import {setStore,getStore} from '@js/config';


import getters from './getters';



export default{
    // 记录用户信息
    [RECORD_USERINFO](state, info) {
        state.userInfo = info;
        state.login = true;
        setStore('user_id',info.uid);
        setStore('user_code', info.companyCode);
    },
};
