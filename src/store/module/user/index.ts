// 引入defineStore用于创建store
import {defineStore} from 'pinia';
import type {User} from "../../../types/User.ts";
import {constantRoutes, dynamiRoutes} from '../../../router/routes.ts'


// 定义并暴露一个store
const useUserStore = defineStore('user',{
    // 状态
    state: ():User=>{
        return {
            id: null,
            nickname: null,
            avatar: null,
            menuRoutes: [...dynamiRoutes, ...constantRoutes],
            permissions: [],
        }
    },
    // 动作
    actions:{
        // 登录
        Login: function (code: string)  {
            return new Promise(async (resolve, reject) => {
                try {
                    const res = await login(code);
                    resolve(res.data)
                }catch(err) {
                    reject()
                }
            })
        },

        // 用户信息
        UserInfo: async function () {
            const res = await userInfo()
            this.id = res.data.id
            this.nickname = res.data.nickname
            this.avatar = res.data.headimgurl
        }
    },
    // 计算
    getters:{}
})

export default useUserStore
