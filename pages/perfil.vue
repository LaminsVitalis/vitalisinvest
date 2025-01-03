<template>
  <div :class="['min-h-screen bg-gradient-to-b', colorScheme.gradient]" class="p-4 pb-20">
    <h2 class="text-2xl font-bold text-white mb-6">Seu Perfil</h2>

    <!-- Informações do usuário -->
    <div class="bg-white/10 backdrop-blur-md rounded-lg p-6 mb-6">
      <div class="flex items-center gap-4 mb-4">
        <div class="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center">
          <User class="w-10 h-10 text-white" />
        </div>
        <div>
          <h3 class="text-white font-semibold text-xl">{{ usuario.nome }}</h3>
          <p class="text-white/80">{{ tipoUsuarioFormatado }}</p>
        </div>
      </div>
      <div class="space-y-2">
        <div class="flex items-center gap-2">
          <Mail class="w-4 h-4 text-white/60" />
          <span class="text-white/80">{{ usuario.email }}</span>
        </div>
        <div class="flex items-center gap-2">
          <Phone class="w-4 h-4 text-white/60" />
          <span class="text-white/80">{{ usuario.telefone }}</span>
        </div>
      </div>
    </div>

    <!-- Estatísticas -->
    <div class="grid grid-cols-2 gap-4 mb-6">
      <div v-for="(stat, index) in estatisticas" :key="index" class="bg-white/10 backdrop-blur-md rounded-lg p-4">
        <h4 class="text-white/60 text-sm mb-1">{{ stat.titulo }}</h4>
        <p class="text-white text-2xl font-bold">{{ stat.valor }}</p>
      </div>
    </div>

    <!-- Opções de perfil -->
    <div class="space-y-4">
      <button @click="editarPerfil" class="w-full bg-white/10 backdrop-blur-md rounded-lg p-4 flex items-center justify-between">
        <span class="text-white">Editar Perfil</span>
        <ChevronRight class="w-5 h-5 text-white/60" />
      </button>
      <button @click="alterarTipoUsuario" class="w-full bg-white/10 backdrop-blur-md rounded-lg p-4 flex items-center justify-between">
        <span class="text-white">Alterar Tipo de Usuário</span>
        <ChevronRight class="w-5 h-5 text-white/60" />
      </button>
      <button @click="toggleNotificacoes" class="w-full bg-white/10 backdrop-blur-md rounded-lg p-4 flex items-center justify-between">
        <span class="text-white">Notificações</span>
        <div class="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
          <input 
            type="checkbox" 
            name="toggle" 
            id="toggle" 
            :checked="notificacoesAtivadas"
            class="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
          />
          <label for="toggle" class="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
        </div>
      </button>
      <button @click="togglePrivacidade" class="w-full bg-white/10 backdrop-blur-md rounded-lg p-4 flex items-center justify-between">
        <span class="text-white">Perfil Privado</span>
        <div class="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
          <input 
            type="checkbox" 
            name="toggle-privacidade" 
            id="toggle-privacidade" 
            :checked="perfilPrivado"
            class="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
          />
          <label for="toggle-privacidade" class="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
        </div>
      </button>
      <button class="w-full bg-white/10 backdrop-blur-md rounded-lg p-4 flex items-center justify-between">
        <span class="text-white">Ajuda e Suporte</span>
        <ChevronRight class="w-5 h-5 text-white/60" />
      </button>
      <button @click="logout" class="w-full bg-red-500/20 backdrop-blur-md rounded-lg p-4 flex items-center justify-between">
        <span class="text-red-500">Sair da Conta</span>
        <LogOut class="w-5 h-5 text-red-500" />
      </button>
    </div>

    <!-- Modal de edição de perfil -->
    <div v-if="mostrarModalEdicao" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div :class="['bg-gradient-to-b', colorScheme.gradient]" class="rounded-lg p-6 w-full max-w-md shadow-xl">
        <h3 class="text-2xl font-bold mb-6 text-white">Editar Perfil</h3>
        <form @submit.prevent="salvarPerfil" class="space-y-6">
          <div>
            <label for="nome" class="block text-sm font-medium text-white mb-1">Nome</label>
            <input type="text" id="nome" v-model="usuarioEditado.nome" class="w-full px-3 py-2 bg-white/10 rounded-md text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500">
          </div>
          <div>
            <label for="email" class="block text-sm font-medium text-white mb-1">Email</label>
            <input type="email" id="email" v-model="usuarioEditado.email" class="w-full px-3 py-2 bg-white/10 rounded-md text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500">
          </div>
          <div>
            <label for="telefone" class="block text-sm font-medium text-white mb-1">Telefone</label>
            <input type="tel" id="telefone" v-model="usuarioEditado.telefone" class="w-full px-3 py-2 bg-white/10 rounded-md text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500">
          </div>
          <div>
            <label for="senha" class="block text-sm font-medium text-white mb-1">Nova Senha</label>
            <input type="password" id="senha" v-model="usuarioEditado.senha" class="w-full px-3 py-2 bg-white/10 rounded-md text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Deixe em branco para não alterar">
          </div>
          <div>
            <label for="confirmarSenha" class="block text-sm font-medium text-white mb-1">Confirmar Nova Senha</label>
            <input type="password" id="confirmarSenha" v-model="usuarioEditado.confirmarSenha" class="w-full px-3 py-2 bg-white/10 rounded-md text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Confirme a nova senha">
          </div>
          <div class="flex justify-end space-x-2 pt-4">
            <button type="button" @click="cancelarEdicao" class="px-4 py-2 border border-white/30 rounded-md text-sm font-medium text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">
              Cancelar
            </button>
            <button 
              type="submit" 
              class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              :class="['bg-opacity-80 hover:bg-opacity-100', `bg-[${colorScheme.secondary}]`]"
            >
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Modal de alteração de tipo de usuário -->
    <div v-if="mostrarModalTipoUsuario" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div :class="['bg-gradient-to-b', colorScheme.gradient]" class="rounded-lg p-6 w-full max-w-md shadow-xl">
        <h3 class="text-2xl font-bold mb-6 text-white">Alterar Tipo de Usuário</h3>
        <div class="space-y-4">
          <button
            v-for="type in userTypes"
            :key="type.value"
            @click="selecionarTipoUsuario(type.value)"
            :class="[
              'w-full px-4 py-2 rounded-full text-sm transition-colors',
              userType === type.value
                ? `bg-[${colorScheme.secondary}] text-white`
                : 'bg-white/20 text-white/80 hover:bg-white/30'
            ]"
          >
            {{ type.label }}
          </button>
        </div>
        <div class="flex justify-end space-x-2 pt-4">
          <button @click="cancelarAlteracaoTipoUsuario" class="px-4 py-2 border border-white/30 rounded-md text-sm font-medium text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">
            Cancelar
          </button>
          <button 
            @click="salvarTipoUsuario" 
            class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            :class="['bg-opacity-80 hover:bg-opacity-100', `bg-[${colorScheme.secondary}]`]"
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { User, Mail, Phone, ChevronRight, LogOut } from 'lucide-vue-next'
import { useUserType } from '~/composables/useUserType'

const { userType, colorScheme, setUserType } = useUserType()

const usuario = ref({
  nome: 'João Silva',
  email: 'joao.silva@email.com',
  telefone: '(11) 98765-4321',
})

const tipoUsuarioFormatado = computed(() => {
  const tipos = {
    empreendedor: 'Empreendedor',
    investidor: 'Investidor',
    programador: 'Programador'
  }
  return tipos[userType.value] || 'Usuário'
})

const estatisticas = [
  { titulo: 'Trilhas Concluídas', valor: 3 },
  { titulo: 'Moedas Acumuladas', valor: 1250 },
  { titulo: 'Mentorias Realizadas', valor: 2 },
  { titulo: 'Dias de Acesso', valor: 45 }
]

const notificacoesAtivadas = ref(true)
const perfilPrivado = ref(false)
const mostrarModalEdicao = ref(false)
const mostrarModalTipoUsuario = ref(false)
const usuarioEditado = ref({ ...usuario.value, senha: '', confirmarSenha: '' })

const userTypes = [
  { value: 'empreendedor', label: 'Empreendedor' },
  { value: 'investidor', label: 'Investidor' },
  { value: 'programador', label: 'Programador' }
]

const toggleNotificacoes = () => {
  notificacoesAtivadas.value = !notificacoesAtivadas.value
  // Aqui você pode adicionar lógica para salvar a preferência no backend
}

const togglePrivacidade = () => {
  perfilPrivado.value = !perfilPrivado.value
  // Aqui você pode adicionar lógica para salvar a preferência no backend
}

const editarPerfil = () => {
  usuarioEditado.value = { ...usuario.value, senha: '', confirmarSenha: '' }
  mostrarModalEdicao.value = true
}

const salvarPerfil = () => {
  if (usuarioEditado.value.senha !== usuarioEditado.value.confirmarSenha) {
    alert('As senhas não coincidem. Por favor, tente novamente.')
    return
  }

  // Aqui vocêpode adicionar validação adicional e lógica para salvar as alterações no backend
  Object.assign(usuario.value, {
    nome: usuarioEditado.value.nome,
    email: usuarioEditado.value.email,
    telefone: usuarioEditado.value.telefone
  })

  if (usuarioEditado.value.senha) {
    // Lógica para atualizar a senha no backend
    console.log('Senha atualizada')
  }

  mostrarModalEdicao.value = false
  // Adicione aqui a lógica para salvar as alterações no backend
  console.log('Perfil atualizado:', usuario.value)
}

const cancelarEdicao = () => {
  mostrarModalEdicao.value = false
}

const alterarTipoUsuario = () => {
  mostrarModalTipoUsuario.value = true
}

const selecionarTipoUsuario = (tipo) => {
  setUserType(tipo)
  mostrarModalTipoUsuario.value = false
}

const salvarTipoUsuario = () => {
  // Aqui você pode adicionar lógica para salvar o novo tipo de usuário no backend
  console.log('Tipo de usuário atualizado:', userType.value)
  mostrarModalTipoUsuario.value = false
}

const cancelarAlteracaoTipoUsuario = () => {
  mostrarModalTipoUsuario.value = false
}

const logout = () => {
  // Aqui você pode adicionar lógica para fazer logout do usuário
  console.log('Usuário deslogado')
  // Redirecionar para a página de login ou home
}
</script>

<style scoped>
.toggle-checkbox:checked {
  @apply: right-0 border-blue-600;
  right: 0;
  border-color: #2563eb;
}
.toggle-checkbox:checked + .toggle-label {
  @apply: bg-blue-600;
  background-color: #2563eb;
}
</style>

