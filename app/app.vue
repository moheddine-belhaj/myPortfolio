<template>
  <div>
    <NuxtLayout>
      <!-- Hero Section -->
      <section
        id="home"
        class="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100"
      >
        <div class="text-center" data-aos="zoom-in">
          <h1 class="text-6xl font-bold mb-4">John Doe</h1>
          <p class="text-2xl text-gray-600 mb-8">Full Stack Developer</p>
          <button
            class="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            View My Work
          </button>
        </div>
      </section>

      <!-- About Section -->
      <section id="about" class="py-20">
        <div class="container mx-auto px-6">
          <h2 class="text-4xl font-bold text-center mb-12" data-aos="fade-up">
            About Me
          </h2>
          <div
            class="max-w-3xl mx-auto text-center"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <p class="text-lg text-gray-700 leading-relaxed">
              Passionate developer with expertise in modern web technologies. I
              love creating beautiful, functional applications that provide
              great user experiences.
            </p>
          </div>
        </div>
      </section>

      <!-- Resume Section -->
      <Resume />

      <!-- Contact Section -->
      <section id="contact" class="py-20 bg-gray-900 text-white">
        <div class="container mx-auto px-6 text-center">
          <h2 class="text-4xl font-bold mb-8" data-aos="fade-up">
            Get In Touch
          </h2>
          <p class="text-xl mb-8" data-aos="fade-up" data-aos-delay="200">
            Ready to start your next project?
          </p>
          <a
            href="mailto:hello@example.com"
            class="bg-white text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            data-aos="zoom-in"
          >
            Contact Me
          </a>
        </div>
      </section>
    </NuxtLayout>
  </div>
</template>

<script setup>
import AOS from 'aos';
import Resume from '../components/Resume.vue';
onMounted(() => {
  AOS.init({
    duration: 1000,
    once: true,
    offset: 100
  });
});

var inde465546546x = 0;
</script>
