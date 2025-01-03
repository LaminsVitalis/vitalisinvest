<template>
  <div class="min-h-screen bg-gradient-to-b from-purple-600 via-purple-700 to-green-600">
    <header class="bg-purple-600 px-4 py-3 flex justify-between items-center">
      <h1 class="text-white text-xl font-bold">Vitalis</h1>
      <button class="text-white">
        <Bell class="w-6 h-6" />
      </button>
    </header>
    
    <main class="pb-20">
      <slot />
    </main>

    <BottomNavBar />
  </div>
</template>

<script setup>
import { Bell } from 'lucide-vue-next'
import BottomNavBar from '~/components/BottomNavBar.vue'
</script>

