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
import "vue-select/dist/vue-select.css";

export default {
  inheritAttrs: false,
  name: "fg-select",
  data() {
    return {
        selected: null,
    };
  },
  props: {
    label: String,
    placeholder: String,
    options: Array,
  },
  method: {
    value() {
      return this.selected;
    },
  }
};
</script>
<style></style>
