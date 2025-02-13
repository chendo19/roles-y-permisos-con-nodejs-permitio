import { createRouter, createWebHistory } from "vue-router"
import { useAuthStore } from "./stores/authStore.js"
import { storeToRefs } from "pinia"
import { validateRouteToken } from "./utils/validations.js"


const routes = [
    { path: "/", name: "home", component: () => import("./pages/Home.vue") },
    { path: "/login", name: "login", component: () => import("./pages/Login.vue") },
    { path: "/register", name: "register", component: () => import("./pages/Register.vue") },
    { path: "/profile", name: "profile", component: () => import("./pages/Profile.vue") },
    { path: "/users", name: "users", component: () => import("./pages/Users.vue") },
    { path: "/posts", name: "posts", component: () => import("./pages/Posts.vue") },
    { path: "/comments", name: "comments", component: () => import("./pages/Comments.vue") },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach( async (to, from, next) => {
    const authStore = useAuthStore()
    const { isAuthenticated } = storeToRefs(authStore)

    if (isAuthenticated.value) {
        const tokenIsValid = await validateRouteToken()

        if (!tokenIsValid) {
            authStore.logout()
            next({ name: 'login' })
        } else {
            next()
        }
    } else if (to.name !== 'login' && to.name !== 'register') {
        next('/login')
    } else {
        next()
    }
})

export default router