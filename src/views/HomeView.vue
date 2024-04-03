<template>
  <main class="h-full grid grid-cols-2 gap-4 justify-items-center items-center">
    <CategoryButton v-for="category in categories" :key="category.id" :categoryName="category.title"
      :categoryId="category.id" :disabled="!category.is_active" />
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
