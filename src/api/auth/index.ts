import request from '../../utils/request.ts'
import type {Response} from "../../types/Common.ts";
import type {LoginInfo, TokenInfo} from "../../types/auth.ts";
import type {User} from "../../types/user.ts";
import {SOURCE} from "../../contants/commonconst.ts";

export enum API {
    LOGIN = '/auth/login',
    USERINFO = '/auth/userInfo',
    LOGOUT = `/auth/logout/${SOURCE}`,
    UPDATE_PERSONAL_INFO = '/auth/personalInfo',
    UPDATE_PWD = '/auth/updatePwd',
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

/**
 * 更新个人信息
 */
export const personalInfoAPI = (data: {username:string, gender: 1 | 2}) => request.put<any, Response<void>>(API.UPDATE_PERSONAL_INFO, data)

/**
 * 更新密码
 */
export const updatePwdAPI = (data: {oldPwd:string, newPwd:string}) => request.put<any, Response<void>>(API.UPDATE_PWD, data)
