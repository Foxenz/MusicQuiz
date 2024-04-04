<template>
  <div class="timer-bar">
    <div class="timer-bar__inner" :style="{ width: `${progress}%` }"></div>
    <p>Time left: {{ timeLeft }}</p>
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

<style scoped lang="scss">
.timer-bar {
  width: 100%;
  height: 20px;
  background-color: #f1f1f1;
  border-radius: 10px;
  margin-bottom: 10px;

  &__inner {
    height: 100%;
    background-color: green;
    border-radius: 10px;
  }

  p {
    text-align: center;
  }
}
</style>
