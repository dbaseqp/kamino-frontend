<template>
  <card class="card" title="Your Deployed Pods">
    <div >
      <p v-if="pods.length == 0">
        You don't have any pods yet.
      </p>
      <b-tabs pills vertical>
          <b-tab class="flex-nowrap" v-for="i in pods" :key="i" :title="i">
            <b-card-text>
              <p-button type="danger" round @click.native.prevent="deletePod(i)">
                Delete {{ i }}
              </p-button>
            </b-card-text>
          </b-tab>
        </b-tabs>
    </div>
  </card>
</template>
<script>
import axios from 'axios';

export default {
  data() {
    return {
      pods: []
    };
  },
  mounted() {
    this.loadPods()
    this.$root.$on('loadPods', () => {
      this.loadPods()
    })
  },
  methods: {
    loadPods() {
      axios.post('https://bruharmy.sdc.cpp:8080/pods/view',
        {
          jwtToken: localStorage.getItem("jwtToken")
        })
      .then((response) => {
        this.pods = response.data.message;
      }).catch((error) => {
        console.log(error)
      });
    },
    deletePod(pod) {
      axios.post('https://bruharmy.sdc.cpp:8080/pods/delete',
        {
          target: pod,
          jwtToken: localStorage.getItem("jwtToken")
        })
        .then((response) => {
            this.loadPods();
      });
    }
  },
};
</script>
<style>

</style>
