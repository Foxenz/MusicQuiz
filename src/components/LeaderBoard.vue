<template>
  <section class="leaderboard">
    <h2>Leaderboard</h2>
    <ol>
      <li v-for="(score, index) in scores" :key="index">
        {{ score.name }}: {{ score.score }}
      </li>
    </ol>
  </section>
</template>

<script>
export default {
  name: 'LeaderBoard',

  data() {
    return {
      scores: [
        { name: 'John Doe', score: 25 },
        { name: 'Jane Doe', score: 20 },
        { name: 'John Smith', score: 15 },
        { name: 'Jane Smith', score: 10 },
        { name: 'John Johnson', score: 5 },
      ],
    };
  },
};
</script>

<style scoped lang="scss">
.leaderboard {
  padding: 20px;
  border-radius: 5px;
  text-align: center;

  h2 {
    margin: 0 0 10px;
    font-size: 1.5em;
  }

  ol {
    padding: 0;
    list-style: none;
  }

  li {
    margin: 0 0 5px;
    font-size: 1.2em;
  }
}
</style>
