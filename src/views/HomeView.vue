<template>
  <main class="bg-[#0a0724] min-h-screen flex items-center justify-center">
    <div class="text-center">
      <h1
        class="text-5xl font-semibold mb-4 uppercase text-yellow-400 tracking-wider"
      >
        <span class="text-white">Bienvenue sur</span> MusicQuiz !
      </h1>
      <p class="text-lg mb-8 text-white">
        Choisissez une catégorie pour commencer à jouer :
      </p>

      <CategoryButton
        v-for="category in categories"
        :key="category.id"
        :categoryName="category.title"
        :categoryId="category.id"
        :isDisabled="!category.is_active"
        class="mb-4"
      />

      <p class="text-sm mt-4 text-white italic">
        <span class="font-semibold not-italic">Note :</span> Les catégories
        <span class="text-yellow-400 font-black not-italic">désactivées</span>
        sortiront
        <span class="text-yellow-400 font-black not-italic">prochainement</span
        >.
      </p>
    </div>
  </main>
</template>

<script>
import CategoryButton from '@/components/CategoryButton.vue';
import ApiHandler from '@/services/api/apiHandler';

export default {
  name: 'HomeView',

  data() {
    return {
      categories: [],
    };
  },

  components: {
    CategoryButton,
  },

  async created() {
    const apiHandler = new ApiHandler();
    const response = await apiHandler.fetchCategories();

    this.categories = response;
  },
};
</script>

<style scoped lang="scss"></style>
