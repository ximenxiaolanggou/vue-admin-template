/**
 * 登录信息
 */
export interface LoginInfo {
    /**
     * 用户名
     */
    username: string;

    /**
     * 密码
     */
    password: string;

    /**
     * 登录源
     */
    source: string;
}

/**
 * 令牌信息
 */
export interface TokenInfo {
    /**
     * token 名称
     */
    tokenName: string;

    /**
     * token 值
     */
    tokenValue: string;

}