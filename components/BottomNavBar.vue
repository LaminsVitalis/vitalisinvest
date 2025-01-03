<template>
  <nav class="fixed bottom-0 left-0 right-0 bg-white/10 backdrop-blur-md">
    <div class="flex justify-around items-center h-16">
      <NuxtLink 
        to="/" 
        class="flex flex-col items-center w-1/5"
        :class="currentRoute === '/' ? 'text-white' : 'text-white/60'"
      >
        <Home :class="['w-6 h-6']" />
        <span class="text-xs mt-1">Início</span>
      </NuxtLink>
      
      <NuxtLink 
        to="/trilhas" 
        class="flex flex-col items-center w-1/5"
        :class="currentRoute === '/trilhas' ? 'text-white' : 'text-white/60'"
      >
        <GraduationCap :class="['w-6 h-6']" />
        <span class="text-xs mt-1">Trilhas</span>
      </NuxtLink>
      
      <NuxtLink 
        to="/biblioteca" 
        class="flex flex-col items-center w-1/5"
        :class="currentRoute === '/biblioteca' ? 'text-white' : 'text-white/60'"
      >
        <BookOpen :class="['w-6 h-6']" />
        <span class="text-xs mt-1">Biblioteca</span>
      </NuxtLink>
      
      <NuxtLink 
        to="/recompensas" 
        class="flex flex-col items-center w-1/5"
        :class="currentRoute === '/recompensas' ? 'text-white' : 'text-white/60'"
      >
        <Gift :class="['w-6 h-6']" />
        <span class="text-xs mt-1">Recompensas</span>
      </NuxtLink>
      
      <NuxtLink 
        to="/perfil" 
        class="flex flex-col items-center w-1/5"
        :class="currentRoute === '/perfil' ? 'text-white' : 'text-white/60'"
      >
        <User :class="['w-6 h-6']" />
        <span class="text-xs mt-1">Perfil</span>
      </NuxtLink>
    </div>
  </nav>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { Home, GraduationCap, BookOpen, Gift, User } from 'lucide-vue-next'

const route = useRoute()
const currentRoute = computed(() => route.path)
</script>

