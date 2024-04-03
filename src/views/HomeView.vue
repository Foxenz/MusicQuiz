<template>
  <main>
    <CategoryButton v-for="category in categories" :key="category.id" :categoryName="category.title"
      :categoryId="category.id" backgroundColorButton="orange" hoverBackgroundColorButton="red"
      @click="goToQuizzPage(category.id)" :disabled="!category.is_active" />
  </main>
</template>

<script>
import CategoryButton from '@/components/CategoryButton.vue';
import axios from 'axios';
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

  methods: {
    goToQuizzPage(categoryId) {
      this.$router.push(`/quiz/${categoryId}`);
    },
  },

  async created() {
    const apiHandler = new ApiHandler();
    const response = await apiHandler.fetchCategories();

    this.categories = response;
  },
};
</script>

<style scoped lang="scss"></style>
