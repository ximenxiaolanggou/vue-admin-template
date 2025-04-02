import type { RouteRecordRaw } from 'vue-router'
import type {Role} from "./role.ts";
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

    /**
     * 角色ID
     */
    roleIds?: number[];

    /**
     * 角色
     */
    roles?: Role[];

}

export interface UserProfile implements User {

    /**
     * 路由信息
     */
    routes: RouteRecordRaw[];
}
