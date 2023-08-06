<template>
  <div class="form-group">
    <slot name="label">
      <label v-if="label" class="control-label">
        {{ label }}
      </label>
      <v-select
        v-model="selected"
        :options="options"
        :placeholder="placeholder"
        >
      </v-select>
    </slot>
    <slot></slot>
  </div>
</template>
<script>
import axios from 'axios';
import "vue-select/dist/vue-select.css";

export default {
  inheritAttrs: false,
  name: "fg-select",
  data() {
    return {
        options: [],
        selected: null,
    };
  },
  mounted() {
    this.loadOptions();
  },
  methods: {
    loadOptions() {
      axios.get('https://kamino.sdc.cpp:8080/templates/guest')
        .then((response) => {
            this.options = response.data.message;
      });
    },
    value() {
      return this.selected;
    },
  },
  props: {
    label: String,
    placeholder: String,
  },
};
</script>
<style></style>
