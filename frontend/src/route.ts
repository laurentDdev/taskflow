import {createRouter, createWebHistory} from "vue-router";
import DashboardView from "./views/dashboard/DashboardView.vue";
import AuthLayout from "./views/auth/AuthLayout.vue";
import {getSession} from "./lib/auth-client.ts";


const routes = [
    {path: '/', component: DashboardView},
    {path: '/auth', component: AuthLayout, children: [
            {path: '' , component: () => import('./views/auth/login/LoginView.vue')},
            {path: 'register' , component: () => import('./views/auth/register/RegisterView.vue')},
            {path: 'forgot-password', component: () => import('./views/auth/forgotPassword/ForgotPassword.vue')}
        ]}
]


export const router =  createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach(async (to) => {
    const {data} = await getSession();
    if (to.path === '/' && !data?.session) {
        return {path: '/auth'};
    }
    if (to.path.startsWith('/auth') && data?.session) {
        return {path: '/'};
    }
})