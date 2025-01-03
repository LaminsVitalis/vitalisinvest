<template>
  <div :class="['min-h-screen bg-gradient-to-b', colorScheme.gradient]">
    <!-- Header -->
    <div :class="[colorScheme.header, 'sticky top-0 backdrop-blur-md z-10 pb-4']">
      <h2 class="text-2xl font-bold text-white mb-6 p-4">Recompensas</h2>
      
      <div class="flex justify-between items-center px-4 mb-4">
        <span class="text-white text-lg">Suas Moedas:</span>
        <span :class="[colorScheme.buttonPrimary, 'text-2xl font-bold px-4 py-1 rounded-full']">
          {{ userCoins }}
        </span>
      </div>
    </div>

    <div class="p-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <div 
        v-for="reward in rewards" 
        :key="reward.id"
        :class="[colorScheme.cardBg, 'backdrop-blur-md rounded-lg p-4']"
      >
        <h3 class="text-white font-semibold text-lg mb-2">{{ reward.name }}</h3>
        <p class="text-white/80 mb-4">{{ reward.description }}</p>
        <div class="flex justify-between items-center">
          <span class="text-white/80">Custo: {{ reward.cost }} moedas</span>
          <button 
            @click="redeemReward(reward)"
            :class="[
              'px-4 py-2 rounded-full text-sm transition-colors',
              userCoins >= reward.cost
                ? colorScheme.buttonPrimary
                : 'bg-white/20 text-white/60 cursor-not-allowed'
            ]"
            :disabled="userCoins < reward.cost"
          >
            Resgatar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useUserType } from '~/composables/useUserType'

const { colorScheme } = useUserType()

const userCoins = ref(1000)

const rewards = [
  {
    id: 1,
    name: 'Mentoria Individual',
    description: '1 hora de mentoria individual com um especialista',
    cost: 500
  },
  {
    id: 2,
    name: 'Curso Premium',
    description: 'Acesso a um curso premium exclusivo',
    cost: 750
  },
  {
    id: 3,
    name: 'E-book Exclusivo',
    description: 'E-book com conteúdo exclusivo sobre sua área de interesse',
    cost: 300
  },
  {
    id: 4,
    name: 'Certificado de Conclusão',
    description: 'Certificado oficial de conclusão de uma trilha educacional',
    cost: 1000
  }
]

const redeemReward = (reward) => {
  if (userCoins.value >= reward.cost) {
    userCoins.value -= reward.cost
    alert(`Parabéns! Você resgatou a recompensa: ${reward.name}`)
  }
}
</script>

  