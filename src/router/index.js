//引入vue-router
import { createRouter, createWebHashHistory } from 'vue-router'
//ES6  import输入  export 输出
// 模块化 默认私有，如何被别人使用？
// 通过export 输出
// 如何使用
// export default 默认输出
import Index from '@/views/static/index.vue'
import LayoutAdmin from '@/layout/admin/index.vue'
//白名单
const whiteList = [
    "/",
    "/login"
]
import { useUserStore } from '../store/user'



import zkh from "../views/admin/zkhHomePage/zkhHomePage.vue"
import subjectManage from "../views/admin/subjectManage/subjectManage.vue"
import paperManage from "../views/admin/paperManage/paperManage.vue"
import copyRightManage from "../views/admin/copyRightManage/copyRightManage.vue"
import patentManage from "../views/admin/patentManage/patentManage.vue"

//路由表
const routes = [
    {
        path: '/',//访问路径 http://127.0.0.1:5173/cx/XfDGdOkjVo7deIxQjurcf8BEnNf 
        name: 'home', //命名路由
        component: Index,   //key:value  默认//页面组件 components 普通组件 页面组件和普通组件是一对多
    },
    {
        path: '/zkh',
        name: 'zkh',
        component: zkh,
        children: [
            {
                path: 'subjectManage',
                name: 'subjectManage',
                component: subjectManage
            },
            {
                path: 'copyRightManage',
                name: 'copyRightManage',
                component: copyRightManage
            },
            {
                path: 'paperManage',
                name: 'paperManage',
                component: paperManage
            },
            {
                path: 'patentManage',
                name: 'patentManage',
                component: patentManage
            },
        ]
    },

    {
        path: '/login',
        name: 'login',
        component: () => import('../views/static/login.vue')// 懒加载
    },
    {
        path: '/admin',
        name: 'admin',
        component: LayoutAdmin,
        children: [
            {
                path: '',
                name: 'admin-index',
                component: () => import('@/views/admin/index.vue')
            },
            {
                path: 'info',
                name: 'admin-info',
                component: () => import('@/views/admin/info.vue')
            },
            {
                path: 'logout',
                name: 'admin-logout',
                component: () => import('@/views/admin/logout.vue')
            }, {
                path: 'changepassword',
                name: 'admin-changepassword',
                component: () => import('@/views/admin/changepassword.vue')
            },
            {
                path: 'forgetpassword',
                name: 'admin-forgetpassword',
                component: () => import('@/views/admin/forgetpassword.vue')
            }

        ]
    },









    {
        path: '/:pathMatch(.*)*',
        name: '404',
        component: () => import('../views/404.vue')// 懒加载  
    },



]
const router = createRouter({
    //模式
    history: createWebHashHistory(),
    routes
})
//前置路由守卫
//用户状态 user.js
router.beforeEach((to, from, next) => {
    const userStore = useUserStore();

    if (whiteList.includes(to.path)) {
        next();
    }
    else {

        next();
        // if(userStore.token&&userStore.token.length>0){
        //     next()
        // }
        // else{
        //    next({name:"login"}) 
        // }

    }


})
export default router;