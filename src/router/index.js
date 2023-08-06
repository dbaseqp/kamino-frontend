import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes";
import axios from 'axios';
Vue.use(VueRouter);

// configure router
const router = new VueRouter({
  routes, // short for routes: routes
  linkActiveClass: "active",
});

router.beforeResolve((to, from, next) => {
  if (to.matched.some(record => record.meta.authRequired)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    axios.post('https://kamino.sdc.cpp:8080/api/auth', 
      {
        jwtToken: localStorage.getItem("jwtToken")
      }).then(response => {
      next();
    }).catch(error => {
        next("login");
    })
  } else {
    next();
  }
})

export default router;
