import AdminLayout from '@/layout/admin/index.vue'

const constantRoutes = [

    {
        //Login
        path: '/login',
        name: 'login',
        component: () => import('@/views/login/index.vue'),
        meta: {
            title: '登录',
            hidden: true,
        },
    },
]


const dynamicRoutes = [

    {
        //Home
        path: '/',
        name: 'home',
        redirect: '/home',
        component: AdminLayout,
        meta: {
            title: '首页',
            icon: 'House',
            permissions: ['home']
        },
        children: [
            {
                path: '/home',
                name: 'home',
                component: () => import('@/views/home/index.vue'),
                meta: {
                    title: '首页',
                    icon: 'House',
                    permissions: ['home']
                },
            }
        ]
    },
    {
        //System
        path: '/system',
        name: 'system',
        redirect: '/system/user',
        component: AdminLayout,
        meta: {
            title: '系统管理',
            icon: 'Setting',
            permissions: ['system']
        },
        children: [
            {
                path: '/system/user',
                name: 'system-user',
                component: () => import('@/views/system/user/index.vue'),
                meta: {
                    title: '用户管理',
                    permissions: ['system-user']
                },
            },
            {
                path: '/system/role',
                name: 'system-role',
                component: () => import('@/views/system/role/index.vue'),
                meta: {
                    title: '角色管理',
                    permissions: ['system-role']
                },
            },
            {
                path: '/system/permission',
                name: 'system-permission',
                component: () => import('@/views/system/permission/index.vue'),
                meta: {
                    title: '权限管理',
                    permissions: ['system-permission']
                },
            }
        ]
    },

    {
        //404
        path: '/404',
        component: () => import('@/views/404/index.vue'),
        name: '404',
        meta: {
            title: '404',
            hidden: true,
        },
    },
    {
        //任意路由
        path: '/:pathMatch(.*)*',
        redirect: '/404',
        name: 'Any',
        meta: {
            title: '任意路由',
            hidden: true,
        },
    }
]

export {
    constantRoutes,
    dynamicRoutes
}