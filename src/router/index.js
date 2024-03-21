import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import ApiHandler from '@/services/api/apiHandler';

const apiHandler = new ApiHandler();
const nbCategories = await apiHandler.getNbActivateCategories();

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/quiz/:id',
      name: 'quiz',
      component: () => import('../views/QuizView.vue'),
      beforeEnter: (to, from, next) => {
        const quizId = Number(to.params.id);
        if (quizId > 0 && quizId <= nbCategories) {
          next();
        } else {
          next({ name: 'not-found' });
        }
      },
    },
    {
      path: '/result',
      name: 'result',
      component: () => import('../views/ResultView.vue'),
    },

    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('../views/NotFoundView.vue'),
    },
  ],
});

export default router;
