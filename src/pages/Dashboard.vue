<template>
  <div>
    <div class="row">
      <div class="col-6">
        <deployed-pods ref="deployedPods"> </deployed-pods>
      </div>
      <div class="col-6">
        <clone-request-form> </clone-request-form>
      </div>
    </div>
  </div>
</template>
<script>
import { StatsCard, ChartCard } from "@/components/index";
import CloneRequestForm from "./Dashboard/CloneRequestForm.vue";
import DeployedPods from "./Dashboard/DeployedPods.vue";

import Chartist from "chartist";
export default {
  components: {
    StatsCard,
    ChartCard,
    CloneRequestForm,
    DeployedPods,
  },
  /**
   * Chart data used to render stats, charts. Should be replaced with server data
   */
};
</script>
<style></style>
