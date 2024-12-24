<template>
    <div class="min-h-screen p-4">
      <h2 class="text-2xl font-bold text-white mb-6">Recompensas</h2>
  
      <!-- Saldo de moedas -->
      <div class="bg-white/10 backdrop-blur-md rounded-lg p-4 mb-6">
        <div class="flex justify-between items-center">
          <div>
            <h3 class="text-white font-semibold">Suas Moedas Vitalis</h3>
            <p class="text-white/80 text-sm">Use para resgatar recompensas exclusivas</p>
          </div>
          <div class="text-right">
            <span class="text-2xl font-bold text-white">1.250</span>
            <p class="text-white/80 text-xs">moedas</p>
          </div>
        </div>
      </div>
  
      <!-- Lista de recompensas -->
      <div class="space-y-4">
        <div 
          v-for="recompensa in recompensas" 
          :key="recompensa.id"
          class="bg-white/10 backdrop-blur-md rounded-lg p-4"
        >
          <div class="flex items-start gap-4">
            <div class="w-16 h-16 bg-blue-500 rounded-lg flex items-center justify-center">
              <component :is="recompensa.icone" class="w-8 h-8 text-white" />
            </div>
            <div class="flex-1">
              <h3 class="text-white font-semibold mb-1">{{ recompensa.titulo }}</h3>
              <p class="text-white/80 text-sm mb-2">{{ recompensa.descricao }}</p>
              <div class="flex justify-between items-center">
                <span class="text-white/60 text-sm flex items-center gap-1">
                  <Coins class="w-4 h-4" />
                  {{ recompensa.custo }} moedas
                </span>
                <button 
                  :class="[
                    'px-4 py-1 rounded-full text-sm',
                    recompensa.custo <= 1250
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-500 text-white/60 cursor-not-allowed'
                  ]"
                  :disabled="recompensa.custo > 1250"
                >
                  {{ recompensa.custo <= 1250 ? 'Resgatar' : 'Moedas insuficientes' }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { Users, BookOpen, Award, Gift, Coins } from 'lucide-vue-next'
  
  const recompensas = [
    {
      id: 1,
      titulo: 'Mentoria Individual',
      descricao: 'Sessão de 1 hora com um especialista em investimentos',
      custo: 1000,
      icone: Users
    },
    {
      id: 2,
      titulo: 'E-book Exclusivo',
      descricao: 'Estratégias avançadas de investimento em ações',
      custo: 500,
      icone: BookOpen
    },
    {
      id: 3,
      titulo: 'Curso Premium',
      descricao: 'Acesso a um curso completo sobre análise fundamentalista',
      custo: 1500,
      icone: Award
    },
    {
      id: 4,
      titulo: 'Brinde Vitalis',
      descricao: 'Kit exclusivo com produtos personalizados Vitalis',
      custo: 800,
      icone: Gift
    }
  ]
  </script>