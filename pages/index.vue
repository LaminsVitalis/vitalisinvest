<template>
  <div :class="['min-h-screen bg-gradient-to-b', colorScheme.gradient]" class="p-4 pb-20">

    <!-- Boas-vindas e resumo -->
    <div class="text-white mb-6">
      <h1 class="text-2xl font-bold mb-2">Bem-vindo, {{ usuario.nome }}!</h1>
      <p class="text-white/80">{{ saudacao }}</p>
    </div>

    <!-- Tipo de usuário -->
    <div class="bg-white/10 backdrop-blur-md rounded-lg p-4 mb-6">
      <h2 class="text-lg font-semibold text-white mb-2">Seu Perfil</h2>
      <p class="text-white/80">Tipo: {{ tipoUsuarioFormatado }}</p>
    </div>

    <!-- Progresso geral -->
    <div class="bg-white/10 backdrop-blur-md rounded-lg p-4 mb-6">
      <h2 class="text-lg font-semibold text-white mb-2">Seu Progresso</h2>
      <div class="flex justify-between items-center mb-2">
        <span class="text-white/80">Nível {{ usuario.nivel }}</span>
        <span class="text-white/80">{{ usuario.xp }} / {{ proximoNivel }} XP</span>
      </div>
      <div class="w-full bg-white/20 rounded-full h-2">
        <div 
          :class="`bg-[${colorScheme.secondary}]`"
          class="h-2 rounded-full transition-all duration-500 ease-out"
          :style="{ width: `${(usuario.xp / proximoNivel) * 100}%` }"
        ></div>
      </div>
    </div>

    <!-- Ações rápidas -->
    <div class="grid grid-cols-2 gap-4 mb-6">
      <button @click="continuarCurso" class="bg-white/10 backdrop-blur-md rounded-lg p-4 text-left">
        <GraduationCap class="w-6 h-6 text-white mb-2" />
        <h3 class="text-white font-semibold text-sm">Continuar Curso</h3>
        <p class="text-white/80 text-xs">{{ ultimoCurso }}</p>
      </button>
      <button @click="proximaMentoria" class="bg-white/10 backdrop-blur-md rounded-lg p-4 text-left">
        <Users class="w-6 h-6 text-white mb-2" />
        <h3 class="text-white font-semibold text-sm">Próxima Mentoria</h3>
        <p class="text-white/80 text-xs">{{ proximaMentoriaData }}</p>
      </button>
    </div>

    <!-- Estatísticas rápidas -->
    <div class="grid grid-cols-2 gap-4 mb-6">
      <div v-for="(stat, index) in estatisticasRapidas" :key="index" class="bg-white/10 backdrop-blur-md rounded-lg p-4">
        <h3 class="text-white/60 text-sm mb-1">{{ stat.titulo }}</h3>
        <p class="text-white text-xl font-bold">{{ stat.valor }}</p>
      </div>
    </div>

    <!-- Conteúdo em destaque -->
    <div class="mb-6">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-lg font-semibold text-white">Conteúdo em Destaque</h2>
        <button @click="verTodosConteudos" :class="`text-[${colorScheme.secondary}]`" class="text-sm">Ver todos</button>
      </div>
      <div class="space-y-4">
        <ContentCard
          v-for="item in conteudoDestaque" 
          :key="item.id"
          :item="item"
          @acessar-conteudo="acessarConteudo"
        />
      </div>
    </div>

    <!-- Prévia de recompensas -->
    <div class="bg-white/10 backdrop-blur-md rounded-lg p-4">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-lg font-semibold text-white">Suas Moedas</h2>
        <span class="text-white font-bold">{{ usuario.moedas }}</span>
      </div>
      <div :class="`bg-[${colorScheme.secondary}]/20`" class="rounded-lg p-4">
        <h3 class="text-white font-semibold mb-2">Recompensa em Destaque</h3>
        <p class="text-white/80 text-sm mb-2">{{ recompensaDestaque.nome }}</p>
        <div class="flex justify-between items-center">
          <span class="text-white/80 text-sm">Custo: {{ recompensaDestaque.custo }} moedas</span>
          <button @click="resgatarRecompensa" :class="`bg-[${colorScheme.secondary}]`" class="text-white text-sm px-4 py-1 rounded-full">
            Resgatar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { GraduationCap, Users } from 'lucide-vue-next'
import ContentCard from '~/components/ContentCard.vue'
import { useRouter } from 'vue-router'
import { useUserType } from '~/composables/useUserType'

const router = useRouter()
const { userType, colorScheme } = useUserType()

const usuario = ref({
  nome: 'João',
  nivel: 3,
  xp: 2750,
  moedas: 1250,
})

const currentUserType = computed(() => userType.value)

const tipoUsuarioFormatado = computed(() => {
  const tipos = {
    empreendedor: 'Empreendedor',
    investidor: 'Investidor',
    programador: 'Programador'
  }
  return tipos[currentUserType.value] || 'Usuário'
})

const proximoNivel = 5000
const ultimoCurso = 'Fundamentos de Investimentos'
const proximaMentoriaData = 'Hoje às 15:00'

const saudacao = computed(() => {
  const hora = new Date().getHours()
  if (hora < 12) return 'Bom dia! Pronto para aprender?'
  if (hora < 18) return 'Boa tarde! Que tal continuar seus estudos?'
  return 'Boa noite! Um pouco de estudo antes de dormir?'
})

const estatisticasRapidas = [
  { titulo: 'Cursos Concluídos', valor: 3 },
  { titulo: 'Dias de Acesso', valor: 45 },
  { titulo: 'Mentorias Realizadas', valor: 2 },
  { titulo: 'Artigos Lidos', valor: 12 }
]

const conteudoDestaque = computed(() => {
  const conteudos = {
    empreendedor: [
      {
        id: 1,
        titulo: 'Estratégias de Crescimento para Startups',
        descricao: 'Aprenda técnicas comprovadas para escalar seu negócio',
        formato: 'Artigos',
        duracao: '15 min de leitura'
      },
      {
        id: 2,
        titulo: 'Pitch Perfeito: Como Atrair Investidores',
        descricao: 'Domine a arte de apresentar sua ideia para potenciais investidores',
        formato: 'Vídeos',
        duracao: '30 min'
      }
    ],
    investidor: [
      {
        id: 3,
        titulo: 'Análise Fundamentalista para Iniciantes',
        descricao: 'Aprenda a avaliar empresas usando indicadores financeiros',
        formato: 'Artigos',
        duracao: '20 min de leitura'
      },
      {
        id: 4,
        titulo: 'Diversificação de Portfólio',
        descricao: 'Estratégias para minimizar riscos e maximizar retornos',
        formato: 'Vídeos',
        duracao: '45 min'
      }
    ],
    programador: [
      {
        id: 5,
        titulo: 'Arquitetura de Microserviços',
        descricao: 'Construa aplicações escaláveis e resilientes',
        formato: 'Artigos',
        duracao: '25 min de leitura'
      },
      {
        id: 6,
        titulo: 'Machine Learning na Prática',
        descricao: 'Implementando modelos de ML em projetos reais',
        formato: 'Vídeos',
        duracao: '60 min'
      }
    ]
  }
  return conteudos[currentUserType.value] || []
})

const recompensaDestaque = {
  nome: 'Mentoria Individual - 1h',
  custo: 1000
}

const continuarCurso = () => {
  console.log('Continuando curso:', ultimoCurso)
  // Implementar navegação para o último curso acessado
}

const proximaMentoria = () => {
  console.log('Acessando próxima mentoria')
  // Implementar navegação para a página de mentorias
}

const verTodosConteudos = () => {
  router.push('/biblioteca')
}

const acessarConteudo = (conteudoId) => {
  console.log('Acessando conteúdo:', conteudoId)
  const conteudo = conteudoDestaque.value.find(item => item.id === conteudoId)
  if (conteudo) {
    if (conteudo.formato === 'Artigos') {
      router.push({ name: 'biblioteca', params: { conteudoId }, query: { tipo: 'artigo' } })
    } else if (conteudo.formato === 'Vídeos') {
      router.push({ name: 'biblioteca', params: { conteudoId }, query: { tipo: 'video' } })
    }
  }
}

const resgatarRecompensa = () => {
  console.log('Resgatando recompensa:', recompensaDestaque.nome)
  // Implementar lógica para resgatar a recompensa
}
</script>

