<template>
    <div class="min-h-screen bg-gradient-to-b from-blue-600 to-blue-800 p-4 pb-20">
      <!-- Boas-vindas e resumo -->
      <div class="text-white mb-6">
        <h1 class="text-2xl font-bold mb-2">Bem-vindo, {{ usuario.nome }}!</h1>
        <p class="text-white/80">{{ saudacao }}</p>
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
            class="bg-blue-500 h-2 rounded-full transition-all duration-500 ease-out"
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
          <button @click="verTodosConteudos" class="text-blue-300 text-sm">Ver todos</button>
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
        <div class="bg-blue-500/20 rounded-lg p-4">
          <h3 class="text-white font-semibold mb-2">Recompensa em Destaque</h3>
          <p class="text-white/80 text-sm mb-2">{{ recompensaDestaque.nome }}</p>
          <div class="flex justify-between items-center">
            <span class="text-white/80 text-sm">Custo: {{ recompensaDestaque.custo }} moedas</span>
            <button @click="resgatarRecompensa" class="bg-blue-500 text-white text-sm px-4 py-1 rounded-full">
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
  
  const router = useRouter()
  
  const usuario = ref({
    nome: 'João',
    nivel: 3,
    xp: 2750,
    moedas: 1250
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
  
  const conteudoDestaque = [
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
      duracao: '45 min'
    }
  ]
  
  const recompensaDestaque = {
    nome: 'Mentoria Individual - 1h',
    custo: 1000
  }
  
  const continuarCurso = () => {
    // Implementar navegação para o último curso acessado
    console.log('Continuando curso:', ultimoCurso)
    // Exemplo de navegação (ajuste conforme necessário):
    // router.push({ name: 'curso', params: { id: ultimoCursoId } })
  }
  
  const proximaMentoria = () => {
    // Implementar navegação para a página de mentorias
    console.log('Acessando próxima mentoria')
    // Exemplo de navegação (ajuste conforme necessário):
    // router.push({ name: 'mentorias' })
  }
  
  const verTodosConteudos = () => {
    // Navegar para a página da biblioteca
    router.push('/biblioteca')
  }
  
  const acessarConteudo = (conteudoId) => {
    // Navegar para o conteúdo específico
    console.log('Acessando conteúdo:', conteudoId)
    if (conteudoId === 1) {
      // Artigo
      router.push({ name: 'biblioteca', params: { conteudoId }, query: { tipo: 'artigo' } })
    } else if (conteudoId === 2) {
      // Vídeo
      router.push({ name: 'biblioteca', params: { conteudoId }, query: { tipo: 'video' } })
    }
  }
  
  const resgatarRecompensa = () => {
    // Implementar lógica para resgatar a recompensa
    console.log('Resgatando recompensa:', recompensaDestaque.nome)
    // Exemplo de navegação (ajuste conforme necessário):
    // router.push({ name: 'recompensas', query: { resgatar: recompensaDestaque.id } })
  }
  </script>
  
  
