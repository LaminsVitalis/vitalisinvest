<template>
  <div :class="['min-h-screen bg-gradient-to-b', colorScheme.gradient]">
    <div v-if="!selectedContent">
      <!-- Header -->
      <div :class="[colorScheme.header, 'sticky top-0 backdrop-blur-md z-10 pb-4']">
        <h2 class="text-2xl font-bold text-white mb-6 p-4">Biblioteca Digital</h2>

        <!-- Barra de pesquisa -->
        <div class="relative mb-6 px-4">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Pesquisar conteúdo"
            class="w-full bg-white/10 backdrop-blur-md rounded-lg py-2 px-4 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30"
          />
          <Search class="absolute right-7 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5" />
        </div>

        <!-- Filtros -->
        <div class="flex gap-2 overflow-x-auto px-4 scrollbar-hide">
          <button 
            v-for="formato in formatos" 
            :key="formato"
            :class="[
              'px-4 py-2 rounded-full whitespace-nowrap text-sm transition-colors',
              formatoSelecionado === formato 
                ? colorScheme.buttonPrimary
                : 'bg-white/10 text-white/80'
            ]"
            @click="formatoSelecionado = formato"
          >
            {{ formato }}
          </button>
        </div>
      </div>

      <!-- Lista de conteúdos -->
      <div class="grid gap-4 p-4 sm:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="item in conteudosFiltrados" 
          :key="item.id"
          :class="[colorScheme.cardBg, 'backdrop-blur-md rounded-lg p-4 cursor-pointer hover:bg-white/20 transition-colors']"
          @click="acessarConteudo(item.id)"
        >
          <div class="flex items-start gap-4">
            <div :class="[colorScheme.buttonSecondary, 'w-16 h-16 rounded-lg flex items-center justify-center flex-shrink-0']">
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
        </div>
      </div>
    </div>

    <VideoPlayer 
      v-else-if="selectedContent && selectedContent.formato === 'Vídeos'"
      :video="selectedContent"
      @voltar="voltarParaBiblioteca"
    />

    <div v-else-if="selectedContent && selectedContent.formato === 'Artigos'" :class="[colorScheme.cardBg, 'backdrop-blur-md rounded-lg p-6 m-4']">
      <button 
        @click="voltarParaBiblioteca" 
        :class="[colorScheme.buttonPrimary, 'mb-4 px-4 py-2 rounded-full transition-colors']"
      >
        &larr; Voltar para a biblioteca
      </button>
      <h2 class="text-2xl font-bold text-white mb-4">{{ selectedContent.titulo }}</h2>
      <p class="text-white/80 mb-4">{{ selectedContent.descricao }}</p>
      <div class="bg-white/10 p-4 rounded-lg">
        <p class="text-white/90">Conteúdo do artigo aqui...</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Search, Clock, Tag } from 'lucide-vue-next'
import ContentCard from '~/components/ContentCard.vue'
import VideoPlayer from '~/components/VideoPlayer.vue'
import { useUserType } from '~/composables/useUserType'

const route = useRoute()
const router = useRouter()

const { colorScheme, userType } = useUserType()

const searchQuery = ref('')
const formatoSelecionado = ref('Todos')
const formatos = ['Todos', 'Artigos', 'Vídeos', 'Podcasts', 'E-books']
const selectedContent = ref(null)

const currentUserType = computed(() => userType.value)

const conteudos = {
  empreendedor: [
    {
      id: 1,
      titulo: 'Como Validar sua Ideia de Negócio',
      descricao: 'Aprenda técnicas para testar a viabilidade da sua startup',
      formato: 'Artigos',
      duracao: '15 min de leitura'
    },
    {
      id: 2,
      titulo: 'Pitch Perfect: Apresentando sua Startup',
      descricao: 'Dicas para criar um pitch irresistível para investidores',
      formato: 'Vídeos',
      duracao: '30 min',
      url: 'https://example.com/pitch-perfect-video.mp4',
      dataPublicacao: '10 de julho de 2023',
      proximosVideos: [
        { titulo: 'Negociação com Investidores', duracao: '25 minutos' },
        { titulo: 'Estruturando seu Modelo de Negócio', duracao: '35 minutos' }
      ]
    },
  ],
  investidor: [
    {
      id: 5,
      titulo: 'Análise Fundamentalista para Iniciantes',
      descricao: 'Aprenda a avaliar empresas usando indicadores financeiros',
      formato: 'Artigos',
      duracao: '20 min de leitura'
    },
    {
      id: 6,
      titulo: 'Estratégias de Diversificação de Portfólio',
      descricao: 'Como minimizar riscos e maximizar retornos',
      formato: 'Vídeos',
      duracao: '40 min',
      url: 'https://example.com/diversificacao-portfolio-video.mp4',
      dataPublicacao: '5 de agosto de 2023',
      proximosVideos: [
        { titulo: 'Investindo em Renda Fixa', duracao: '30 minutos' },
        { titulo: 'Análise Técnica para Investidores', duracao: '45 minutos' }
      ]
    },
  ],
  programador: [
    {
      id: 9,
      titulo: 'Arquitetura de Microserviços',
      descricao: 'Construa aplicações escaláveis e resilientes',
      formato: 'Artigos',
      duracao: '25 min de leitura'
    },
    {
      id: 10,
      titulo: 'Machine Learning na Prática',
      descricao: 'Implementando modelos de ML em projetos reais',
      formato: 'Vídeos',
      duracao: '60 min',
      url: 'https://example.com/machine-learning-pratica-video.mp4',
      dataPublicacao: '20 de setembro de 2023',
      proximosVideos: [
        { titulo: 'Deep Learning com TensorFlow', duracao: '55 minutos' },
        { titulo: 'Processamento de Linguagem Natural', duracao: '50 minutos' }
      ]
    },
  ]
}

const conteudosFiltrados = computed(() => {
  let filteredContent = conteudos[currentUserType.value] || []

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

  return filteredContent
})

const acessarConteudo = (conteudoId) => {
  selectedContent.value = conteudos[currentUserType.value].find(item => item.id === conteudoId)
}

const voltarParaBiblioteca = () => {
  selectedContent.value = null
  router.push('/biblioteca')
}

onMounted(() => {
  const conteudoId = Number(route.params.conteudoId)
  const tipo = route.query.tipo

  if (conteudoId && tipo) {
    const conteudo = conteudos[currentUserType.value].find(item => item.id === conteudoId)
    if (conteudo && conteudo.formato.toLowerCase() === tipo) {
      selectedContent.value = conteudo
    }
  }
})

const getIconForFormato = (formato) => {
  switch (formato) {
    case 'Artigos': return 'DocumentText'
    case 'Vídeos': return 'Video'
    case 'Podcasts': return 'Headphones'
    case 'E-books': return 'BookOpen'
    default: return 'File'
  }
}
</script>

<style scoped>
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>

