<template>
  <section>
    <!-- Multiple choice -->
    <div
      v-if="Array.isArray(questionContent.answers)"
      class="grid grid-cols-2 gap-4 mt-10"
    >
      <div v-for="(option, index) in questionContent.answers" :key="index">
        <button
          @click="checkAnswer(option)"
          class="bg-yellow-400 hover:bg-yellow-600 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline uppercase transition-colors duration-200 ease-in-out w-full"
        >
          {{ option }}
        </button>
      </div>
    </div>

    <!-- Input -->
    <AnswerInput
      class="text-center"
      v-else
      v-model="inputValue"
      @check-answer="checkAnswer"
    />
  </section>
</template>

<script>
import AnswerInput from '@/components/AnswerInput.vue';

export default {
  props: {
    questionContent: Object,
    answer: String,
    points: 0,
  },
  data() {
    return {
      inputValue: '',
    };
  },
  methods: {
    checkAnswer(value) {
      const answer = this.answer.toLowerCase();
      const inputValue = value.toLowerCase();

      let points = 0;
      let result = '';

      if (Array.isArray(this.answers)) {
        if (answer === inputValue) points = this.points;
      } else {
        const answerWords = answer.split(' ');
        const inputWords = inputValue.split(' ');
        const answerWordLength = answerWords.join('').length;

        let matchCount = 0;
        for (
          let i = 0;
          i < Math.min(answerWords.length, inputWords.length);
          i++
        ) {
          const answerWord = answerWords[i];
          const inputWord = inputWords[i];

          const minLength = Math.min(answerWord.length, inputWord.length);
          for (let j = 0; j < minLength; j++) {
            if (answerWord[j] === inputWord[j]) {
              matchCount++;
            }
          }
        }

        // Calculate the percentage of match
        const matchPercentage = (matchCount / answerWordLength) * 100;

        if (matchPercentage === 100) {
          points = this.points;
          result = 'good';
        } else if (matchPercentage >= 50) {
          points = this.points / 2;
          result = 'average';
        } else {
          points = 0;
          result = 'bad';
        }

        // Reset the input value
        this.inputValue = '';
      }

      this.$emit('handleRightAnswer', {
        points,
        result,
      });
    },
  },
  components: {
    AnswerInput,
  },
};
</script>
