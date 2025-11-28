<template>
  <div v-if="showLoading" class="loading-screen">
    <div class="loading-content">
      <div class="glitch-container">
        <GlitchText
          v-for="(text, index) in welcomeTexts" 
          :key="text.language"
          :text="text.text"
          :class="{ active: currentTextIndex === index }"
          class="glitch-text-item"
          fontSize="4rem"
          fontWeight="800"
          animationDuration="1.5s"
          :glitchColor1="getGlitchColor(index, 1)"
          :glitchColor2="getGlitchColor(index, 2)"
        />
      </div>
      
      <div class="loading-bar">
        <div class="loading-progress" :style="progressStyle"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import GlitchText from './GlitchText.vue';

const props = defineProps({
  duration: {
    type: Number,
    default: 4000 
  }
});

const emit = defineEmits(['loading-complete']);

const showLoading = ref(true);
const progress = ref(0);
const currentTextIndex = ref(0);

const welcomeTexts = [
  { language: 'fr', text: 'Bienvenue' },
  { language: 'es', text: 'Bienvenido' },
  { language: 'ar', text: 'أهلاً ' },   
  { language: 'zh', text: '欢迎' },           
  { language: 'de', text: 'Willkommen' },    
  { language: 'en', text: 'Welcome' }
];

const progressStyle = computed(() => {
  return {
    width: `${progress.value}%`
  };
});

// Different glitch colors for each text
const getGlitchColor = (index, layer) => {
  const colors = [
    { color1: '#FF6B6B', color2: '#4ECDC4' },
    { color1: '#FFE66D', color2: '#6A0572' },
    { color1: '#45B7D1', color2: '#FF9A8B' },
    { color1: '#FF9A8B', color2: '#92DCE5' },
    { color1: '#6A0572', color2: '#FFE66D' },
    { color1: '#4ECDC4', color2: '#FF6B6B' }
  ];
  
  return layer === 1 ? colors[index].color1 : colors[index].color2;
};

const showTextSequence = () => {
  let index = 0;
  
  const showNextText = () => {
    if (index < welcomeTexts.length) {
      currentTextIndex.value = index;
      index++;
      
      if (index < welcomeTexts.length) {
        setTimeout(showNextText, 600); 
      }
    }
  };
  
  showNextText();
};

const startLoading = () => {
  const interval = 50;
  const steps = props.duration / interval;
  const increment = 100 / steps;
  
  const timer = setInterval(() => {
    progress.value += increment;
    
    if (progress.value >= 100) {
      clearInterval(timer);
      setTimeout(() => {
        showLoading.value = false;
        emit('loading-complete');
      }, 200);
    }
  }, interval);
};

onMounted(() => {
  showTextSequence();
  startLoading();
});
</script>

<style scoped>
.loading-screen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #060608;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  font-family: 'Arial', sans-serif;
}

.loading-content {
  text-align: center;
  color: #FAFAFA;
}

.glitch-container {
  position: relative;
  height: 120px;
  margin-bottom: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.glitch-text-item {
  position: absolute;
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94); /* Faster transition */
  pointer-events: none;
}

.glitch-text-item.active {
  opacity: 1;
  transform: translateY(0);
}

.glitch-text-item:not(.active) {
  opacity: 0;
  transform: translateY(30px);
}

.loading-bar {
  width: 300px;
  height: 4px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 2px;
  overflow: hidden;
  margin: 0 auto;
}

.loading-progress {
  height: 100%;
  background: linear-gradient(
    90deg, 
    #FF6B6B, 
    #FFE66D, 
    #45B7D1, 
    #FF9A8B, 
    #6A0572, 
    #4ECDC4
  );
  border-radius: 2px;
  transition: width 0.1s linear;
}

/* Responsive Design */
@media (max-width: 768px) {
  .glitch-container {
    height: 100px;
    margin-bottom: 2rem;
  }
  
  .glitch-text-item {
    font-size: 3rem !important;
  }
  
  .loading-bar {
    width: 250px;
  }
}

@media (max-width: 480px) {
  .glitch-container {
    height: 80px;
    margin-bottom: 1.5rem;
  }
  
  .glitch-text-item {
    font-size: 2.5rem !important; 
  }
  
  .loading-bar {
    width: 200px;
  }
}


.glitch-text-item[data-language="ar"] {
  font-family: 'Arial', 'Segoe UI', sans-serif; /* Better Arabic font support */
}

/* Special styling for Chinese text */
.glitch-text-item[data-language="zh"] {
  font-family: 'Microsoft YaHei', 'SimHei', sans-serif; /* Better Chinese font support */
}
</style>