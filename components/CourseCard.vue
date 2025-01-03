<template>
  <div :class="[colorScheme.cardBg, 'backdrop-blur-md rounded-lg p-4']">
    <div class="flex justify-between items-start mb-4">
      <div>
        <h3 class="text-white font-semibold">{{ course.nome }}</h3>
        <p class="text-white/80 text-sm">{{ course.descricao }}</p>
      </div>
      <span :class="[colorScheme.buttonSecondary, 'text-white text-xs px-3 py-1 rounded-full']">
        {{ course.nivel }}
      </span>
    </div>
    
    <div class="flex items-center gap-2 mb-4">
      <Clock class="w-4 h-4 text-white/60" />
      <span class="text-white/60 text-sm">{{ course.duracao }}</span>
      <Book class="w-4 h-4 text-white/60 ml-4" />
      <span class="text-white/60 text-sm">{{ course.modulos?.length || 0 }} módulos</span>
    </div>
    
    <div class="w-full bg-white/20 rounded-full h-2 mb-2">
      <div 
        :class="[colorScheme.buttonPrimary, 'h-2 rounded-full transition-all duration-300']"
        :style="{ width: `${course.progresso}%` }"
      ></div>
    </div>
    <div class="flex justify-between items-center">
      <p class="text-white/80 text-sm">{{ course.progresso }}% concluído</p>
      <button 
        @click="$emit('acessar-curso', course.id)"
        :class="[colorScheme.buttonPrimary, 'text-white text-sm px-4 py-1.5 rounded-full transition-colors']"
      >
        Acessar Curso
      </button>
    </div>
  </div>
  </template>
  
  <script setup>
  import { Clock, Book } from 'lucide-vue-next'
  import { useUserType } from '~/composables/useUserType'
  
  const { colorScheme } = useUserType()
  
  defineProps({
  course: {
    type: Object,
    required: true,
    default: () => ({
      id: '',
      nome: '',
      descricao: '',
      nivel: '',
      duracao: '',
      modulos: [],
      progresso: 0
    })
  }
  })
  
  const emit = defineEmits(['acessar-curso'])
  </script>
  
  