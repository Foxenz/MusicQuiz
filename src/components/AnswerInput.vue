<template>
  <div>
    <input
      v-model="value"
      class="text-center shadow appearance-none border rounded w-[250px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      id="input-answer"
      type="text"
      placeholder="..."
    />

    <br />
    <br />

    <button
      @click="checkAnswer"
      class="bg-yellow-400 hover:bg-yellow-600 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline uppercase transition-colors duration-200 ease-in-out"
      type="button"
    >
      Confirmer
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: '',
    };
  },
  methods: {
    checkAnswer() {
      this.$emit('check-answer', this.value);
    },
  },
};
</script>
