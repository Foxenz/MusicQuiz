<template>
  <button
    @click="goToQuizzPage(categoryId)"
    type="button"
    class="h-3/4 w-3/4 text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 shadow-lg shadow-teal-500/50 dark:shadow-lg dark:shadow-teal-800/80 font-medium rounded-lg text-lg px-5 py-2.5 text-center"
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
  },

  methods: {
    goToQuizzPage(categoryId) {
      this.$router.push(`/quiz/${categoryId}`);
    },
  },
};
</script>

<style scoped lang="scss"></style>
