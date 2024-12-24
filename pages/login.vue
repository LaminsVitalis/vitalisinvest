<template>
  <div
    class="min-h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 flex items-center justify-center p-4 overflow-hidden relative"
  >
    <!-- Elementos de fundo animados -->
    <div class="absolute inset-0 overflow-hidden">
      <div
        class="absolute w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"
      ></div>
      <div
        class="absolute w-96 h-96 bg-indigo-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000 top-1/4 right-1/4"
      ></div>
      <div
        class="absolute w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000 bottom-1/4 left-1/4"
      ></div>
    </div>

    <div
      class="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden w-full max-w-4xl relative z-10"
    >
      <!-- Tela de Boas-vindas -->
      <div v-if="etapaAtual === 0" class="p-8 md:p-12 text-center">
        <h1 class="text-4xl md:text-6xl font-bold text-white mb-6 animate-fade-in-down">
          Bem-vindo à Vitalis
        </h1>
        <p class="text-xl md:text-2xl text-blue-100 mb-10 animate-fade-in-up">
          Conectamos visionários, criadores e investidores para moldar o futuro da
          tecnologia e dos negócios.
        </p>
        <button
          @click="proximaEtapa"
          class="bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-lg font-semibold py-3 px-8 rounded-full hover:shadow-lg transform hover:scale-105 transition duration-300 ease-in-out animate-pulse"
        >
          Comece sua jornada
        </button>
      </div>

      <!-- Slides de Onboarding -->
      <div v-else-if="etapaAtual <= slides.length" class="p-8 md:p-12">
        <div class="text-center mb-10">
          <component
            :is="slides[etapaAtual - 1].icone"
            class="w-24 h-24 mx-auto text-white mb-6 animate-bounce"
          />
          <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">
            {{ slides[etapaAtual - 1].titulo }}
          </h2>
          <p class="text-xl text-blue-100">{{ slides[etapaAtual - 1].descricao }}</p>
        </div>
        <div class="flex justify-between items-center">
          <button
            @click="etapaAnterior"
            class="flex items-center text-blue-200 hover:text-white transition duration-300"
          >
            <ChevronLeftIcon class="mr-2 h-6 w-6" /> Anterior
          </button>
          <button
            @click="proximaEtapa"
            class="flex items-center bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold py-2 px-6 rounded-full hover:shadow-lg transform hover:scale-105 transition duration-300 ease-in-out"
          >
            {{ etapaAtual === slides.length ? "Finalizar" : "Próximo" }}
            <ChevronRightIcon class="ml-2 h-6 w-6" />
          </button>
        </div>
      </div>

      <!-- Tela de Login/Cadastro -->
      <div v-else-if="etapaAtual === slides.length + 1" class="p-8 md:p-12">
        <h2 class="text-3xl md:text-4xl font-bold text-white mb-8 text-center">
          Comece sua jornada
        </h2>
        <div class="space-y-6">
          <button
            @click="mostrarLogin"
            class="w-full bg-white text-blue-600 font-bold py-3 px-6 rounded-full hover:bg-blue-50 transition duration-300 transform hover:scale-105"
          >
            Login
          </button>
          <button
            @click="mostrarCadastro"
            class="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold py-3 px-6 rounded-full hover:shadow-lg transition duration-300 transform hover:scale-105"
          >
            Criar Conta
          </button>
        </div>
      </div>

      <!-- Formulário de Login -->
      <div v-else-if="etapaAtual === 'login'" class="p-8 md:p-12">
        <h2 class="text-3xl md:text-4xl font-bold text-white mb-8 text-center">Login</h2>
        <LoginForm />
        <button
          @click="voltarParaEscolha"
          class="mt-6 text-blue-200 hover:text-white transition duration-300"
        >
          Voltar
        </button>
      </div>

      <!-- Formulário de Cadastro -->
      <div v-else-if="etapaAtual === 'cadastro'" class="p-8 md:p-12">
        <h2 class="text-3xl md:text-4xl font-bold text-white mb-8 text-center">
          Criar Conta
        </h2>
        <RegisterForm />
        <button
          @click="voltarParaEscolha"
          class="mt-6 text-blue-200 hover:text-white transition duration-300"
        >
          Voltar
        </button>
      </div>

      <!-- Indicadores de Progresso -->
      <div
        v-if="
          typeof etapaAtual === 'number' && etapaAtual > 0 && etapaAtual <= slides.length
        "
        class="flex justify-center pb-6"
      >
        <div
          v-for="(_, index) in slides"
          :key="index"
          :class="[
            'w-3 h-3 rounded-full mx-1 transition-all duration-300',
            etapaAtual === index + 1 ? 'bg-white scale-125' : 'bg-blue-200 scale-100',
          ]"
        ></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import {
  LightbulbIcon,
  CodeIcon,
  TrendingUpIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-vue-next";
import LoginForm from "./components/LoginForm.vue";
import RegisterForm from "./components/RegisterForm.vue";

const slides = [
  {
    icone: LightbulbIcon,
    titulo: "Empreendedor",
    descricao:
      "Transforme suas ideias em negócios de sucesso. Obtenha suporte especializado, acesso a capital e conexões valiosas.",
  },
  {
    icone: CodeIcon,
    titulo: "Programador",
    descricao:
      "Desenvolva soluções inovadoras e faça parte de projetos transformadores. Aprimore suas habilidades e expanda sua rede.",
  },
  {
    icone: TrendingUpIcon,
    titulo: "Investidor",
    descricao:
      "Acesse oportunidades únicas de investimento em tecnologias emergentes. Diversifique seu portfólio e impulsione o crescimento.",
  },
];

const etapaAtual = ref(0);

const proximaEtapa = () => {
  if (typeof etapaAtual.value === "number" && etapaAtual.value <= slides.length) {
    etapaAtual.value++;
  }
};

const etapaAnterior = () => {
  if (typeof etapaAtual.value === "number" && etapaAtual.value > 0) {
    etapaAtual.value--;
  }
};

const mostrarLogin = () => {
  etapaAtual.value = "login";
};

const mostrarCadastro = () => {
  etapaAtual.value = "cadastro";
};

const voltarParaEscolha = () => {
  etapaAtual.value = slides.length + 1;
};
</script>

<style scoped>
@keyframes blob {
  0% {
    transform: translate(0px, 0px) scale(1);
  }
  33% {
    transform: translate(30px, -50px) scale(1.1);
  }
  66% {
    transform: translate(-20px, 20px) scale(0.9);
  }
  100% {
    transform: translate(0px, 0px) scale(1);
  }
}

.animate-blob {
  animation: blob 7s infinite;
}

.animation-delay-2000 {
  animation-delay: 2s;
}

.animation-delay-4000 {
  animation-delay: 4s;
}

@keyframes fade-in-down {
  0% {
    opacity: 0;
    transform: translateY(-10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fade-in-up {
  0% {
    opacity: 0;
    transform: translateY(10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-down {
  animation: fade-in-down 0.5s ease-out;
}

.animate-fade-in-up {
  animation: fade-in-up 0.5s ease-out;
}
</style>
