<template>
    <div>
        <template v-if="Array.isArray(questionContent.answers)">
            <div class="flex gap-1">
                <div v-for="(option, index) in questionContent.answers" :key="index">
                    <button @click="checkAnswer(option)"
                            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                        {{ option }}
                    </button>
                </div>
            </div>
        </template>
        <AnswerInput v-else v-model="inputValue" @check-answer="checkAnswer" />
    </div>
</template>

<script>
import AnswerInput from "@/components/AnswerInput.vue";
export default {
    props: {
        questionContent: Object,
        answer: String,
        points: 0,
    },
    data() {
        return {
            inputValue: '',
        };
    },
    methods: {
        checkAnswer(value) {
            const answer = this.answer.toLowerCase();
            const inputValue = value.toLowerCase();

            let points = 0;

            if(Array.isArray(this.answers))
            {
                if (answer === inputValue)
                    points = this.points
            }
            else
            {
                const answerWords = answer.split(' ');
                const inputWords = inputValue.split(' ');
                const answerWordLength = answerWords.join('').length;

                let matchCount = 0;
                for (let i = 0; i < Math.min(answerWords.length, inputWords.length); i++) {
                    const answerWord = answerWords[i];
                    const inputWord = inputWords[i];

                    const minLength = Math.min(answerWord.length, inputWord.length);
                    for (let j = 0; j < minLength; j++) {
                        if (answerWord[j] === inputWord[j]) {
                            matchCount++;
                        }
                    }
                }

                // Calculate the percentage of match
                const matchPercentage = (matchCount / answerWordLength) * 100;

                if (matchPercentage === 100) {
                    points = this.points;
                } else if (matchPercentage >= 50) {
                    points = this.points / 2;
                }
            }

            this.$emit('handleRightAnswer', points);
        }
    },
    components: {
        AnswerInput,
    }
};
</script>
