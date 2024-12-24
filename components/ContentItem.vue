<template>
    <button 
      @click="acessarConteudo" 
      class="w-full text-left bg-white/10 backdrop-blur-md rounded-lg p-4 hover:bg-white/20 transition-colors"
    >
      <div class="flex items-start gap-4">
        <div class="w-16 h-16 bg-blue-500 rounded-lg flex items-center justify-center">
          <component :is="getIconForFormato(item.formato)" class="w-8 h-8 text-white" />
        </div>
        <div class="flex-1">
          <h3 class="text-white font-semibold mb-1">{{ item.titulo }}</h3>
          <p class="text-white/80 text-sm mb-2">{{ item.descricao }}</p>
          <div class="flex items-center gap-4">
            <span class="text-white/60 text-xs flex items-center gap-1">
              <Clock class="w-4 h-4" />
              {{ item.duracao }}
            </span>
            <span class="text-white/60 text-xs flex items-center gap-1">
              <Tag class="w-4 h-4" />
              {{ item.formato }}
            </span>
          </div>
        </div>
      </div>
    </button>
  </template>
  
  <script setup>
  import { Clock, Tag, FileText, Video, Headphones, BookOpen } from 'lucide-vue-next'
  
  const props = defineProps({
    item: {
      type: Object,
      required: true
    }
  })
  
  const emit = defineEmits(['acessar-conteudo'])
  
  const getIconForFormato = (formato) => {
    switch (formato) {
      case 'Artigos': return FileText
      case 'Vídeos': return Video
      case 'Podcasts': return Headphones
      case 'E-books': return BookOpen
      default: return FileText
    }
  }
  
  const acessarConteudo = () => {
    // Aqui você pode adicionar a lógica para acessar o conteúdo
    console.log(`Acessando o conteúdo: ${item.titulo}`)
    // Por exemplo, você pode emitir um evento para o componente pai
    emit('acessar-conteudo', item.id)
  }
  </script>
  
  