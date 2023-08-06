<template>
  <div class="wrapper">
    <div class="home">
      <public-content></public-content>
      <content-footer></content-footer>
    </div>
  </div>
</template>
<style lang="scss">
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  min-height: 100vh;

  background-color: #f4f3ef;
}
</style>
<script>
import PublicContent from "./Content.vue";
import ContentFooter from "./ContentFooter.vue";
export default {
  components: {
    PublicContent,
    ContentFooter,
  },
};
</script>
