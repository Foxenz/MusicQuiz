<template>
  <div class="quiz">
    <h1>This is a quiz page</h1>

    <p>Quiz id: {{ id }}</p>
  </div>
</template>

<script>
export default {
  name: 'QuizView',

  data() {
    return {
      quiz: {},
      id: this.$route.params.id,
    };
  },
};
</script>
