<template>
    <main class="flex items-center justify-center flex-col ">
        <div class="container flex-none px-12 py-6 ">
            <div class="rounded-lg bg-gray-100 p-2 text-center shadow-box font-bold text-gray-800 mb-8">
                <div class="bg-white p-5">
                    <p class="text-center text-red-900">{{ question.questions[0].title }}</p>
                    <p v-html="question.questions[0].content.lyrics"></p>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
export default {
    name: 'Question',
    props: {
        question: Object
    }
};
</script>
<style scoped>
.shadow-box {
    box-shadow: 6px 6px 18px rgba(0, 0, 0, 0.09);
}

.container {
    max-width: 900px;
}
</style>