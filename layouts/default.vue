<template>
    <div class="min-h-screen bg-gradient-to-b from-blue-600 to-blue-800">
      <main class="pb-16">
        <slot />
      </main>
      <BottomNavBar />
    </div>
  </template>
  
  <script setup>
  import BottomNavBar from '/components/BottomNavBar.vue'
  </script>
  
  