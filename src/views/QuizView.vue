<template>
    <div v-if="showOverlay" @click="showOverlay = false" class="overlay">
        <p>Cliquez n'importe ou pour commencer le quiz</p>
    </div>

    <div v-else class="quiz">
        <p>Quiz id: {{ id }}</p>
        <Question :question="question"/>
        <TimerBar @time-is-up="stopQuestion"/>
        <Answer :questionContent="question.content" :answer="question.answer" @rightAnswer="handleRightAnswer"/>
    </div>
    <button v-if="rightAnswer !== null && this.currentQuestion < this.questions.length - 1" @click="nextQuestion()">Next
    </button>
    <button v-if="rightAnswer !== null && this.currentQuestion === this.questions.length - 1" @click="gotToScore()">Show score</button>
</template>

<script>
import TimerBar from '@/components/TimerBar.vue';
import ApiHandler from '@/services/api/apiHandler.js';
import Answer from '@/components/Answer.vue';
import Question from '@/components/Question.vue';

const apiHandler = new ApiHandler();

export default {
    name: 'QuizView',

  data() {
    return {
      id: this.$route.params.id,
      currentQuestion: 0,
      timeIsUp: false,
      questions: Array,
      question: { content: {}, answer: '' },
      rightAnswer: null,
      showOverlay: true,
    };
  },

    methods: {
        stopQuestion() {
            console.log('Time is up!');
        },
        handleRightAnswer(isCorrect) {
            this.rightAnswer = isCorrect;
        },
        nextQuestion() {
            this.currentQuestion++;
            this.rightAnswer = null;
            this.fetchQuestion(this.questions[this.currentQuestion].id)
        },
        gotToScore() {
            this.$router.push(`/result`);
        },
        async fetchQuestionList() {
            const res = await apiHandler.fetchQuestionsForCategory(this.id);

            this.questions = res.questions
        },
        async fetchQuestion(questionID) {
            const response = await apiHandler.fetchOneQuestionForCategory(this.id, questionID);

            this.question = response.questions[0];
        }
    },

    components: {
        Answer,
        TimerBar,
    },

    async created() {
        await this.fetchQuestionList();
        await this.fetchQuestion(this.questions[this.currentQuestion].id)
    }

};
</script>

<style scoped lang="scss">
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  cursor: pointer;
}
</style>
