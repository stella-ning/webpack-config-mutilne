import {
    RECORD_USERINFO
} from './types';

import {setStore,getStore} from '@js/config';


import getters from './getters';
import { request } from 'common';
import * as Datas from 'api';


export default{
    // 记录用户信息
    [RECORD_USERINFO](state, info) {
        state.userInfo = info;
        state.login = true;
        let userId = '';
        request.get(Datas.encrypt,{
            'paramData':info.uid,
            'type':'en'
        }).then((resultpwd) => {
            if(resultpwd.status == 200){
                userId = resultpwd.data;
                setStore('user_id',userId);
            }
            //console.log('已加密'+userId);
        }).catch(function (error) {
            //console.log(error);
        });
        setStore('user_code', info.companyCode);
    },
};
