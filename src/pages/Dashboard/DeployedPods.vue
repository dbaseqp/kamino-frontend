<template>
  <card class="card" title="Your Deployed Pods">
    <div >
      <b-tabs pills vertical>
          <b-tab v-for="i in pods" :key="i.name" :title="i.name">
            <b-card-text>vSphere Username: {{ i.username }}</b-card-text>
            <b-card-text>vSphere Password: {{ i.password }}</b-card-text>
          </b-tab>
        </b-tabs>
    </div>
  </card>
</template>
<script>
export default {
  data() {
    return {
      pods: 
        [
          {
            name: "1400_Pod",
            username: "aaaa",
            password: "bbbb"
          },
          {
            name: "Pod2",
            username: "cccc",
            password: "dddd"
          },
          {
            name: "Pod3",
            username: "cccc",
            password: "dddd"
          },
          {
            name: "Pod4",
            username: "cccc",
            password: "dddd"
          },
          {
            name: "Pod5",
            username: "cccc",
            password: "dddd"
          },
        ]
    };
  },
};
</script>
<style>

</style>
