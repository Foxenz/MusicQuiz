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
            currentQuestion: 0,
            timeIsUp: false,
            questions: Array,
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
        },
        async fetchQuestionList() {
          const res = await apiHandler.fetchQuestionsForCategory(this.id);

            console.log("Question List: ", res)
          this.questions = res.questions
        },
        async fetchQuestion(questionID) {
            const response = await apiHandler.fetchOneQuestionForCategory(this.id, questionID);

            this.question = response.questions[0];
        }
    },

    components: {
        Answer,
        TimerBar,
    },

    async created() {
        await this.fetchQuestionList();
        console.log("current quest: ", this.questions[this.currentQuestion])
        await this.fetchQuestion(this.questions[this.currentQuestion].id)
    }
};
</script>
