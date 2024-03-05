import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    { path: '/', component: () => import('../views/Home.vue') },
    { path: '/registration/customers', component: () => import('../views/Customer.vue') },
    { path: '/registration/products', component: () => import('../views/Products.vue') },
    { path: '/query', component: () => import('../views/QueryList.vue') },
    { path: '/association', component: () => import('../views/AssociateCustomerProduct.vue') }
];

const router = createRouter({
    history: createWebHistory(), 
    routes
});

export default router;