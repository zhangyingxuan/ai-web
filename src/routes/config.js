import Loadable from 'react-loadable';
import customPageLoading from '../components/widget/customPageLoading'
//通用的过场组件
const loadingFuc = (loader)=>{
    return Loadable({
        loader,
        loading: customPageLoading
    })
}

export default {
    menus: [ // 菜单相关路由
        {id: 1, path: '/app/personflow', title: '人流监测', icon: 'user', component: loadingFuc(() => import('../views/personflow/index.js')), permissions: 'save;list;update'},
        {id: 2, path: '/app/edge', title: '边缘监测', icon: 'border-outer', component: loadingFuc(() => import('../views/edge/index.js')), permissions: 'save;list;update'},
        {id: 3, path: '/app/safety', title: '安全帽检测', icon: 'safety', component: loadingFuc(() => import('../views/safety/index.js')), permissions: 'save;list;update'},
        {id: 4, path: '/app/jobs', title: '岗位监测', icon: 'smile', component: loadingFuc(() => import('../views/jobs/index.js')), permissions: 'save;list;update'},
        {id: 5, path: '/app/car', title: '车牌检测', icon: 'car', component: loadingFuc(() => import('../views/car/index.js')), permissions: 'save;list;update'},
        // {
        //     id: 2,
        //     path: '/settings', title: '系统设置', icon: 'safety',permissions: 'save;list;update',
        //     subs: [
        //         {id: 3, path: '/app/settings/user', title: '用户管理', component: 'UserList',permissions: 'save;list;update'},
        //         {id: 4, path: '/app/settings/role', title: '角色管理', component: 'RoleList',permissions: 'save;list;update'},
        //         {id: 5, path: '/app/settings/menu', title: '菜单管理', component: 'MenuList',permissions: 'save;list;update'},
        //         {id: 6, path: '/app/settings/routerEnter', title: '路由拦截', component: 'RouterEnter', auth: 'auth/testPage', permissions: 'save;list;update'},
        //     ],
        // }
    ],
    others: [] // 非菜单相关路由
}
