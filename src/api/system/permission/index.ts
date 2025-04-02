import request from '../../../utils/request.ts'
import type {Response} from "../../types/Common.ts";
import type {Role} from "../../../types/role.ts";
import type {Page, PageCondition} from "../../../types/Common.ts";
import type {Permission} from "../../../types/permission.ts";

export enum API {
    permissionTree = '/sysPermission/permissionTree',
    add = '/sysPermission',
    update = '/sysPermission',
    delete = '/sysPermission',
    batchDelete = '/sysPermission/batchDelete',
}


/**
 * 用户列表
 * @param data
 */
export const permissionTreeAPI = () =>
    request.get<any, Response<Permission[]>>(API.permissionTree)

/**
 * 添加权限
 * @param data
 */
export const addPermissionAPI = (data:Permission) => request.post<any, Response<void>>(API.add, data)

/**
 * 修改权限
 * @param data
 */
export const updatePermissionAPI = (data: Permission) => request.put<any, Response<void>>(`${API.update}/${data.id}`, data)


/**
 * 删除权限
 * @param id
 */
export const deletePermissionAPI = (id:number) => request.delete<any, Response<void>>(`${API.delete}/${id}`)

/**
 * 批量删除
 * @param ids
 */
export const batchDeletePermissionAPI = (ids:number[]) => request.delete<any, Response<void>>(API.batchDelete, {data: ids})