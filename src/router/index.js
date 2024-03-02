import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    { path: '/', component: () => import('../views/Clients.vue') },
    { path: '/clients', component: () => import('../views/Clients.vue') },
    { path: '/products', component: () => import('../views/Products.vue') },
    { path: '/association', component: () => import('../views/AssociationProductClient.vue') }
];

const router = createRouter({
    history: createWebHistory(), 
    routes
});

export default router;