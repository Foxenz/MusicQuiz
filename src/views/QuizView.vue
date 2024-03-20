<template>
  <div class="quiz">
    <p>Quiz id: {{ id }}</p>
    <TimerBar @time-is-up="stopQuestion" />
  </div>
</template>

<script>
import TimerBar from '@/components/TimerBar.vue';

export default {
  name: 'QuizView',

  data() {
    return {
      id: this.$route.params.id,
      timeIsUp: false,
    };
  },

  methods: {
    stopQuestion() {
      console.log('Time is up!');
    },
  },

  components: {
    TimerBar,
  },
};
</script>
