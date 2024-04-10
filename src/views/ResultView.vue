<template>
  <main class="result">
    <p>Result: {{ result }}</p>

    <div>
      <input type="text" placeholder="Enter your name" />
      <button>Submit</button>
    </div>

    <LeaderBoard />

    <router-link to="/" class="btn">Try Again</router-link>
  </main>
</template>

<script>
import LeaderBoard from '@/components/LeaderBoard.vue';

export default {
  data() {
    return {
      result: this.$route.params.score,
    };
  },

  components: {
    LeaderBoard,
  },
};
</script>

<style scoped lang="scss">
.result {
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 300px;
  text-align: center;

  p {
    margin: 0 0 10px;
    font-size: 1.5em;
  }

  div {
    input {
      padding: 5px 2px;
      border: 1px solid #ccc;
      border-radius: 5px;
    }

    button {
      padding: 5px 10px;
      background-color: #007bff;
      color: #fff;
      border: none;
      border-radius: 5px;
      cursor: pointer;

      &:hover {
        background-color: #0056b3;
      }
    }
  }

  .btn {
    display: inline-block;
    padding: 5px 10px;
    background-color: #007bff;
    color: #fff;
    text-decoration: none;
    border-radius: 5px;

    &:hover {
      background-color: #0056b3;
    }
  }
}
</style>
