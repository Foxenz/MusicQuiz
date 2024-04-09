<template>
  <button
    @click="goToQuizzPage(categoryId)"
    class="relative inline-flex items-center justify-center px-6 py-3 text-lg font-medium tracking-tighter text-white bg-gray-800 rounded-md group ml-5 mr-5"
  >
    <span
      class="absolute inset-0 w-full h-full mt-1 ml-1 transition-all duration-300 ease-in-out bg-yellow-400 rounded-md group-hover:mt-0 group-hover:ml-0"
    ></span>
    <span class="absolute inset-0 w-full h-full bg-white rounded-md"></span>
    <span
      class="absolute inset-0 w-full h-full transition-all duration-200 ease-in-out delay-100 bg-yellow-400 rounded-md opacity-0 group-hover:opacity-100"
    ></span>
    <span
      class="relative text-yellow-400 transition-colors duration-200 ease-in-out delay-100 group-hover:text-white"
    >
      {{ categoryName }}</span
    >
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
  },

  methods: {
    goToQuizzPage(categoryId) {
      this.$router.push(`/quiz/${categoryId}`);
    },
  },
};
</script>

<style scoped lang="scss"></style>
