
import { Notification, Message } from 'element-ui';
import axios from 'axios';
import { PREFIX_PATH } from './config';

/**
 * 创建axios实例，封装公共headers请求头
 * @type {AxiosInstance}
 */

export const request = axios.create({
    baseURL: PREFIX_PATH,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
    }
});

/**
 * 重写get方法
 * axios在get请求下，请求参数需要写到第二个参数对象上的一个params属性上，
 * 通过重写，直接让get和post请求方式的传参方式一致，提高使用体验
 * @param {String} url 请求地址
 * @param {Object} params 请求参数
 */
const _get = request.get;

request.get = (url, params) => {
    // 这里做判断是为了兼容已经params对象传参的写法
    if ( params.params ) {
        return _get(url, params);
    }
    return _get(url, {
        params
    });
};

request.interceptors.request.use(config => {
    // 在get请求时，没有传参到body的方式，故去掉对应的headers
    if (config.method === 'get') {
        config.headers = {};
    }
    return config;
}, error => {
    return Promise.reject(error);
});

/**
 * 对返回的数据做拦截，直接返回接口的数据data，而不是axios实例对象
 */
request.interceptors.response.use(({ data, data: { code, message } }) => {
    // if (code !== 10000) {
    //     Message.error(message ? message : '服务器不在状态，请稍后再试');
    //     return data;
    // }
    return data;
}, (error => {
        Message.error('' + error);
        return Promise.reject(error);
    })
);

/**
 * 根据传进来的url解析参数的函数
 * @param {String} url
 * @description 根据传进来的url解析queryString
 */
export const resolveParams = (url = location.href) => {
    if (url.indexOf('#') > -1) {
        url = url.split('#')[0];
    }
    let params = {};
    let hash = url.split('?');
    let splits,
        key,
        val;

    if (hash.length > 1) {
        hash[1].split('&').forEach((el) => {
            splits = el.split('=');
            key = splits[0];
            val = splits[1];

            params[key] = val;
        });
    }
    return params;
};
