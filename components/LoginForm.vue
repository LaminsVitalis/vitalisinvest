<template>
    <form @submit.prevent="handleSubmit" class="space-y-4">
      <div>
        <label for="email" class="block text-sm font-medium text-white">E-mail</label>
        <input v-model="email" type="email" id="email" required
               class="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white bg-opacity-10" />
      </div>
      <div>
        <label for="password" class="block text-sm font-medium text-white">Senha</label>
        <input v-model="password" type="password" id="password" required
               class="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white bg-opacity-10" />
      </div>
      <button type="submit" 
              class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
        Entrar
      </button>
      <p v-if="error" class="text-red-500 text-sm mt-2">{{ error }}</p>
    </form>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const email = ref('')
  const password = ref('')
  const error = ref('')
  
  const handleSubmit = async () => {
    try {
      // Simular uma chamada de API para autenticação
      const response = await new Promise((resolve, reject) => {
        setTimeout(() => {
          if (email.value === 'usuario@exemplo.com' && password.value === 'senha123') {
            resolve({ success: true, user: { name: 'Usuário Teste' } })
          } else {
            reject(new Error('Credenciais inválidas'))
          }
        }, 1000)
      })
  
      console.log('Login bem-sucedido:', response.user)
      // Aqui você normalmente armazenaria o token de autenticação e redirecionaria o usuário
    } catch (err) {
      error.value = err.message
    }
  }
  </script>
  
  