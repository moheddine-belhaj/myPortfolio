<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import AOS from 'aos';
import LoadingScreen from '../components/LoadingScreen.vue';
import Hero from '../components/Hero.vue';
import About from '../components/About.vue';
import Contact from '../components/Contact.vue';
import Resume from '../components/Resume.vue';
import Technologies from '../components/Technologies.vue';
import Hireme from '../components/Hireme.vue';
import Works from '../components/Works.vue';

const showMainContent = ref(false);

const handleLoadingComplete = () => {
  showMainContent.value = true;
  initializeAOS();
};

const initializeAOS = () => {
  AOS.init({
    duration: 1000,
    once: false,
    offset: 100
  });

  const debounce = (fn, wait = 100) => {
    let t;
    return (...args) => {
      clearTimeout(t);
      t = setTimeout(() => fn(...args), wait);
    };
  };

  const refresh = () => AOS.refresh();
  const debouncedRefresh = debounce(refresh, 120);

  const observer = new MutationObserver(() => debouncedRefresh());
  if (typeof document !== 'undefined' && document.body) {
    observer.observe(document.body, { childList: true, subtree: true });
    // eslint-disable-next-line no-undef
    window.__aosObserver = observer;
  }
  
  onUnmounted(() => {
    try {
      observer.disconnect();
      // eslint-disable-next-line no-undef
      delete window.__aosObserver;
    } catch (e) {
      // ignore
    }
  });
};
</script>

<template>
  <div>
    <!-- Loading Screen -->
    <LoadingScreen 
      :duration="3000" 
      @loading-complete="handleLoadingComplete" 
    />
    <div v-if="showMainContent">
      <NuxtLayout>
        <Hero />
        <About />
        <Technologies />
        <Hireme />
        <Works />
        <Resume />
        <Contact />
      </NuxtLayout>
    </div>
  </div>
</template>

<style>
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 0;
  overflow-x: hidden;
}


.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>