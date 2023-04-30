import Vue from 'vue'
import  VueRouter from 'vue-router'

import Home from "@/views/Home"

Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'hash',
    routes:[
        {
            path: '/',
            name: 'Home',
            component: Home,
            meta: {
                requireLogin: false
            },
            children: [

            ]
        }
    ]
})

// before each url change
// router.beforeEach((to, from, next) => {
//     if(token.get()) {
//         if(to.path  === '/login' || to.path  === '/signup') {
//             next('/map')
//         }else {
//             next()
//         }
//     }else {
//         if(to.path === '/' || to.path  === '/login' || to.path  === '/signup') {
//
//         }else {
//             next('/')
//         }
//     }
// })

export default router
