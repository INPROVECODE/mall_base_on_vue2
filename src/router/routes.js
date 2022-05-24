//采用路由懒加载的方式引入组件
export default[
    {
        path:"/center",
        component:()=>import('@/pages/Center'),
        meta:{footerShow:true},
        //二级路由组件
        children:[
        {
            path:'myorder',
            component:()=>import('@/pages/Center/myOrder'),
        },
        {
            path:'grouporder',
            component:()=>import('@/pages/Center/groupOrder'),
        },
        {
            path:'/center',
            redirect:'/center/myorder'
        }
    ]
    }
    ,{
        path:"/paysuccess",
        component:()=>import('@/pages/PaySuccess'),
        meta:{footerShow:true}
    },
    {
        path:"/pay",
        component:()=>import('@/pages/Pay'),
        meta:{footerShow:true},
           //路由独享守卫
           beforeEnter: (to, from, next) => {
            //去支付页,必须从交易页跳转而来
            if(from.path=='/trade'){
                next()
            }else{
                //其他证件，跳转回自己
                next(false)
            }
        }
    },
    {
        path:"/trade",
        component:()=>import('@/pages/Trade'),
        meta:{footerShow:true},
        //路由独享守卫
        beforeEnter: (to, from, next) => {
            //去交易页,必须从购物车跳转而来
            if(from.path=='/shopcart'){
                next()
            }else{
                //其他证件，跳转回自己
                next(false)
            }
        }
    },
    {
        path:"/shopcart",
        component:()=>import('@/pages/ShopCart'),
        meta:{footerShow:true}
    },
    {   component:()=>import('@/pages/AddCartSuccess'),
        name:"addcartsuccess",
        path:"/addcartsuccess",
        meta:{footerShow:true}
    },
    {
        path: "/detail/:skuid",
        component:()=>import('@/pages/Detail'),
        meta: {footerShow: true}
    },
    {
        path: "/home",
        component:()=>import('@/pages/Home'),
        meta: {footerShow: true}
    },
    {
        path: "/login",
        component:()=>import('@/pages/Login'),
        meta: { footerShow: false }
    },
    {
        path: "/register",
        component:()=>import('@/pages/Register'),
        meta: {footerShow: false}
    },
    {
        name:'search',
        path: "/search/:keyword?",
        component:()=>import('@/pages/Search'),
        meta: {footerShow: true}
    },
    {
        path: "*",
        redirect:"./home"
    }
]