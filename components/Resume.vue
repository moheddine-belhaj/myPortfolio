<template>
  <section id="resume" class="py-20 bg-gray-50">
    <div class="container mx-auto px-6">
      <h2 class="text-4xl font-bold text-center mb-12" data-aos="fade-up">
        Resume
      </h2>

      <div class="grid md:grid-cols-2 gap-8">
        <!-- Experience -->
        <div data-aos="fade-right">
          <h3 class="text-2xl font-semibold mb-6">Experience</h3>
          <div class="space-y-6">
            <div
              v-for="(job, index) in experience"
              :key="index"
              class="border-l-4 border-blue-500 pl-4"
            >
              <h4 class="text-xl font-semibold">{{ job.title }}</h4>
              <p class="text-gray-600">{{ job.company }} | {{ job.period }}</p>
              <p class="text-gray-700 mt-2">{{ job.description }}</p>
            </div>
          </div>
        </div>

        <!-- Skills -->
        <div data-aos="fade-left">
          <h3 class="text-2xl font-semibold mb-6">Skills</h3>
          <div class="space-y-4">
            <div v-for="(skill, index) in skills" :key="index">
              <div class="flex justify-between mb-1">
                <span>{{ skill.name }}</span>
                <span>{{ skill.level }}%</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-2">
                <div
                  class="bg-blue-500 h-2 rounded-full"
                  :style="{ width: skill.level + '%' }"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const experience = [
  {
    title: 'Frontend Developer',
    company: 'Tech Company',
    period: '2022 - Present',
    description: 'Developing modern web applications using Vue.js and Nuxt'
  }
];

const skills = [
  { name: 'Vue.js', level: 90 },
  { name: 'Nuxt.js', level: 85 },
  { name: 'JavaScript', level: 95 },
  { name: 'CSS/Tailwind', level: 88 }
];
</script>
