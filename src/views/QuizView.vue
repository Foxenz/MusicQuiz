<template>
  <div v-if="showOverlay" @click="showOverlay = false" class="overlay">
    <p>Cliquez n'importe ou pour commencer le quiz</p>
  </div>

  <div v-else class="quiz">
    <p>Quiz id: {{ id }}</p>
    <Question :question="question" :sound_url="sound_url" />
    <TimerBar ref="timer" @time-is-up="stopQuestion" />
    <Answer :questionContent="question.content" :answer="question.answer" :points="question.points"
      @handleRightAnswer="handleRightAnswer" />
  </div>
  <button v-if="
    (rightAnswer !== null &&
      this.currentQuestion < this.questions.length - 1) ||
    timeIsUp
  " @click="nextQuestion()">
    Next
  </button>
  <button v-if="
    rightAnswer !== null && this.currentQuestion === this.questions.length - 1
  " @click="gotToScore()">
    Show score
  </button>
</template>

<script>
import Question from "@/components/Question.vue";
import TimerBar from '@/components/TimerBar.vue';
import ApiHandler from '@/services/api/apiHandler.js';
import Answer from '@/components/Answer.vue';


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
      score: 0,
      sound_url: '',
    };
  },

  methods: {
    stopQuestion() {
      console.log('Time is up');
      this.rightAnswer = false;
      this.timeIsUp = true;
    },

    handleRightAnswer(points) {
      this.$refs.timer.stopTimer();
      this.score += points;

      this.rightAnswer = points > 0;
    },

    nextQuestion() {
      this.currentQuestion++;
      this.rightAnswer = null;
      this.timeIsUp = false;
      this.fetchQuestion(this.questions[this.currentQuestion].id);
      this.$refs.timer.startTimer();
    },

    gotToScore() {
      this.$router.push(`/result/${this.score}`);
    },

    async fetchQuestionList() {
      const res = await apiHandler.fetchQuestionsForCategory(this.id);

      this.questions = res.questions;
    },

    async fetchQuestion(questionID) {
      const response = await apiHandler.fetchOneQuestionForCategory(
        this.id,
        questionID
      );

      this.question = response.questions[0];
      this.sound_url = this.question.content.sound_url ? this.question.content.sound_url : '';
      console.log(this.sound_url);
    },
  },

  components: {
    Answer,
    TimerBar,
    Question,
  },

  async created() {
    await this.fetchQuestionList();
    await this.fetchQuestion(this.questions[this.currentQuestion].id);
  },
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
