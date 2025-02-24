import { createRouter, createWebHistory } from "vue-router";
import RouterService from '@/router/RouterService'
import { createPinia, setActivePinia } from "pinia";

let svc = new RouterService();
const subDomain = import.meta.env.VITE_BASE_URL;
const router = createRouter({
    history: createWebHistory(subDomain),
    routes: [...svc.getRoutes()],
});

router.beforeEach(async (to, from, next) => {
    next()
})
export default router;