<template>
  <button
    :style="{
      backgroundColor: hover
        ? hoverBackgroundColorButton
        : backgroundColorButton,
    }"
    @mouseover="hover = true"
    @mouseleave="hover = false"
  >
    {{ categoryName }}
  </button>
</template>

<script>
export default {
  props: {
    categoryName: {
      type: String,
      required: true,
    },

    categoryId: {
      type: Number,
      required: true,
    },

    backgroundColorButton: {
      type: String,
      default: '#f8f8f8',
    },

    hoverBackgroundColorButton: {
      type: String,
      default: '#f0f0f0',
    },
  },

  data() {
    return {
      hover: false,
    };
  },
};
</script>

<style scoped lang="scss"></style>
