// 引入defineStore用于创建store
import {defineStore} from 'pinia';
import type {User, UserProfile} from "../../../types/user.ts";
import {constantRoutes, dynamicRoutes} from '../../../router/routes.ts'
import {userInfo} from "../../../api/auth";
import _ from 'lodash'
import router from "../../../router";

// 定义并暴露一个store
const useUserStore = defineStore('user',{
    // 状态
    state: ():UserProfile=>{
        return {
            id: undefined,
            username: '',
            gender: undefined,
            mobile: '',
            mail: '',
            avatar: '',
            permissions: [],
            routes: [],
        }
    },
    // 动作
    actions:{
         UserInfo (){
            return new Promise(async resolve => {
                const res = await userInfo();
                this.id = res.data.id
                this.username = res.data.username
                this.gender = res.data.gender
                this.mobile = res.data.mobile
                this.mail = res.data.mail
                this.permissions = res.data.permissions
                this.avatar = res.data.avatar && `${import.meta.env.VITE_APP_STATIC_API}/avatars/${res.data.avatar}`
                //设置路由信息
                if(this.permissions && this.permissions.length > 0){
                    // 深拷贝，每次传递都是全量路由信息，原因：如果一个用户登出后，登录另外一个用户，并且这用户权限和上一个用户不同，那么权限过滤是基于上一次的
                    // 追根节点是filter如果是应用类型的元素，则不是深拷贝
                    // 并且这里不能JSON.parse(JSON.stringify(dynamicRoutes)，因为JSON无法处理函数序列化
                    const filterRoutes = filterAsyncRoutes(_.cloneDeep(dynamicRoutes), this.permissions)
                    // 保存到store中
                    this.routes = [...constantRoutes, ...filterRoutes]
                    // 清空路由
                    router.getRoutes().forEach(route => {
                        router.removeRoute(route.name);
                    })
                    // 添加新路由
                    for (const route of this.routes) {
                        router.addRoute(route)
                    }
                }
                resolve(res.data)
            })
        },
        ResetUserInfo (){
           return new Promise((resolve, reject) => {
               this.id = undefined
               this.username = ''
               this.gender = undefined
               this.mobile = ''
               this.mail = ''
               this.permissions = []
               this.routes = []
               // 清空路由
               router.getRoutes().forEach(route => {
                   router.removeRoute(route.name);
               })
               // 添加常规路由
               constantRoutes.forEach(route => {
                   router.addRoute(route)
               })
               resolve(true)
           })
        },
        UpdateUserAvatar(avatar:string) {
             return new Promise(async resolve => {
                 this.avatar = avatar
                 resolve(true)
             })
        }
    },
    // 计算
    getters:{}
})

/**
 * 生成路由信息
 */
const filterAsyncRoutes = (routes, permissions) => {
   return routes.filter(route => {
        // 判断是否具有权限 不写permission默认为拥有权限，如果有需要校验
        if(hasPermission(route,permissions)) {
            // 判断children
            if(route.children) {
                route.children = filterAsyncRoutes(route.children, permissions)
            }
            return true;
        }
        return false;
    })
}

/**
 * 判断路由是否有权限
 * @param route
 */
const hasPermission = (route,permissions) => {
    const routePermissions = route.meta && route.meta.permissions
    if(routePermissions) {
        for (let i = 0; i < routePermissions.length; i++) {
            if(!permissions.includes(routePermissions[i])) {
                return false;
            }
        }
    }
    return true;
}


export default useUserStore
