<template>
  <main
    class="text-white grid min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8"
  >
    <div class="text-center">
      <p class="text-base font-semibold">404</p>
      <h1 class="mt-4 text-3xl font-bold tracking-tight sm:text-5xl">
        Page <span class="text-yellow-400">introuvable</span>
      </h1>
      <p class="mt-6 text-base leading-7">
        Désole, la <span class="text-yellow-400">page</span> que vous cherchez
        <span class="text-yellow-500">n'existe pas</span>.
      </p>
      <div class="mt-10 flex items-center justify-center gap-x-6">
        <router-link
          to="/"
          class="bg-yellow-400 hover:bg-yellow-600 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline uppercase transition-colors duration-200 ease-in-out"
          >Retour à l'accueil</router-link
        >
      </div>
    </div>
  </main>
</template>
