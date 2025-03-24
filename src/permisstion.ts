//路由鉴权:鉴权,项目当中路由能不能被的权限的设置(某一个路由什么条件下可以访问、什么条件下不可以访问)
import router from '@/router'
import {tokenValue} from "./contants/token.ts";
//@ts-ignore
import nprogress from 'nprogress'
//引入进度条样式
import 'nprogress/nprogress.css'
nprogress.configure({ showSpinner: false })
//获取用户相关的小仓库内部token数据,去判断用户是否登录成功
import useUserStore from './store/modules/user'
import pinia from './store'
import {getFirstDynamicRoute} from "./utils/commonutil.ts";
const userStore = useUserStore(pinia)
const whiteList = ['/login']
//全局守卫:项目当中任意路由切换都会触发的钩子
//全局前置守卫
router.beforeEach(async (to: any, from: any, next: any) => {
  console.log('from', from)
  console.log('to', to)
  console.log('route1', router.getRoutes())
  debugger
  //to:你将要访问那个路由
  //from:你从来个路由而来
  //next:路由的放行函数
  nprogress.start()
  //获取token,去判断用户登录、还是未登录
  const token = localStorage.getItem(tokenValue)
  //用户登录判断
  if (token) {
    debugger
    // 判断是否有用户信息
    if(!userStore.id) {
      // 获取用户信息
      try {
        //获取用户信息
        await userStore.UserInfo()
        // 这里为什么有重复的getFirstDynamicRoute方法判断
        // 因为：万一刷新的时候是异步路由,有可能获取到用户信息、异步路由还没有加载完毕,出现空白的效果
        let firstDynamicRoute
        if(to.path == '/login' || to.path == '/') {
          firstDynamicRoute = getFirstDynamicRoute();
        }
        if(firstDynamicRoute) {
          console.log('firstDynamicRoute1',firstDynamicRoute)
          next({ path: firstDynamicRoute.path})
        }else {
          next({ ...to })
        }
      } catch (error) {
        //token过期:获取不到用户信息了
        //用户手动修改本地存储token
        //退出登录->用户相关的数据清空
        // await userStore.userLogout()
        localStorage.clear()
        next({ path: '/login', query: { redirect: to.path } })
      }
    }else {
      // 判断路由跳转 - 由于用户权限不同首页也不同，所以需要获取路由
      let firstDynamicRoute;
      if(to.path == '/login' || to.path == '/') {
        firstDynamicRoute = getFirstDynamicRoute();
        console.log('firstDynamicRoute2', firstDynamicRoute);
      }
      if(firstDynamicRoute) {
        next({ path: firstDynamicRoute.path})
      }else {
        next()
      }
    }

  } else {
    //用户未登录判断
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next({ path: '/login', query: { redirect: to.path } })
    }
  }
})
//全局后置守卫
router.afterEach((to: any, from: any) => {
  nprogress.done()
})

//第一个问题:任意路由切换实现进度条业务 ---nprogress
//第二个问题:路由鉴权(路由组件访问权限的设置)
//全部路由组件:登录|404|任意路由|首页|数据大屏|权限管理(三个子路由)|商品管理(四个子路由)

//用户未登录:可以访问login,其余六个路由不能访问(指向login)
//用户登录成功:不可以访问login[指向首页],其余的路由可以访问
