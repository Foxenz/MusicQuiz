<template>
  <!-- Quiz question here -->
  <Question v-for="question in questions.questions" :key="question.id" :question="questions" />
</template>

<script>
// Importing ApiHandler Services and Question Component
import ApiHandler from '../services/api/apiHandler';
import Question from '../components/Question.vue';

export default {
  name: 'QuizView',

  components: {
    Question, // Register the component to be used within this
  },

  data() {
    return {
      questions: [],
      id: this.$route.params.id,
    };
  },

  created() {
    this.fetchQuestion();
  },

  methods: {

    async fetchQuestion() {
      try {
        const apiHandler = new ApiHandler();
        const questions = await apiHandler.fetchOneQuestionForCategory(this.id, this.id);
        this.questions = questions;
        console.log(questions.questions);
        console.log(questions);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    },
  },
};
</script>
