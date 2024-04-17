<template>
    <main v-if="!loading" class="min-h-screen flex items-center justify-center">
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
    <Loading v-else />
</template>

<script>
import CategoryButton from '@/components/CategoryButton.vue';
import Loading from '@/components/Loading.vue';
import ApiHandler from '@/services/api/apiHandler';

export default {
    name: 'HomeView',

    data() {
        return {
            categories: [],
            loading: true,
        };
    },

    components: {
        CategoryButton,
        Loading,
    },

    async created() {
        const apiHandler = new ApiHandler();
        try {
            const response = await apiHandler.fetchCategories();
            this.loading = false;
            this.categories = response;
        } catch (error) {
            console.error('Error fetching categories:', error);
            this.$router.push('/apiNotFound')
        }
    },
};
</script>

<style scoped lang="scss"></style>
