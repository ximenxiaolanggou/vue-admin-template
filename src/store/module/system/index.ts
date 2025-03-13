// 引入defineStore用于创建store
import {defineStore} from 'pinia'
import type {SystemConfiguration} from "../../../types/system.ts";

// 定义并暴露一个store
const useSystemConfigurationStore = defineStore('systemConfiguration',{
    // 状态
    state: ():SystemConfiguration=>{
        return {
            isCollapse: true,
            refresh: false
        }
    },
    // 动作
    actions:{
        /**
         * 切换菜单展开 | 闭合状态
         * @constructor
         */
        switchMenuExpandStatus: function ()  {
            this.isCollapse = !this.isCollapse;
        },

    },
    // 计算
    getters:{}
})

export default useSystemConfigurationStore
