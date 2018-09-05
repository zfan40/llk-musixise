import Vue from "vue";
import Router from "vue-router";
import Create from "./views/Create.vue";
import User from "./views/User.vue";
import Work from "./views/Work.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "create",
      component: Create
    },
    {
      path: "/create",
      name: "create",
      component: Create
    },
    {
      path: "/user/:id",
      name: "user",
      component: User
    },
    {
      path: "/user",
      name: "user",
      component: User
    },
    {
      path: "/work/:id",
      name: "work",
      component: Work
    }
  ]
});
