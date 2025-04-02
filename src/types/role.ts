import type {Permission} from "./permission.ts";

export interface Role {
    /**
     * id
     */
    id: number;

    /**
     * 名称
     */
    name: string;

    /**
     * 描述
     */
    description: string;

    /**
     * 权限id集合
     */
    permissionIds?: number[];

    /**
     * 权限集合
     */
    permissions?: Permission[];
}