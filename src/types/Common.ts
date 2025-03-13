export interface Response<T> {
    /**
     * 状态
     */
    flag:boolean;

    /**
     * 提示消息
     */
    msg:string;

    /**
     * 状态码
     */
    code:number;

    /**
     * 数据
     */
    data:T;
}

export interface Page<T> {

    /**
     * 记录数
     */
    total:number;

    /**
     * 记录信息
     */
    data:T[]
}

export interface PageCondition {

    /**
     * 页码
     */
    pageNumber:number;

    /**
     * 页数
     */
    pageSize:number;
}