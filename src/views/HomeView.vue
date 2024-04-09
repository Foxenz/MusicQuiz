<template>
  <main class="bg-[#0a0724] min-h-screen flex items-center justify-center">
    <div class="text-center">
      <h1 class="text-5xl font-semibold mb-4 uppercase text-yellow-400">
        Bienvenue sur MusicQuiz !
      </h1>
      <p class="text-lg mb-8 text-yellow-400">
        Choisissez une catégorie pour commencer à jouer :
      </p>

      <CategoryButton
        v-for="category in categories"
        :key="category.id"
        :categoryName="category.title"
        :categoryId="category.id"
        :disabled="!category.is_active"
        class="mb-4"
      />

      <p class="text-sm mt-4 text-yellow-400">
        <span class="font-semibold">Note :</span> Les catégories désactivées
        sortiront prochainement.
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
