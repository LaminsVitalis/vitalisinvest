<template>
    <nav class="fixed bottom-0 left-0 right-0 bg-blue-900/80 backdrop-blur-md">
      <div class="flex justify-around items-center h-16">
        <NuxtLink to="/" class="flex flex-col items-center w-1/4" :class="{ 'text-blue-500': currentRoute === '/' }">
          <Home :class="['w-6 h-6', currentRoute === '/' ? 'text-blue-500' : 'text-white']" />
          <span class="text-xs mt-1" :class="currentRoute === '/' ? 'text-blue-500' : 'text-white'">Início</span>
        </NuxtLink>
        <NuxtLink to="/trilhas" class="flex flex-col items-center w-1/4" :class="{ 'text-blue-500': currentRoute === '/trilhas' }">
          <GraduationCap :class="['w-6 h-6', currentRoute === '/trilhas' ? 'text-blue-500' : 'text-white']" />
          <span class="text-xs mt-1" :class="currentRoute === '/trilhas' ? 'text-blue-500' : 'text-white'">Trilhas</span>
        </NuxtLink>
        <NuxtLink to="/biblioteca" class="flex flex-col items-center w-1/4" :class="{ 'text-blue-500': currentRoute === '/biblioteca' }">
          <BookOpen :class="['w-6 h-6', currentRoute === '/biblioteca' ? 'text-blue-500' : 'text-white']" />
          <span class="text-xs mt-1" :class="currentRoute === '/biblioteca' ? 'text-blue-500' : 'text-white'">Biblioteca</span>
        </NuxtLink>
        <NuxtLink to="/perfil" class="flex flex-col items-center w-1/4" :class="{ 'text-blue-500': currentRoute === '/perfil' }">
          <User :class="['w-6 h-6', currentRoute === '/perfil' ? 'text-blue-500' : 'text-white']" />
          <span class="text-xs mt-1" :class="currentRoute === '/perfil' ? 'text-blue-500' : 'text-white'">Perfil</span>
        </NuxtLink>
      </div>
    </nav>
  </template>
  
  <script setup>
  import { computed } from 'vue'
  import { useRoute } from 'vue-router'
  import { Home, GraduationCap, BookOpen, User } from 'lucide-vue-next'
  
  const route = useRoute()
  const currentRoute = computed(() => route.path)
  </script>
  
  