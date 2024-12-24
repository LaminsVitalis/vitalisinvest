<template>
    <div class="min-h-screen bg-gradient-to-b from-blue-600 to-blue-800 pb-20">
      <!-- Main content with conditional rendering -->
      <template v-if="!selectedCourse">
        <div class="sticky top-0 bg-blue-600/80 backdrop-blur-md z-10">
          <div class="flex justify-between items-center p-4">
            <h2 class="text-xl font-bold text-white">Trilhas Educacionais</h2>
            <button class="text-white p-2">
              <Filter class="w-5 h-5" />
            </button>
          </div>
          
          <!-- Filtros -->
          <div class="flex gap-2 overflow-x-auto px-4 pb-4">
            <button 
              v-for="nivel in niveis" 
              :key="nivel"
              :class="[
                'px-4 py-1.5 rounded-full whitespace-nowrap text-sm',
                nivelSelecionado === nivel 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-white/10 text-white/80'
              ]"
              @click="nivelSelecionado = nivel"
            >
              {{ nivel }}
            </button>
          </div>
        </div>
  
        <!-- Lista de Trilhas -->
        <div class="p-4 space-y-4">
          <CourseCard 
            v-for="trilha in trilhasFiltradas" 
            :key="trilha.id"
            :course="trilha"
            @acessar-curso="acessarCurso"
          />
        </div>
      </template>
  
      <CourseDisplay 
        v-else
        :course="selectedCourse"
        @voltar="voltarParaTrilhas"
      />
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue'
  import { Filter } from 'lucide-vue-next'
  import CourseCard from '~/components/CourseCard.vue'
  import CourseDisplay from '~/components/CourseDisplay.vue'
  
  const nivelSelecionado = ref('Todos')
  const niveis = ['Todos', 'Iniciante', 'Intermediário', 'Avançado']
  const selectedCourse = ref(null)
  
  const trilhas = [
    {
      id: 1,
      nome: 'Fundamentos de Investimentos',
      descricao: 'Aprenda os conceitos básicos do mercado financeiro',
      nivel: 'Iniciante',
      duracao: '8 horas',
      modulos: 6,
      progresso: 75,
      modulos: [
        {
          titulo: 'Introdução ao Mercado Financeiro',
          descricao: 'Aprenda os conceitos básicos e a estrutura do mercado financeiro.',
          completo: true,
          aulas: [
            'O que é o mercado financeiro?',
            'Principais participantes do mercado',
            'Tipos de investimentos'
          ]
        },
        {
          titulo: 'Análise de Riscos',
          descricao: 'Entenda como avaliar e gerenciar riscos em seus investimentos.',
          completo: false,
          aulas: [
            'Conceitos de risco e retorno',
            'Diversificação de portfólio',
            'Ferramentas de análise de risco'
          ]
        },
        {
          titulo: 'Estratégias de Investimento',
          descricao: 'Explore diferentes estratégias para otimizar seus investimentos.',
          completo: false,
          aulas: [
            'Investimento em valor vs. crescimento',
            'Estratégias de renda fixa',
            'Investimento em dividendos'
          ]
        }
      ]
    },
    {
      id: 2,
      nome: 'Análise Técnica',
      descricao: 'Domine as ferramentas de análise gráfica',
      nivel: 'Intermediário',
      duracao: '12 horas',
      modulos: 8,
      progresso: 30,
      modulos: [
        {
          titulo: 'Fundamentos da Análise Técnica',
          descricao: 'Entenda os princípios básicos da análise técnica.',
          completo: true,
          aulas: [
            'O que é análise técnica?',
            'Tipos de gráficos',
            'Suporte e resistência'
          ]
        },
        {
          titulo: 'Indicadores Técnicos',
          descricao: 'Aprenda a usar os principais indicadores técnicos.',
          completo: false,
          aulas: [
            'Médias móveis',
            'RSI (Índice de Força Relativa)',
            'MACD (Convergência e Divergência de Médias Móveis)'
          ]
        },
        {
          titulo: 'Padrões de Candlestick',
          descricao: 'Identifique e interprete padrões de candlestick.',
          completo: false,
          aulas: [
            'Padrões de reversão',
            'Padrões de continuação',
            'Estratégias de trading com candlesticks'
          ]
        }
      ]
    },
    {
      id: 3,
      nome: 'Gestão de Riscos',
      descricao: 'Aprenda a proteger seus investimentos',
      nivel: 'Avançado',
      duracao: '10 horas',
      modulos: 7,
      progresso: 15,
      modulos: [
        {
          titulo: 'Conceitos Fundamentais de Risco',
          descricao: 'Compreenda os tipos de riscos no mercado financeiro.',
          completo: true,
          aulas: [
            'Risco de mercado',
            'Risco de crédito',
            'Risco operacional'
          ]
        },
        {
          titulo: 'Métricas de Risco',
          descricao: 'Aprenda a calcular e interpretar métricas de risco.',
          completo: false,
          aulas: [
            'Value at Risk (VaR)',
            'Beta e Alfa',
            'Índice de Sharpe'
          ]
        },
        {
          titulo: 'Estratégias de Hedge',
          descricao: 'Explore técnicas para proteger seu portfólio.',
          completo: false,
          aulas: [
            'Hedging com opções',
            'Diversificação eficiente',
            'Uso de derivativos para gestão de risco'
          ]
        }
      ]
    }
  ]
  
  const trilhasFiltradas = computed(() => {
    if (nivelSelecionado.value === 'Todos') return trilhas
    return trilhas.filter(trilha => trilha.nivel === nivelSelecionado.value)
  })
  
  const acessarCurso = (cursoId) => {
    selectedCourse.value = trilhas.find(trilha => trilha.id === cursoId)
  }
  
  const voltarParaTrilhas = () => {
    selectedCourse.value = null
  }
  </script>
  
  