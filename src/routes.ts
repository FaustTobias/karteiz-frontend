import { get } from "svelte/store";
import { getStore } from "svex";
import { wrap } from "svelte-spa-router/wrap";
import Home from "./pages/Home.svelte";
import Learn from "./pages/Learn.svelte";
import Categories from "./pages/Categories.svelte";
import CategoryNew from "./pages/CategoryNew.svelte";
import CategoryEdit from "./pages/CategoryEdit.svelte";
import CardNew from "./pages/CardNew.svelte";
import Settings from "./pages/Settings.svelte";
import Register from "./pages/Register.svelte";
import Login from "./pages/Login.svelte";
import Logout from "./pages/Logout.svelte";
import NotFound from "./pages/NotFound.svelte";

export const routes = {
    "/": wrap({
        component: Home,
        conditions: [
            () => {
                return get(getStore("user.isLoggedIn"));
            },
        ],
    }),
    "/learn/:id": wrap({
        component: Learn,
        conditions: [
            () => {
                return get(getStore("user.isLoggedIn"));
            },
        ],
    }),
    "/categories": wrap({
        component: Categories,
        conditions: [
            () => {
                return get(getStore("user.isLoggedIn"));
            },
        ],
    }),
    "/categories/new": wrap({
        component: CategoryNew,
        conditions: [
            () => {
                return get(getStore("user.isLoggedIn"));
            },
        ],
    }),
    "/categories/:id": wrap({
        component: CategoryEdit,
        conditions: [
            () => {
                return get(getStore("user.isLoggedIn"));
            },
        ],
    }),
    "/categories/:id/new": wrap({
        component: CardNew,
        conditions: [
            () => {
                return get(getStore("user.isLoggedIn"));
            },
        ],
    }),
    "/settings": wrap({
        component: Settings,
        conditions: [
            () => {
                return get(getStore("user.isLoggedIn"));
            },
        ],
    }),
    "/register": Register,
    "/login": Login,
    "/logout": Logout,
    "*": NotFound,
};
