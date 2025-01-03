<template>
    <div class="bg-white/10 backdrop-blur-md rounded-lg p-4 mb-6">
      <h2 class="text-lg font-semibold text-white mb-4">Selecione seu perfil</h2>
      <div class="flex flex-col space-y-2">
        <button
          v-for="type in userTypes"
          :key="type.value"
          @click="selectUserType(type.value)"
          :class="[
            'px-4 py-2 rounded-full text-sm transition-colors',
            selectedType === type.value
              ? `bg-[${colorScheme.primary}] text-white`
              : 'bg-white/20 text-white/80 hover:bg-white/30'
          ]"
        >
          {{ type.label }}
        </button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, watch } from 'vue'
  import { useUserType } from '~/composables/useUserType'
  
  const { userType, colorScheme, setUserType } = useUserType()
  
  const props = defineProps({
    initialType: {
      type: String,
      default: 'empreendedor'
    }
  })
  
  const emit = defineEmits(['update:userType'])
  
  const userTypes = [
    { value: 'empreendedor', label: 'Empreendedor' },
    { value: 'investidor', label: 'Investidor' },
    { value: 'programador', label: 'Programador' }
  ]
  
  const selectedType = ref(props.initialType)
  
  watch(selectedType, (newType) => {
    setUserType(newType)
    emit('update:userType', newType)
  })
  
  const selectUserType = (type) => {
    selectedType.value = type
  }
  </script>
  
  