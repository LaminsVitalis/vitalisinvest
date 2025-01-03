import { ref, computed } from 'vue'

const userType = ref('empreendedor')

export function useUserType() {
  const colorScheme = computed(() => {
    switch (userType.value) {
      case 'empreendedor':
        return {
            primary: '#3B82F6',
            secondary: '#60A5FA',
            gradient: 'from-[#3B82F6] via-[#60A5FA] to-[#93C5FD]',
            header: 'bg-[#3B82F6]/80',
            buttonPrimary: 'bg-[#60A5FA] hover:bg-[#3B82F6] text-white',
            buttonSecondary: 'bg-[#93C5FD] hover:bg-[#60A5FA] text-white',
            cardBg: 'bg-white/20',
            text: 'text-white'
          }
      case 'investidor':
        return {
          primary: '#45B7D1',
          secondary: '#F7B801',
          gradient: 'from-[#45B7D1] via-[#5BC3DB] to-[#F7B801]',
          header: 'bg-[#45B7D1]/80',
          buttonPrimary: 'bg-[#F7B801] hover:bg-[#e0a800] text-white',
          buttonSecondary: 'bg-[#45B7D1] hover:bg-[#3da2b9] text-white',
          cardBg: 'bg-white/10',
          text: 'text-white'
        }
      case 'programador':
        return {
          primary: '#6B5B95',
          secondary: '#88B04B',
          gradient: 'from-[#6B5B95] via-[#7C6BA1] to-[#88B04B]',
          header: 'bg-[#6B5B95]/80',
          buttonPrimary: 'bg-[#88B04B] hover:bg-[#779a41] text-white',
          buttonSecondary: 'bg-[#6B5B95] hover:bg-[#5d4f82] text-white',
          cardBg: 'bg-white/10',
          text: 'text-white'
        }
      default:
        return {
          primary: '#FF6B6B',
          secondary: '#4ECDC4',
          gradient: 'from-[#FF6B6B] via-[#FF8E8E] to-[#4ECDC4]',
          header: 'bg-[#FF6B6B]/80',
          buttonPrimary: 'bg-[#4ECDC4] hover:bg-[#45b7aa] text-white',
          buttonSecondary: 'bg-[#FF6B6B] hover:bg-[#ff5252] text-white',
          cardBg: 'bg-white/10',
          text: 'text-white'
        }
    }
  })

  function setUserType(type) {
    userType.value = type
  }

  return {
    userType,
    colorScheme,
    setUserType
  }
}

