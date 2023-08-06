<template>
  <div class="wrapper">
    <side-bar
      title="Kamino">
      <template slot="links">
        <sidebar-link to="/dashboard/dashboard" name="Dashboard" icon="ti-panel" />
        <!-- <sidebar-link to="/dashboard/profile" name="User Profile" icon="ti-user" /> -->
        <li class="nav-item">
          <a href="" class="nav-link" @click.prevent="logout">
          <i class="ti-share-alt"></i>
          <p>Logout</p>
        </a>
        </li>
      </template>
      <mobile-menu>
        <li class="nav-item">
          <a class="nav-link">
            <i class="ti-panel"></i>
            <p>Stats</p>
          </a>
        </li>
        <li class="divider"></li>
      </mobile-menu>
    </side-bar>
    <div class="main-panel">
      <top-navbar></top-navbar>

      <dashboard-content @click.native="toggleSidebar"> </dashboard-content>

      <content-footer></content-footer>
    </div>
  </div>
</template>
<style lang="scss"></style>
<script>
import TopNavbar from "./TopNavbar.vue";
import ContentFooter from "./ContentFooter.vue";
import DashboardContent from "./Content.vue";
import MobileMenu from "./MobileMenu";
export default {
  components: {
    TopNavbar,
    ContentFooter,
    DashboardContent,
    MobileMenu,
  },
  methods: {
    toggleSidebar() {
      if (this.$sidebar.showSidebar) {
        this.$sidebar.displaySidebar(false);
      }
    },
    logout() {
      localStorage.removeItem("jwtToken");
      this.$router.push({ name: "home" });
    }
  },
};
</script>
