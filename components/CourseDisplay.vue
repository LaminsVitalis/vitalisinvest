<template>
  <div :class="['min-h-screen bg-gradient-to-b', colorScheme.gradient]">
    <div class="container mx-auto px-4 py-8">
      <div class="mb-6">
        <button 
          @click="$emit('voltar')"
          :class="[colorScheme.buttonPrimary, 'text-white font-bold py-2 px-4 rounded-full transition-colors mb-4']"
        >
          Voltar para Trilhas
        </button>
        <h1 class="text-3xl font-bold text-white">{{ course.nome }}</h1>
      </div>
      
      <!-- Progresso do curso -->
      <div :class="[colorScheme.cardBg, 'rounded-lg p-4 mb-8']">
        <div class="flex justify-between items-center mb-2">
          <span class="text-lg font-semibold text-white">Progresso do Curso</span>
          <span class="text-blue-300">{{ course.progresso }}%</span>
        </div>
        <div class="w-full bg-white/20 rounded-full h-3">
          <div 
            :class="[colorScheme.buttonPrimary, 'h-3 rounded-full transition-all duration-500 ease-out']"
            :style="{ width: `${course.progresso}%` }"
          ></div>
        </div>
      </div>
  
      <!-- Módulos do curso -->
      <div class="space-y-4">
        <div 
          v-for="(modulo, index) in course.modulos" 
          :key="index"
          :class="[colorScheme.cardBg, 'rounded-lg overflow-hidden']"
        >
          <div 
            @click="toggleModulo(index)"
            class="flex justify-between items-center p-4 cursor-pointer hover:bg-white/20 transition-colors"
          >
            <div class="flex items-center space-x-3">
              <div 
                :class="[
                  'w-8 h-8 rounded-full flex items-center justify-center',
                  modulo.completo ? colorScheme.buttonPrimary : colorScheme.buttonSecondary
                ]"
              >
                <Check v-if="modulo.completo" class="w-5 h-5 text-white" />
                <span v-else class="text-white font-bold">{{ index + 1 }}</span>
              </div>
              <span class="font-semibold text-white">{{ modulo.titulo }}</span>
            </div>
            <ChevronDown 
              :class="[
                'w-5 h-5 transition-transform text-white',
                moduloAberto === index ? 'transform rotate-180' : ''
              ]"
            />
          </div>
          <div 
            v-show="moduloAberto === index"
            class="p-4 bg-white/5"
          >
            <p class="text-white/80 mb-4">{{ modulo.descricao }}</p>
            <ul class="space-y-2">
              <li 
                v-for="(aula, aulaIndex) in modulo.aulas" 
                :key="aulaIndex"
                class="flex items-center space-x-2"
              >
                <Play class="w-4 h-4 text-blue-300" />
                <span class="text-white">{{ aula }}</span>
              </li>
            </ul>
            <button 
              @click="iniciarAula(index)"
              :class="[colorScheme.buttonPrimary, 'mt-4 text-white font-bold py-2 px-4 rounded transition-colors']"
            >
              {{ modulo.completo ? 'Revisar Módulo' : 'Iniciar Módulo' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { Check, ChevronDown, Play } from 'lucide-vue-next'
  import { useUserType } from '~/composables/useUserType'
  
  const { colorScheme } = useUserType()
  
  const props = defineProps({
  course: {
    type: Object,
    required: true
  }
  })
  
  const emit = defineEmits(['voltar'])
  
  const moduloAberto = ref(null)
  
  const toggleModulo = (index) => {
  moduloAberto.value = moduloAberto.value === index ? null : index
  }
  
  const iniciarAula = (moduloIndex) => {
  console.log(`Iniciando aula do módulo ${moduloIndex + 1}`)
  // Aqui você pode adicionar a lógica para iniciar a aula
  // Por exemplo, navegar para a página da aula ou abrir um modal com o conteúdo
  }
  </script>
  
  