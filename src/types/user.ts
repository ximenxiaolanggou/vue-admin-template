import type { RouteRecordRaw } from 'vue-router'
export interface User {
    /**
     * id
     */
    id: number;

    /**
     * 用户名
     */
    username: string ;

    /**
     * 性别
     */
    gender: string;

    /**
     * 手机
     */
    mobile: string;

    /**
     * 邮箱
     */
    mail: string;

    /**
     * 权限信息
     */
    permissions: string[];

}

export interface UserProfile implements User {

    /**
     * 路由信息
     */
    routes: RouteRecordRaw[];
}
