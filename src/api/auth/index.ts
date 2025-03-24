import request from '../../utils/request.ts'
import type {Response} from "../../types/Common.ts";
import type {LoginInfo, TokenInfo} from "../../types/auth.ts";
import type {User} from "../../types/user.ts";
import {SOURCE} from "../../contants/commonconst.ts";

export enum API {
    LOGIN = '/auth/login',
    USERINFO = '/auth/userInfo',
    LOGOUT = `/auth/logout/${SOURCE}`,
}


/**
 * 登录接口
 * @param data
 */
export const login = (data: LoginInfo) => request.post<any, Response<TokenInfo>>(API.LOGIN, data)

/**
 * 用户信息
 */
export const userInfo = () => request.get<any, Response<User>>(API.USERINFO)

/**
 * 登出
 */
export const logout =() => request.delete<any, Response<void>>(API.LOGOUT)
