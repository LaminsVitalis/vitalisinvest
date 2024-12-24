<template>
    <div class="min-h-screen bg-gradient-to-b from-blue-600 to-blue-800 p-4 pb-20">
      <div v-if="!selectedContent">
        <div class="sticky top-0 bg-blue-600/80 backdrop-blur-md z-10 pb-4">
          <h2 class="text-2xl font-bold text-white mb-6">Biblioteca Digital</h2>
  
          <!-- Barra de pesquisa -->
          <div class="relative mb-6">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Pesquisar conteúdo"
              class="w-full bg-white/10 backdrop-blur-md rounded-lg py-2 px-4 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search class="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5" />
          </div>
  
          <!-- Filtros -->
          <div class="flex gap-2 overflow-x-auto">
            <button 
              v-for="formato in formatos" 
              :key="formato"
              :class="[
                'px-4 py-2 rounded-full whitespace-nowrap text-sm',
                formatoSelecionado === formato 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-white/10 text-white/80'
              ]"
              @click="formatoSelecionado = formato"
            >
              {{ formato }}
            </button>
          </div>
        </div>
  
        <!-- Lista de conteúdos -->
        <div class="space-y-4 mt-4">
          <ContentCard
            v-for="item in conteudosFiltrados" 
            :key="item.id"
            :item="item"
            @acessar-conteudo="acessarConteudo"
          />
        </div>
      </div>
  
      <VideoPlayer 
        v-else-if="selectedContent.formato === 'Vídeos'"
        :video="selectedContent"
        @voltar="voltarParaBiblioteca"
      />
  
      <div v-else-if="selectedContent.formato === 'Artigos'" class="bg-white/10 backdrop-blur-md rounded-lg p-6">
        <button @click="voltarParaBiblioteca" class="mb-4 text-blue-300 hover:text-blue-100 transition-colors">
          &larr; Voltar para a biblioteca
        </button>
        <h2 class="text-2xl font-bold text-white mb-4">{{ selectedContent.titulo }}</h2>
        <p class="text-white/80 mb-4">{{ selectedContent.descricao }}</p>
        <div class="bg-blue-900/50 p-4 rounded-lg">
          <p class="text-white/90">Conteúdo do artigo aqui...</p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { Search } from 'lucide-vue-next'
  import ContentCard from '~/components/ContentCard.vue'
  import VideoPlayer from '~/components/VideoPlayer.vue'
  
  const route = useRoute()
  const router = useRouter()
  
  const searchQuery = ref('')
  const formatoSelecionado = ref('Todos')
  const formatos = ['Todos', 'Artigos', 'Vídeos', 'Podcasts', 'E-books']
  const selectedContent = ref(null)
  
  const conteudos = [
    {
      id: 1,
      titulo: 'Introdução ao Mercado de Ações',
      descricao: 'Aprenda os conceitos básicos para começar a investir em ações',
      formato: 'Artigos',
      duracao: '10 min de leitura'
    },
    {
      id: 2,
      titulo: 'Análise Técnica na Prática',
      descricao: 'Como identificar padrões gráficos e tomar decisões de investimento',
      formato: 'Vídeos',
      duracao: '45 min',
      url: 'https://example.com/video.mp4',
      dataPublicacao: '15 de junho de 2023',
      proximosVideos: [
        { titulo: 'Padrões de Candlestick', duracao: '12 minutos' },
        { titulo: 'Indicadores Técnicos', duracao: '18 minutos' },
        { titulo: 'Estratégias de Trading', duracao: '20 minutos' }
      ]
    },
    {
      id: 3,
      titulo: 'Estratégias de Diversificação',
      descricao: 'Descubra como montar uma carteira equilibrada e reduzir riscos',
      formato: 'Podcasts',
      duracao: '30 min'
    },
    {
      id: 4,
      titulo: 'Guia Completo de Finanças Pessoais',
      descricao: 'Organize suas finanças e alcance seus objetivos financeiros',
      formato: 'E-books',
      duracao: '120 páginas'
    }
  ]
  
  const conteudosFiltrados = computed(() => {
    let filteredContent = conteudos
  
    if (formatoSelecionado.value !== 'Todos') {
      filteredContent = filteredContent.filter(item => item.formato === formatoSelecionado.value)
    }
  
    if (searchQuery.value) {
      const query = searchQuery.value.toLowerCase()
      filteredContent = filteredContent.filter(item => 
        item.titulo.toLowerCase().includes(query) || 
        item.descricao.toLowerCase().includes(query)
      )
    }
  
    return filteredContent})
  
  const acessarConteudo = (conteudoId) => {
    selectedContent.value = conteudos.find(item => item.id === conteudoId)
  }
  
  const voltarParaBiblioteca = () => {
    selectedContent.value = null
    router.push('/biblioteca')
  }
  
  onMounted(() => {
    const conteudoId = Number(route.params.conteudoId)
    const tipo = route.query.tipo
  
    if (conteudoId && tipo) {
      const conteudo = conteudos.find(item => item.id === conteudoId)
      if (conteudo && conteudo.formato.toLowerCase() === tipo) {
        selectedContent.value = conteudo
      }
    }
  })
  </script>
  
  <style scoped>
  /* Adicione estilos específicos aqui, se necessário */
  </style>
  
  