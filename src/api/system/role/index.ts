import request from '../../../utils/request.ts'
import type {Response} from "../../types/Common.ts";
import type {Role} from "../../../types/role.ts";
import type {Page, PageCondition} from "../../../types/Common.ts";

export enum API {
    list = '/sysRole/list',
    page = '/sysRole/page',
    add = '/sysRole',
    update = '/sysRole',
    delete = '/sysRole',
    batchDelete = '/sysRole/batchDelete',
}


/**
 * 用户列表
 * @param data
 */
export const listAPI = (searchKey:string) =>
    request.get<any, Response<Role[]>>(API.list, {params: {searchKey}})

/**
 * 角色列表
 * @param data
 */
export const pageAPI = (searchCondition:Role, pageCodition: PageCondition) =>
    request.get<any, Response<Page<Role[]>>>(`${API.page}/${pageCodition.pageNumber}/${pageCodition.pageSize}`, {params: searchCondition})

/**
 * 添加角色
 * @param data
 */
export const addRoleAPI = (data:Role) => request.post<any, Response<void>>(API.add, data)


/**
 * 修改角色
 * @param data
 */
export const updateRoleAPI = (data: Role) => request.put<any, Response<void>>(`${API.update}/${data.id}`, data)


/**
 * 删除角色
 * @param id
 */
export const deleteRoleAPI = (id:number) => request.delete<any, Response<void>>(`${API.delete}/${id}`)

/**
 * 批量删除
 * @param ids
 */
export const batchDeleteRoleAPI = (ids:number[]) => request.delete<any, Response<void>>(API.batchDelete, {data: ids})