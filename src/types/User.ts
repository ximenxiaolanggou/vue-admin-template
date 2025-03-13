import type { RouteRecordRaw } from 'vue-router'
export interface User {
    /**
     * id
     */
    id: string;

    /**
     * 名称
     */
    nickname: string ;

    /**
     * 头像
     */
    avatar: string;

    /**
     * 微聊号
     */
    code: string;

    /**
     * 路由信息
     */
    menuRoutes: RouteRecordRaw[];

    /**
     * 权限信息
     */
    permissions: string[];

}
