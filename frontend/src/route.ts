import {createRouter, createWebHistory} from "vue-router";
import DashboardView from "./views/dashboard/DashboardView.vue";
import AuthLayout from "./views/auth/AuthLayout.vue";


const routes = [
    {path: '/', component: DashboardView},
    {path: '/auth', component: AuthLayout, children: [
            {path: '' , component: () => import('./views/auth/login/LoginView.vue')},
            {path: 'register' , component: () => import('./views/auth/register/RegisterView.vue')},
        ]}
]


export const router =  createRouter({
    history: createWebHistory(),
    routes
})