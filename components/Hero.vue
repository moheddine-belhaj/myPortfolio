<script setup>
import TypedText from './TypedText.vue';
import scrollGif from '../assets/images/scroll.gif';
import Button from './Button.vue';
</script>
<template>
  <section
    id="home"
    class="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100"
  >
    <div class="text-center" data-aos="zoom-in">
      <div class="banner-text text-xl text-gray-600 mb-2">Hi, I am</div>
      <div class="full-name text-6xl font-bold mb-4">
        Moheddine Belhaj Alaya
      </div>
      <p class="text-2xl text-gray-600 mb-8">
        <TypedText
          class="justify-center inline-block"
          :loop="true"
          :type-speed="45"
          :back-speed="35"
          :strings="[
            'Full stack developer',
            'Javascript enthusiast',
            'Avid learner'
          ]"
        />
      </p>
      <Button
        label="View My Work"
        href="https://github.com/moheddine-belhaj"
        target="_blank"
      />
    </div>

    <div
      class="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      aria-hidden="true"
    >
      <img :src="scrollGif" alt="scroll" class="w-28 h-28" />
    </div>
  </section>
</template>
