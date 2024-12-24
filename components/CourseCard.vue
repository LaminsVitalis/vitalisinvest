<template>
    <div class="bg-white/10 backdrop-blur-md rounded-lg p-4">
      <div class="flex justify-between items-start mb-4">
        <div>
          <h3 class="text-white font-semibold">{{ course.nome }}</h3>
          <p class="text-white/80 text-sm">{{ course.descricao }}</p>
        </div>
        <span class="bg-blue-500/80 text-white text-xs px-3 py-1 rounded-full">
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
          class="bg-blue-500 h-2 rounded-full transition-all duration-300"
          :style="{ width: `${course.progresso}%` }"
        ></div>
      </div>
      <div class="flex justify-between items-center">
        <p class="text-white/80 text-sm">{{ course.progresso }}% concluído</p>
        <button 
          @click="$emit('acessar-curso', course.id)"
          class="bg-blue-500/80 hover:bg-blue-600 text-white text-sm px-4 py-1.5 rounded-full transition-colors"
        >
          Acessar Curso
        </button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { Clock, Book } from 'lucide-vue-next'
  
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
  
  const acessarCurso = () => {
    // Aqui você pode adicionar a lógica para acessar o curso
    console.log(`Acessando o curso: ${course.nome}`)
    // Por exemplo, você pode emitir um evento para o componente pai
    emit('acessar-curso', course.id)
  }
  </script>
  
  