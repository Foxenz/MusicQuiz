<template>
  <main class="bg-[#0a0724] min-h-screen text-white">
    <div
      v-if="showOverlay"
      @click="showOverlay = false"
      class="fixed inset-0 flex justify-center items-center cursor-pointer"
    >
      <h1 class="uppercase text-2xl font-black tracking-wide">
        Cliquez n'importe où pour commencer le quiz
      </h1>
    </div>

    <div v-else class="quiz">
      <p>Quiz id: {{ id }}</p>
      <Question :question="question" :sound_url="sound_url" />
      <TimerBar ref="timer" @time-is-up="stopQuestion" />
      <Answer
        :questionContent="question.content"
        :answer="question.answer"
        :points="question.points"
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
import Question from '@/components/Question.vue';
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
      this.sound_url = this.question.content.sound_url
        ? this.question.content.sound_url
        : '';
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
