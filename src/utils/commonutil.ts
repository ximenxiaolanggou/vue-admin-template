import {useRouter} from "vue-router";
import {dynamicRoutes} from "../router/routes.ts";
import router from "../router";

/**
 * 根据路由权限获取第一个动态路由
 */
export const getFirstDynamicRoute = () => {
    const routes = router.getRoutes();
    // 1、判断有没有根路由
    for (let i = 0; i < routes; i++) {
        if(routes[i].path == '/') {
            return routes[i];
        }
    }
    // 由于权限不同，路由信息页不同，可能存在没有"/"的路由,找出第一个动态路由
    let dynamicRoutePaths = dynamicRoutes.map(route => route.path)
    for (let i = 0; i < routes.length; i++) {
        if(dynamicRoutePaths.includes(routes[i].path)) {
            return routes[i];
        }
    }

    // 如果没后动态路由，直接404兜底路由
    for (let i = 0; i < routes; i++) {
        if(routes[i].path == '/404') {
            console.log('404执行了')
            return routes[i];
        }
    }
    return null;
}