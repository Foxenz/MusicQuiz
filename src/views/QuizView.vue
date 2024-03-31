<template>
    <div class="quiz">
        <p>Quiz id: {{ id }}</p>
        <TimerBar @time-is-up="stopQuestion"/>
        <Answer
            :questionContent="question.content"
            :answer="question.answer"
            @rightAnswer="handleRightAnswer"
        />
    </div>
</template>

<script>
import TimerBar from '@/components/TimerBar.vue';
import ApiHandler from "@/services/api/apiHandler.js";
import Answer from "@/components/Answer.vue";

const apiHandler = new ApiHandler();

export default {
    name: 'QuizView',

    data() {
        return {
            id: this.$route.params.id,
            timeIsUp: false,
            question: {content: {}, answer: ''},
            rightAnswer: false,
        };
    },

    methods: {
        stopQuestion() {
            console.log('Time is up!');
        },
        handleRightAnswer(isCorrect) {
            this.rightAnswer = isCorrect;
        }
    },

    components: {
        Answer,
        TimerBar,
    },

    async created() {
        const response = await apiHandler.fetchOneQuestionForCategory(2, 11);

        this.question = response.questions[0];
    }
};
</script>
