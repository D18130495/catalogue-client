import Vue from 'vue';
import  VueRouter from 'vue-router';

import Home from "@/views/Home";
import Product from "@/views/Product";
import AddProduct from "@/views/AddProduct";
import EditProduct from "@/views/EditProduct";

Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',
    routes:[
        {
            path: '/',
            name: 'Home',
            component: Home,
            meta: {
                requireLogin: false
            }
        },
        {
            path: '/product/:id',
            name: 'ProductDetail',
            component: Product,
            meta: {
                requireLogin: false
            },
        },
        {
            path: '/addProduct',
            name: 'addProduct',
            component: AddProduct,
            meta: {
                requireLogin: false
            },
        },
        {
            path: '/editProduct/:id',
            name: 'editProduct',
            component: EditProduct,
            meta: {
                requireLogin: false
            },
        },
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
