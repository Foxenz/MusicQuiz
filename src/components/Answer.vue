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
    <div v-else class="text-center">
      <input
        v-model="inputValue"
        class="bg-gray-100 p-2 text-center shadow-box font-bold text-gray-800 mb-3 w-1/4 border-2 border-gray-300"
        id="input-answer"
        type="text"
        placeholder="..."
      />

      <button
        @click="checkAnswer(inputValue)"
        class="bg-yellow-400 hover:bg-yellow-600 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline uppercase transition-colors duration-200 ease-in-out ml-4"
        type="button"
      >
        Confirmer
      </button>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    questionContent: Object,
    answer: String,
  },
  data() {
    return {
      inputValue: '',
    };
  },
  methods: {
    checkAnswer(value) {
      this.$emit('rightAnswer', value === this.answer);
    },

    resetAnswer() {
      this.inputValue = '';
    },
  },
};
</script>
