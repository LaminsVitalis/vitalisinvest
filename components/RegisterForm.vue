<template>
  <form @submit.prevent="handleSubmit" class="space-y-6">
    <div>
      <label for="name" class="block text-sm font-medium text-white">Nome completo</label>
      <input
        v-model="name"
        type="text"
        id="name"
        required
        class="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white bg-opacity-10"
      />
    </div>
    <div>
      <label for="email" class="block text-sm font-medium text-white">E-mail</label>
      <input
        v-model="email"
        type="email"
        id="email"
        required
        class="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white bg-opacity-10"
      />
    </div>
    <div>
      <label for="password" class="block text-sm font-medium text-white">Senha</label>
      <input
        v-model="password"
        type="password"
        id="password"
        required
        minlength="8"
        class="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white bg-opacity-10"
      />
      <p class="mt-1 text-sm text-blue-200">Mínimo de 8 caracteres</p>
    </div>
    <div>
      <label class="block text-sm font-medium text-white mb-2">Escolha seu perfil</label>
      <div class="grid grid-cols-3 gap-4">
        <div
          v-for="profile in profiles"
          :key="profile.value"
          @click="selectProfile(profile.value)"
          :class="[
            'cursor-pointer p-4 rounded-lg border-2 transition-colors duration-200 flex flex-col items-center',
            userType === profile.value
              ? 'border-white bg-white bg-opacity-20 text-white'
              : 'border-white border-opacity-30 text-white hover:border-white hover:bg-white hover:bg-opacity-10',
          ]"
        >
          <component
            :is="profile.icon"
            class="w-12 h-12 mb-2"
            :class="userType === profile.value ? 'text-white' : 'text-blue-300'"
          />
          <span class="text-sm font-medium text-center">{{ profile.label }}</span>
        </div>
      </div>
    </div>
    <div class="flex items-center">
      <input
        v-model="acceptTerms"
        type="checkbox"
        id="terms"
        required
        class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-white border-opacity-50 rounded bg-white bg-opacity-10"
      />
      <label for="terms" class="ml-2 block text-sm text-white">
        Aceito os
        <a href="#" class="text-blue-600 hover:text-blue-500">termos e condições</a>
      </label>
    </div>
    <button
      type="submit"
      :disabled="!isFormValid"
      class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-400 disabled:cursor-not-allowed"
    >
      Criar Conta
    </button>
    <p v-if="error" class="text-red-500 text-sm mt-2">{{ error }}</p>
    <p v-if="success" class="text-green-500 text-sm mt-2">{{ success }}</p>
  </form>
</template>

<script setup>
import { ref, computed } from "vue";
import { LightbulbIcon, CodeIcon, TrendingUpIcon } from "lucide-vue-next";

const name = ref("");
const email = ref("");
const password = ref("");
const userType = ref("");
const acceptTerms = ref(false);
const error = ref("");
const success = ref("");

const profiles = [
  { value: "empreendedor", label: "Empreendedor", icon: LightbulbIcon },
  { value: "programador", label: "Programador", icon: CodeIcon },
  { value: "investidor", label: "Investidor", icon: TrendingUpIcon },
];

const selectProfile = (profile) => {
  userType.value = profile;
};

const isFormValid = computed(() => {
  return (
    name.value &&
    email.value &&
    password.value.length >= 8 &&
    userType.value &&
    acceptTerms.value
  );
});

const handleSubmit = async () => {
  if (!isFormValid.value) {
    error.value = "Por favor, preencha todos os campos corretamente.";
    return;
  }

  try {
    // Simular uma chamada de API para registro
    const response = await new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email.value.includes("@")) {
          resolve({
            success: true,
            user: { name: name.value, email: email.value, userType: userType.value },
          });
        } else {
          reject(new Error("E-mail inválido"));
        }
      }, 1000);
    });

    console.log("Registro bem-sucedido:", response.user);
    success.value = "Conta criada com sucesso!";
    // Aqui você normalmente armazenaria o token de autenticação e redirecionaria o usuário
  } catch (err) {
    error.value = err.message;
  }
};
</script>
