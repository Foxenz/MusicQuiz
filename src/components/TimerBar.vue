<template>
  <div class="w-full h-5 bg-gray-300 rounded-md mb-4">
    <div
      class="h-full bg-yellow-500 rounded-md"
      :style="{ width: `${progress}%` }"
    ></div>
    <p class="text-center text-yellow-500">Time left: {{ timeLeft }}</p>
  </div>
</template>

<script>
export default {
  name: 'TimerBar',
  emits: ['time-is-up'],

  data() {
    return {
      timeLeft: 5,
      progress: 100,
      interval: null,
    };
  },

  methods: {
    startTimer() {
      this.timeLeft = 5;
      this.progress = 100;

      this.interval = setInterval(() => {
        this.timeLeft -= 1;
        this.progress = (this.timeLeft / 5) * 100;

        if (this.timeLeft === 0) {
          clearInterval(this.interval);
          this.$emit('time-is-up');
        }
      }, 1000);
    },

    stopTimer() {
      clearInterval(this.interval);
    },
  },

  mounted() {
    this.startTimer();
  },
};
</script>
