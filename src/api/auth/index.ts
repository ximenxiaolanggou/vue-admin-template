import request from '../../utils/request.ts'
import {Response} from "../../types/Common.ts";
import {User} from "../../types/User";

export enum API {
    LOGIN_URL = '/system/auth/wxLogin',
    USERINFO_URL = '/system/auth/userInfo',
    LOGOUT_URL = '/system/auth/logout',
}

// /**
//  * 登录接口
//  * @param data
//  */
// export const login = (code: string) => request.get<any, Response<string>>(API.LOGIN_URL, {params : {code}})
//
// /**
//  * 用户信息
//  */
// export const userInfo = () => request.get<any, Response<User>>(API.USERINFO_URL)
//
// /**
//  * 登出
//  */
// export const logout =() => request.delete<any, Response<String>>(API.LOGOUT_URL)
