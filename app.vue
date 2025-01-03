<template>
  <div class="min-h-screen bg-gradient-to-b from-blue-500 to-blue-600 text-white">
    <header class="fixed top-0 left-0 right-0 bg-white/10 backdrop-blur-md z-50">
      <div class="flex justify-between items-center p-4">
        <h1 class="text-xl font-bold">Vitalis</h1>
        <button class="text-white">
          <Bell class="w-6 h-6" />
        </button>
      </div>
    </header>

    <main class="pt-16 pb-20">
      <NuxtPage />
    </main>

    <nav class="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-gray-200 z-50">
      <div class="flex justify-around items-center">
        <NuxtLink to="/" class="flex flex-col items-center p-2">
          <Home class="w-6 h-6 text-gray-600" />
          <span class="text-xs text-gray-600">Início</span>
        </NuxtLink>
        <NuxtLink to="/trilhas" class="flex flex-col items-center p-2">
          <GraduationCap class="w-6 h-6 text-gray-600" />
          <span class="text-xs text-gray-600">Trilhas</span>
        </NuxtLink>
        <NuxtLink to="/biblioteca" class="flex flex-col items-center p-2">
          <BookOpen class="w-6 h-6 text-gray-600" />
          <span class="text-xs text-gray-600">Biblioteca</span>
        </NuxtLink>
        <NuxtLink to="/recompensas" class="flex flex-col items-center p-2">
          <Gift class="w-6 h-6 text-gray-600" />
          <span class="text-xs text-gray-600">Recompensas</span>
        </NuxtLink>
        <NuxtLink to="/perfil" class="flex flex-col items-center p-2">
          <User class="w-6 h-6 text-gray-600" />
          <span class="text-xs text-gray-600">Perfil</span>
        </NuxtLink>
      </div>
    </nav>
  </div>
</template>

<script setup>
import { Bell, Home, GraduationCap, BookOpen, Gift, User } from 'lucide-vue-next'
</script>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.3s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
