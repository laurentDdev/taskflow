import { createRouter, createWebHistory } from "vue-router";
import AuthLayout from "./views/auth/AuthLayout.vue";
import { getSession } from "./lib/auth-client.ts";
import RootLayout from "./views/RootLayout.vue";

const routes = [
  {
    path: "/",
    component: RootLayout,
    children: [
      {
        path: "",
        component: () => import("./views/dashboard/DashboardView.vue"),
      },
    ],
  },
  {
    path: "/auth",
    component: AuthLayout,
    children: [
      { path: "", component: () => import("./views/auth/login/LoginView.vue") },
      {
        path: "register",
        component: () => import("./views/auth/register/RegisterView.vue"),
      },
      {
        path: "forgot-password",
        component: () =>
          import("./views/auth/forgotPassword/ForgotPassword.vue"),
      },
      {
        path: "reset-password/:resetToken",
        component: () => import("./views/auth/resetPassword/ResetPassword.vue"),
      },
    ],
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to) => {
  const { data } = await getSession();
  if (to.path === "/dashboard" && !data?.session) {
    return { path: "/auth" };
  }
  if (to.path.startsWith("/auth") && data?.session) {
    return { path: "/" };
  }
});
