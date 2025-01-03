<template>
  <div :class="['min-h-screen bg-gradient-to-b', colorScheme.gradient]">
    <!-- Main content with conditional rendering -->
    <template v-if="!selectedCourse">
      <div :class="[colorScheme.header, 'sticky top-0 backdrop-blur-md z-10']">
        <div class="flex justify-between items-center p-4">
          <h2 class="text-xl font-bold text-white">Trilhas Educacionais</h2>
          <button class="text-white p-2">
            <Filter class="w-5 h-5" />
          </button>
        </div>
        
        <!-- Filtros -->
        <div class="flex gap-2 overflow-x-auto px-4 pb-4 scrollbar-hide">
          <button 
            v-for="nivel in niveis" 
            :key="nivel"
            :class="[
              'px-4 py-1.5 rounded-full whitespace-nowrap text-sm transition-colors',
              nivelSelecionado === nivel 
                ? colorScheme.buttonPrimary
                : 'bg-white/10 text-white/80 hover:bg-white/20'
            ]"
            @click="nivelSelecionado = nivel"
          >
            {{ nivel }}
          </button>
        </div>
      </div>

      <!-- Lista de Trilhas -->
      <div class="p-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div 
          v-for="trilha in trilhasFiltradas" 
          :key="trilha.id"
          :class="[colorScheme.cardBg, 'backdrop-blur-md rounded-lg p-4']"
        >
          <div class="flex justify-between items-start mb-4">
            <div>
              <h3 class="text-white font-semibold">{{ trilha.nome }}</h3>
              <p class="text-white/80 text-sm">{{ trilha.descricao }}</p>
            </div>
            <span class="bg-white/20 text-white text-xs px-3 py-1 rounded-full">
              {{ trilha.nivel }}
            </span>
          </div>
          
          <div class="flex items-center gap-2 mb-4">
            <Clock class="w-4 h-4 text-white/60" />
            <span class="text-white/60 text-sm">{{ trilha.duracao }}</span>
            <Book class="w-4 h-4 text-white/60 ml-4" />
            <span class="text-white/60 text-sm">{{ trilha.modulos?.length || 0 }} módulos</span>
          </div>
          
          <div class="w-full bg-white/20 rounded-full h-2 mb-2">
            <div 
              :class="[colorScheme.buttonPrimary, 'h-2 rounded-full transition-all duration-300']"
              :style="{ width: `${trilha.progresso}%` }"
            ></div>
          </div>
          <div class="flex justify-between items-center">
            <p class="text-white/80 text-sm">{{ trilha.progresso }}% concluído</p>
            <button 
              @click="acessarCurso(trilha.id)"
              :class="[colorScheme.buttonPrimary, 'px-4 py-1.5 rounded-full text-sm transition-colors']"
            >
              Acessar Curso
            </button>
          </div>
        </div>
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
import { Filter, Clock, Book } from 'lucide-vue-next'
import CourseCard from '~/components/CourseCard.vue'
import CourseDisplay from '~/components/CourseDisplay.vue'
import { useUserType } from '~/composables/useUserType'

const { colorScheme, userType } = useUserType()
const nivelSelecionado = ref('Todos')
const niveis = ['Todos', 'Iniciante', 'Intermediário', 'Avançado']
const selectedCourse = ref(null)

const currentUserType = computed(() => userType.value)

const trilhas = {
  empreendedor: [
    {
      id: 1,
      nome: 'Fundamentos de Empreendedorismo',
      descricao: 'Aprenda os conceitos básicos para iniciar seu próprio negócio',
      nivel: 'Iniciante',
      duracao: '10 horas',
      modulos: 7,
      progresso: 0,
      modulos: [
        {
          titulo: 'Identificando Oportunidades de Negócio',
          descricao: 'Aprenda a reconhecer e avaliar oportunidades de mercado.',
          completo: false,
          aulas: [
            'Análise de mercado',
            'Identificação de problemas e soluções',
            'Validação de ideias de negócio'
          ]
        },
        {
          titulo: 'Planejamento Estratégico',
          descricao: 'Desenvolva um plano de negócios sólido para sua startup.',
          completo: false,
          aulas: [
            'Definição de missão e visão',
            'Análise SWOT',
            'Estabelecimento de metas e objetivos'
          ]
        },
        {
          titulo: 'Finanças para Empreendedores',
          descricao: 'Entenda os fundamentos financeiros essenciais para gerir seu negócio.',
          completo: false,
          aulas: [
            'Fluxo de caixa',
            'Precificação de produtos e serviços',
            'Captação de recursos e investimentos'
          ]
        }
      ]
    },
    {
      id: 2,
      nome: 'Marketing Digital para Startups',
      descricao: 'Estratégias de marketing online para impulsionar seu negócio',
      nivel: 'Intermediário',
      duracao: '15 horas',
      modulos: 8,
      progresso: 25,
      modulos: [
        {
          titulo: 'Fundamentos de Marketing Digital',
          descricao: 'Entenda os princípios básicos do marketing online.',
          completo: true,
          aulas: [
            'Introdução ao marketing digital',
            'Comportamento do consumidor online',
            'Canais de marketing digital'
          ]
        },
        {
          titulo: 'Estratégias de Conteúdo',
          descricao: 'Aprenda a criar e distribuir conteúdo relevante para seu público.',
          completo: false,
          aulas: [
            'Criação de personas',
            'Planejamento de conteúdo',
            'SEO e otimização de conteúdo'
          ]
        },
        {
          titulo: 'Mídias Sociais para Negócios',
          descricao: 'Utilize as redes sociais para promover sua startup.',
          completo: false,
          aulas: [
            'Estratégias para principais plataformas',
            'Criação de campanhas',
            'Análise de métricas e ROI'
          ]
        }
      ]
    }
  ],
  investidor: [
    {
      id: 3,
      nome: 'Análise de Investimentos',
      descricao: 'Aprenda a avaliar diferentes oportunidades de investimento',
      nivel: 'Intermediário',
      duracao: '20 horas',
      modulos: 10,
      progresso: 50,
      modulos: [
        {
          titulo: 'Fundamentos da Análise Fundamentalista',
          descricao: 'Entenda como avaliar a saúde financeira de empresas.',
          completo: true,
          aulas: [
            'Leitura de demonstrativos financeiros',
            'Indicadores fundamentalistas',
            'Valuation de empresas'
          ]
        },
        {
          titulo: 'Análise Técnica',
          descricao: 'Aprenda a interpretar gráficos e identificar tendências.',
          completo: false,
          aulas: [
            'Conceitos básicos de análise técnica',
            'Principais indicadores técnicos',
            'Padrões gráficos'
          ]
        },
        {
          titulo: 'Gestão de Riscos',
          descricao: 'Estratégias para minimizar riscos em investimentos.',
          completo: false,
          aulas: [
            'Diversificação de portfólio',
            'Hedge e proteção patrimonial',
            'Análise de cenários e stress testing'
          ]
        }
      ]
    }
  ],
  programador: [
    {
      id: 4,
      nome: 'Desenvolvimento Web Full Stack',
      descricao: 'Domine o desenvolvimento web do front-end ao back-end',
      nivel: 'Avançado',
      duracao: '40 horas',
      modulos: 12,
      progresso: 75,
      modulos: [
        {
          titulo: 'Front-end Avançado',
          descricao: 'Aprenda técnicas avançadas de desenvolvimento front-end.',
          completo: true,
          aulas: [
            'Frameworks JavaScript modernos',
            'Otimização de performance',
            'Acessibilidade e SEO'
          ]
        },
        {
          titulo: 'Back-end e APIs',
          descricao: 'Construa servidores robustos e APIs escaláveis.',
          completo: true,
          aulas: [
            'Arquitetura de microserviços',
            'Design de APIs RESTful',
            'Autenticação e segurança'
          ]
        },
        {
          titulo: 'DevOps e Implantação',
          descricao: 'Aprenda a implantar e manter aplicações em produção.',
          completo: false,
          aulas: [
            'Containerização com Docker',
            'CI/CD pipelines',
            'Monitoramento e logging'
          ]
        }
      ]
    }
  ]
}

const trilhasFiltradas = computed(() => {
  let filteredTrilhas = trilhas[currentUserType.value] || []
  if (nivelSelecionado.value !== 'Todos') {
    filteredTrilhas = filteredTrilhas.filter(trilha => trilha.nivel === nivelSelecionado.value)
  }
  return filteredTrilhas
})

const acessarCurso = (cursoId) => {
  selectedCourse.value = trilhas[currentUserType.value].find(trilha => trilha.id === cursoId)
}

const voltarParaTrilhas = () => {
  selectedCourse.value = null
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

