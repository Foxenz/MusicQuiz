<template>
    <div>
        <label class="block text-gray-700 text-sm font-bold mb-2" for="input-answer">
            Input Answer
        </label>
        <input v-model="value"
               class="shadow appearance-none border rounded w-[250px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
               id="input-answer" type="text" placeholder="Answer here">

        <button @click="checkAnswer"
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button">
            Confirm
        </button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            value: ''
        };
    },
    methods: {
        checkAnswer() {
            this.$emit("check-answer", this.value);
        }
    }
};
</script>
