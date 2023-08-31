<template>
  <card class="card" title="Deploy New Pod">
    <div>
      <form @submit.prevent>
        <div class="row">
          <div class="col-md-12">
            <fg-select 
              label="Template Name" 
              placeholder="Select a pod..." 
              ref="templateSelect"
              :options="options">
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
        <b-spinner v-if="modalTitle == 'Deploying Your Pod'" variant="primary" label="Text Centered"></b-spinner>
        <div v-else>
          {{ modalText }}
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
      modalText: "",
      password: "",
      options: [],
    }
  },
  mounted() {
    this.loadOptions()
  },
  methods: {
    loadOptions() {
      axios.post('https://bruharmy.sdc.cpp:8080/pods/templates', {
        jwtToken: localStorage.getItem("jwtToken")
      })
      .then((response) => {
            this.options = response.data.message;
      });
    },
    deployPod() {
      this.modalTitle = "Deploying Your Pod";
      this.modalText = "";
      this.modalShow = true;
      axios.post('https://bruharmy.sdc.cpp:8080/pods/clone', {
        template: this.$refs.templateSelect.selected,
        jwtToken: localStorage.getItem("jwtToken")
      })
      .then((response) => {
        console.log("success");
        this.modalTitle = "Your Pod is Ready";
        this.modalText = "Your Pod is Ready. Check vSphere for your new pod.";
        this.$root.$emit('loadPods');
        this.$notify(
          {
            message: "Pod deployment is ready",
            type: 'success',
            horizontalAlign: 'center',
            verticalAlign: 'bottom'
          })
      })
      .catch((error) => {
        this.modalTitle = "Pod Clone Failed";
        this.modalText = error.response.data.message;
        console.log("error");
        console.error(error);
        this.$notify(
          {
            message: error.response.data.message,
            type: 'danger',
            horizontalAlign: 'center',
            verticalAlign: 'bottom'
          })
      });
    },
  },
};
</script>
<style></style>
