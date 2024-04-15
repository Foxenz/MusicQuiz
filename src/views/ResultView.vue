<template>
  <main class="result text-white">
    <p>Result: {{ result }}</p>

    <div v-if="showInput" class="text-center">
      <input
        class="bg-white text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
        type="text"
        v-model="name"
        placeholder="Entrez votre nom"
        maxlength="25"
      />

      <div v-if="showError" class="text-red-500">
        Veuillez entrer un nom valide
      </div>

      <button
        @click="submitScore"
        class="bg-yellow-400 hover:bg-yellow-600 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline uppercase transition-colors duration-200 ease-in-out w-full mt-4"
      >
        Envoyer
      </button>
    </div>

    <LeaderBoard :scoreBoard="scoreBoard" />

    <router-link
      to="/"
      class="bg-yellow-400 hover:bg-yellow-600 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline uppercase transition-colors duration-200 ease-in-out"
      >Rejouer</router-link
    >
  </main>
</template>

<script>
import LeaderBoard from '@/components/LeaderBoard.vue';

export default {
  data() {
    return {
      id: this.$route.params.id,
      result: this.$route.params.score,
      name: '',
      scoreBoard: [],
      showInput: true,
      showError: false,
    };
  },

  methods: {
    submitScore() {
      if (this.name !== '') {
        let scores =
          JSON.parse(localStorage.getItem(`category-score${this.id}`)) || [];

        scores.push({ name: this.name, score: this.result });
        this.scoreBoard = scores.sort((a, b) => b.score - a.score);

        localStorage.setItem(
          `category-score${this.id}`,
          JSON.stringify(scores)
        );

        this.name = '';
        this.showInput = false;
      } else this.showError = true;
    },
  },

  created() {
    const storedScores = JSON.parse(
      localStorage.getItem(`category-score${this.id}`)
    );

    if (storedScores) {
      this.scoreBoard = storedScores.sort((a, b) => b.score - a.score);
    }
  },

  components: {
    LeaderBoard,
  },
};
</script>

<style scoped lang="scss">
.result {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  p {
    font-size: 2rem;
    margin-bottom: 1rem;
  }

  .btn {
    margin-top: 1rem;
    padding: 0.5rem 1rem;
    background-color: #4caf50;
    color: white;
    border: none;
    cursor: pointer;
    text-decoration: none;
  }
}
</style>
