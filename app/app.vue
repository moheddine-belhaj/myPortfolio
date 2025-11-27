<script setup>
import { onMounted, onUnmounted } from 'vue';
import AOS from 'aos';
import Hero from '../components/Hero.vue';
import About from '../components/About.vue';
import Contact from '../components/Contact.vue';
import Resume from '../components/Resume.vue';
import Technologies from '../components/Technologies.vue';
import Hireme from '../components/Hireme.vue';
import Works from '../components/Works.vue';

onMounted(() => {
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
});
</script>

<template>
  <div>
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
</template>

<style scoped></style>
