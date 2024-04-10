<template>
  <section class="flex items-center justify-center flex-col">
    <div class="container flex-none px-12 pt-6 pb-0">
      <div
        class="rounded-lg bg-gray-300 p-2 text-center shadow-box font-bold text-gray-800 mb-3"
      >
        <div class="bg-white p-5">
          <p v-html="question.content.lyrics"></p>
        </div>
        <div v-if="sound_url !== ''" class="flex items-center justify-center">
          <audio ref="audioplayer" controls autoplay>
            <source :src="sound_url" type="audio/mpeg" />
          </audio>
        </div>
      </div>
    </div>

    <h1 class="text-5xl font-semibold mb-4 uppercase text-white tracking-wider">
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
