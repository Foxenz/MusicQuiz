<template>
  <main class="flex justify-center items-center text-white">
    <div
      v-if="showOverlay"
      @click="showOverlay = false"
      class="fixed inset-0 flex justify-center items-center cursor-pointer"
    >
      <h1 class="uppercase text-2xl font-black tracking-wide">
        Cliquez <span class="text-yellow-400">n'importe où</span> pour
        <span class="text-yellow-400">commencez</span> le quiz
      </h1>
    </div>

    <div v-else>
      <Question :question="question" :sound_url="sound_url" />
      <TimerBar class="mb-[75px]" ref="timer" @time-is-up="stopQuestion" />

      <Answer
        v-if="!showAnswer && !timeIsUp"
        ref="answer"
        :questionContent="question.content"
        :answer="question.answer"
        :points="question.points"
        @handleRightAnswer="handleRightAnswer"
      />

      <section v-else class="text-center">
        <p v-if="result === 'good'" class="text-green-400">Bonne réponse !</p>
        <p v-else-if="result === 'average'" class="text-yellow-400">
          Presque !
        </p>
        <p v-else class="text-red-400">Mauvaise réponse !</p>

        <p>
          La bonne réponse est :
          <span class="text-yellow-400">{{ question.answer }}</span>
        </p>

        <button
          v-if="
            (rightAnswer !== null &&
              this.currentQuestion < this.questions.length - 1) ||
            timeIsUp
          "
          @click="nextQuestion"
          class="bg-yellow-400 hover:bg-yellow-600 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline uppercase transition-colors duration-200 ease-in-out mt-4"
        >
          Question suivante
        </button>

        <button
          v-else
          @click="gotToScore"
          class="bg-yellow-400 hover:bg-yellow-600 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline uppercase transition-colors duration-200 ease-in-out mt-4 ml-4"
        >
          Terminer le quiz
        </button>
      </section>
    </div>
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
      showAnswer: false,
      result: '',
    };
  },

  methods: {
    stopQuestion() {
      console.log('Time is up');
      this.rightAnswer = false;
      this.timeIsUp = true;
    },

    handleRightAnswer(data) {
      this.result = data.result;
      this.$refs.timer.stopTimer();
      this.score += data.points;
      this.rightAnswer = data.points > 0;
      this.showAnswer = true;
    },

    nextQuestion() {
      this.currentQuestion++;
      this.rightAnswer = null;
      this.timeIsUp = false;
      this.showAnswer = false;
      this.fetchQuestion(this.questions[this.currentQuestion].id);
      this.$refs.timer.startTimer();
    },

    gotToScore() {
      this.$router.push(`/result/${this.id}/${this.score * 10}`);
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
