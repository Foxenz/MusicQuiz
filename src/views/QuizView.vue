<template>
  <main class="bg-[#0a0724] min-h-screen text-white">
    <div
      v-if="showOverlay"
      @click="showOverlay = false"
      class="fixed inset-0 flex justify-center items-center text-white cursor-pointer"
    >
      <h1 class="uppercase text-2xl text-yellow-400">
        Cliquez n'importe où pour commencer le quiz
      </h1>
    </div>

    <div v-else class="quiz">
      <!-- <Question :question="question"/> -->
      <TimerBar ref="timer" @time-is-up="stopQuestion" />
      <Answer
        :questionContent="question.content"
        :answer="question.answer"
        @rightAnswer="handleRightAnswer"
      />
    </div>
    <button
      v-if="
        (rightAnswer !== null &&
          this.currentQuestion < this.questions.length - 1) ||
        timeIsUp
      "
      @click="nextQuestion()"
    >
      Next
    </button>
    <button
      v-if="
        rightAnswer !== null &&
        this.currentQuestion === this.questions.length - 1
      "
      @click="gotToScore()"
    >
      Show score
    </button>
  </main>
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
      console.log('Time is up');
      this.rightAnswer = false;
      this.timeIsUp = true;
    },

    handleRightAnswer(isCorrect) {
      this.$refs.timer.stopTimer();
      this.rightAnswer = isCorrect;
    },

    nextQuestion() {
      this.currentQuestion++;
      this.rightAnswer = null;
      this.timeIsUp = false;
      this.fetchQuestion(this.questions[this.currentQuestion].id);
      this.$refs.timer.startTimer();
    },

    gotToScore() {
      this.$router.push(`/result`);
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
    },
  },

  components: {
    Answer,
    TimerBar,
  },

  async created() {
    await this.fetchQuestionList();
    await this.fetchQuestion(this.questions[this.currentQuestion].id);
  },
};
</script>
