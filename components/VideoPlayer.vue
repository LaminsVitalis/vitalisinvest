<template>
  <div :class="['min-h-screen bg-gradient-to-b', colorScheme.gradient]">
    <div class="container mx-auto px-4 py-8">
      <button 
        @click="$emit('voltar')"
        :class="[colorScheme.buttonPrimary, 'text-white font-bold py-2 px-4 rounded-full transition-colors mb-6']"
      >
        Voltar para Biblioteca
      </button>
      
      <h1 class="text-3xl font-bold mb-6 text-white">{{ video.titulo }}</h1>
      
      <!-- Player de vídeo -->
      <div class="relative aspect-video mb-8">
        <video
          ref="videoPlayer"
          class="w-full h-full rounded-lg"
          @click="togglePlay"
          @timeupdate="updateProgress"
        >
          <source :src="video.url" type="video/mp4">
          Seu navegador não suporta o elemento de vídeo.
        </video>
        
        <!-- Controles personalizados -->
        <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
          <div class="flex items-center justify-between">
            <button @click="togglePlay" class="text-white hover:text-blue-300 transition-colors">
              <Play v-if="!isPlaying" class="w-8 h-8" />
              <Pause v-else class="w-8 h-8" />
            </button>
            <div class="flex-1 mx-4">
              <div class="w-full bg-white/30 rounded-full h-2 cursor-pointer" @click="seek">
                <div 
                  :class="[colorScheme.buttonPrimary, 'h-2 rounded-full transition-all duration-300 ease-out']"
                  :style="{ width: `${progress}%` }"
                ></div>
              </div>
            </div>
            <button @click="toggleFullscreen" class="text-white hover:text-blue-300 transition-colors">
              <Maximize2 class="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
  
      <!-- Informações do vídeo -->
      <div :class="[colorScheme.cardBg, 'rounded-lg p-6 mb-8']">
        <h2 class="text-xl font-semibold mb-2 text-white">Sobre este vídeo</h2>
        <p class="text-white/80 mb-4">{{ video.descricao }}</p>
        <div class="flex items-center space-x-4 text-sm text-white/60">
          <span class="flex items-center">
            <Clock class="w-4 h-4 mr-1" />
            {{ video.duracao }}
          </span>
          <span class="flex items-center">
            <Calendar class="w-4 h-4 mr-1" />
            {{ video.dataPublicacao }}
          </span>
        </div>
      </div>
  
      <!-- Próximos vídeos -->
      <div>
        <h2 class="text-xl font-semibold mb-4 text-white">Próximos vídeos</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div 
            v-for="(proximoVideo, index) in video.proximosVideos" 
            :key="index"
            :class="[colorScheme.cardBg, 'rounded-lg overflow-hidden hover:bg-white/20 transition-colors cursor-pointer']"
          >
            <div :class="[colorScheme.buttonSecondary, 'aspect-video relative']">
              <Play class="w-12 h-12 text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-70" />
            </div>
            <div class="p-4">
              <h3 class="font-semibold mb-1 text-white">{{ proximoVideo.titulo }}</h3>
              <p class="text-sm text-white/60">{{ proximoVideo.duracao }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  </template>
  
  <script setup>
  import { ref, onMounted, onUnmounted } from 'vue'
  import { Play, Pause, Maximize2, Clock, Calendar } from 'lucide-vue-next'
  import { useUserType } from '~/composables/useUserType'
  
  const { colorScheme } = useUserType()
  
  const props = defineProps({
  video: {
    type: Object,
    required: true
  }
  })
  
  const emit = defineEmits(['voltar'])
  
  const videoPlayer = ref(null)
  const isPlaying = ref(false)
  const progress = ref(0)
  
  const togglePlay = () => {
  if (videoPlayer.value.paused) {
    videoPlayer.value.play()
    isPlaying.value = true
  } else {
    videoPlayer.value.pause()
    isPlaying.value = false
  }
  }
  
  const updateProgress = () => {
  const value = (videoPlayer.value.currentTime / videoPlayer.value.duration) * 100
  progress.value = isNaN(value) ? 0 : value
  }
  
  const seek = (event) => {
  const rect = event.target.getBoundingClientRect()
  const x = event.clientX - rect.left
  const clickedValue = x / rect.width
  videoPlayer.value.currentTime = clickedValue * videoPlayer.value.duration
  }
  
  const toggleFullscreen = () => {
  if (!document.fullscreenElement) {
    videoPlayer.value.requestFullscreen()
  } else {
    document.exitFullscreen()
  }
  }
  
  onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
  })
  
  onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
  })
  
  const handleKeydown = (event) => {
  if (event.code === 'Space') {
    event.preventDefault()
    togglePlay()
  }
  }
  </script>
  
  