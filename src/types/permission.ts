export interface Permission {
    /**
     * id
     */
    id: number;

    /**
     * 名称
     */
    name: string;

    /**
     * 标识
     */
    code: string;

    /**
     * 描述
     */
    description: string;

    /**
     * 权重
     */
    zindex: number;

    /**
     * 1 菜单 2 按钮 3 API
     */
    menu: 1 | 2;

    /**
     * 父节点
     */
    pid: number;

    /**
     * 子权限
     */
    children?: Permission[];

    /**
     * 创建时间
     */
    createtime: string;
}