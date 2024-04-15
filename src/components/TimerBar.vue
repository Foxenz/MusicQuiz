<template>
  <section class="flex justify-center">
    <div class="w-11/12 h-8 bg-gray-300 rounded-full text-center">
      <div
        class="h-full bg-yellow-500 rounded-full"
        :style="{ width: `${progress}%` }"
      ></div>
      <p class="text-center text-white mt-3">Temps restant: {{ timeLeft }}</p>
    </div>
  </section>
</template>

<script>
export default {
  name: 'TimerBar',
  emits: ['time-is-up'],

  data() {
    return {
      timeLeft: 20,
      progress: 100,
      interval: null,
    };
  },

  methods: {
    startTimer() {
      this.timeLeft = 20;
      this.progress = 100;

      this.interval = setInterval(() => {
        this.timeLeft -= 1;
        this.progress = (this.timeLeft / 20) * 100;

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
