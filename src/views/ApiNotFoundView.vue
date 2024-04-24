<template>
  <main>
    <div class="min-h-screen flex flex-col items-center justify-center">
      <div class="text-center">
        <h1
          class="text-5xl font-semibold mb-4 uppercase text-red-500 tracking-wider"
        >
          <span class="text-white">Erreur:</span> Impossible de contacter l'API
        </h1>
        <p class="text-lg mb-8 text-white">Veuillez revenir plus tard</p>
      </div>
      <div class="mt-10 flex items-center justify-center gap-x-6">
        <router-link
          to="/"
          class="bg-yellow-400 hover:bg-yellow-600 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline uppercase transition-colors duration-200 ease-in-out"
          >Retour à l'accueil
        </router-link>
      </div>
    </div>
  </main>
</template>
<script setup lang="ts"></script>
