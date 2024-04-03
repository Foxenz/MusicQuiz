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
        <template v-else>
            <label class="block text-gray-700 text-sm font-bold mb-2" for="input-answer">
                Input Answer
            </label>
            <input v-model="inputValue"
                   class="shadow appearance-none border rounded w-[250px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                   id="input-answer" type="text" placeholder="Answer here">

            <button @click="checkAnswer(inputValue)"
                    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="button">
                Confirm
            </button>
        </template>
    </div>
</template>

<script>
export default {
    props: {
        questionContent: Object,
        answer: String,
    },
    data() {
        return {
            inputValue: '',
        };
    },
    methods: {
        checkAnswer(value) {
            this.$emit('rightAnswer', value === this.answer);
        }
    },
};
</script>
