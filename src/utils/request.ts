import axios from 'axios'
import {ElMessage, ElNotification} from 'element-plus'
import useUserStore from '../store/modules/user'
import pinia from '../store'
import router from '../router'
import {tokenName, tokenValue} from "../contants/token.ts";

let userStore
//获取存储用户信息的仓库对象
//创建axios实例
const request = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_API,
    timeout: 5000,
})
//请求拦截器
request.interceptors.request.use((config) => {
    const token = localStorage.getItem(tokenValue)
    if (token) {
        config.headers['Authorization'] = `bearer ${token}`
    }
    return config
})
//响应拦截器
request.interceptors.response.use(
    (response) => {
        return response.data
    },
    (error) => {
        //处理网络错误
        let msg = ''
        const status = error.response?.status
        switch (status) {
            case 401:
                msg = 'token过期'
                break
            case 403:
                msg = '无权访问'
                break
            case 404:
                msg = '请求地址错误'
                break
            case 500:
                msg = error.response.data.msg
                break
            default:
                msg = '无网络'
        }
        ElNotification({
            title: 'Error',
            message: msg,
            type: 'error',
        })

        if(!status || status == 401) {
            if (!userStore) {
                userStore = useUserStore(pinia)
            }
            localStorage.clear()
            userStore.ResetUserInfo()
            router.push('/login')
        }
        return Promise.reject(error.response.data)
    },
)
export default request
