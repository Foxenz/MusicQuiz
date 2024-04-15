<template>
    <main class="result">
        <p>Result: {{ result }}</p>

        <div v-if="showInput">
            <input type="text" v-model="name" placeholder="Enter your name" maxlength="25"/>
            <button @click="submitScore">Submit</button>
        </div>

        <div v-if="showError">Enter a valid name</div>

        <LeaderBoard :scoreBoard="scoreBoard"/>

        <router-link to="/" class="btn">Try Again</router-link>
    </main>
</template>

<script>
import LeaderBoard from '@/components/LeaderBoard.vue';

export default {
    data() {
        return {
            id: this.$route.params.id,
            result: this.$route.params.score,
            name: "",
            scoreBoard: [],
            showInput: true,
            showError: false,
        };
    },

    methods: {
        submitScore() {
            if (this.name !== "") {
                let scores = JSON.parse(localStorage.getItem(`category-score${this.id}`)) || [];

                scores.push({ name: this.name, score: this.result });
                this.scoreBoard = scores.sort((a, b) => b.score - a.score);

                localStorage.setItem(`category-score${this.id}`, JSON.stringify(scores));

                this.name = "";
                this.showInput = false;
            }
            else
                this.showError = true;
        }
    },

    created() {
        const storedScores = JSON.parse(localStorage.getItem(`category-score${this.id}`));

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
