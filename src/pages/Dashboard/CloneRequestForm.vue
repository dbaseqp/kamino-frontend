<template>
  <card class="card" title="Deploy New Pod">
    <div>
      <form @submit.prevent>
        <div class="row">
          <div class="col-md-12">
            <fg-select label="Template Name" placeholder="Select a pod..." ref="templateSelect">
            </fg-select>
          </div>
        </div>

        <div class="text-center">
          <p-button type="info" round @click.native.prevent="deployPod()">
            Deploy Pod
          </p-button>
        </div>
        <div class="clearfix"></div>
      </form>
    </div>
    <b-modal ref="modal" v-model="modalShow" :title="modalTitle" ok-only>
      <div class="text-center">
        <b-spinner v-if="modalTitle == 'Deplying Your Pod'" variant="primary" label="Text Centered"></b-spinner>
        <div v-else>
          {{ username }}
          <hr>
          {{ password }}
        </div>
      </div>
    </b-modal>
  </card>
</template>
<script>
import axios from 'axios';
export default {
  data() {
    return {
      modalShow: false,
      modalTitle: "Deplying Your Pod",
      username: "",
      password: "",
    }
  },
  methods: {
    deployPod() {
      this.modalTitle = "Deplying Your Pod";
      this.username = "";
      this.password = "";
      this.modalShow = true;
      axios.post('https://kamino.sdc.cpp:8080/clone/ondemand', {
        template: this.$refs.templateSelect.selected,
        jwtToken: localStorage.getItem("jwtToken")
      })
      .then((response) => {
        console.log("success");
        this.modalTitle = "Your Pod is Ready";
        this.username = "Your Pod is Ready. Check vSphere for your new pod.";
        // this.username = response.data.message.username;
        // this.password = response.data.message.password;
      })
      .catch((error) => {
        this.modalTitle = "Pod Clone Failed";
        this.username = "Clone failed.";
        console.log("error");
        console.error(error);
      });
    },
  },
};
</script>
<style></style>
