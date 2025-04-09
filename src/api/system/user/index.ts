import request from '../../../utils/request.ts'
import type {Response} from "../../types/Common.ts";
import type {User} from "../../types/user.ts";
import type {Page, PageCondition} from "../../../types/Common.ts";

export enum API {
    page = '/sysUser/page',
    add = '/sysUser',
    update = '/sysUser',
    delete = '/sysUser',
    batchDelete = '/sysUser/batchDelete',
    uploadAvatar = '/sysUser/uploadAvatar',
    uploadAvatarURL = `${import.meta.env.VITE_APP_BASE_API}/sysUser/uploadAvatar`,
}


/**
 * 用户列表
 * @param data
 */
export const pageAPI = (data: User, pageCodition: PageCondition) =>
    request.get<any, Response<Page<User[]>>>(`${API.page}/${pageCodition.pageNumber}/${pageCodition.pageSize}`, {params: data})

/**
 * 添加用户
 */
export const addUserAPI = (data: User) => request.post<any, Response<void>>(API.add, data)

/**
 * 修改用户
 * @param id
 * @param data
 */
export const updateUserAPI = (data: User) => request.put<any, Response<void>>(`${API.update}/${data.id}`, data)

/**
 * 删除用户
 * @param id
 */
export const deleteUserAPI = (id:number) => request.delete<any, Response<void>>(`${API.delete}/${id}`)

/**
 * 批量删除
 * @param ids
 */
export const batchDeleteUserAPI = (ids:number[]) => request.delete<any, Response<void>>(API.batchDelete, {data: ids})

/**
 * 上传头像
 */
export const uploadAvatar = (formData: FormData) => request.post<any, Response<void>>(API.uploadAvatar,formData, {headers: { 'Content-Type': 'multipart/form-data' }} )