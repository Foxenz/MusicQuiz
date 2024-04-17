<template>
  <section class="flex flex-col justify-center items-center">
    <div
      class="question-container flex justify-center items-center text-center bg-white border-8 border-yellow-500 p-4 w-[900px] h-[350px]"
    >
      <p
        class="text-black text-2xl font-bold leading-loose"
        v-html="question.content.lyrics"
      ></p>

      <div v-if="sound_url !== ''" class="flex items-center justify-center">
        <audio ref="audioplayer" controls autoplay>
          <source :src="sound_url" type="audio/mpeg" />
        </audio>
      </div>
    </div>

    <h1
      class="text-5xl font-semibold uppercase text-white tracking-wider text-center mt-14 mb-14"
    >
      {{ question.title }}
    </h1>
  </section>
</template>

<script>
export default {
  name: 'Question',
  props: {
    question: Object,
    sound_url: '',
  },
  watch: {
    sound_url: function (newUrl, oldUrl) {
      if (newUrl !== oldUrl) {
        this.$refs.audioplayer.load();
        this.$refs.audioplayer.play();
      }
    },
  },
};
</script>

<style scoped lang="scss">
// media queries
@media (max-width: 1024px) {
  .question-container {
    width: 650px;
  }
}

@media (max-width: 768px) {
  .question-container {
    width: 350px;
  }
}
</style>
