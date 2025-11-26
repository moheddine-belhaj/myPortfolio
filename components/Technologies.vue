<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

// images for skills section
import frontendImage from '../assets/images/frontend.png';
import backendImage from '../assets/images/backend.png';
import mobileappImage from '../assets/images/mobileapp.png';

// Skills data
const skillsData = [
  {
    title: 'Frontend',
    alt: 'frontend',
    image: frontendImage,
    description:
      'Build responsive and cross browser efficient websites by providing seamless transition from design to development'
  },
  {
    title: 'Backend',
    alt: 'backend',
    image: backendImage,
    description:
      'Maintaining servers including database administration as well as scaling applications to handle load changes.'
  },
  {
    title: 'Hybrid mobile app',
    alt: 'mobileapp',
    image: mobileappImage,
    description:
      'Build easily maintainable mobile apps that run on Android, IOS and web with single code implementation.'
  }
];

// technologies data
const technologies = [
  {
    name: 'set1',
    items: [
      {
        name: 'Vue',
        image: 'vue.png'
      },
      {
        name: 'React',
        image: 'react.svg'
      },

      {
        name: 'Redux',
        image: 'redux.png'
      },
      {
        name: 'Nuxt',
        image: 'nuxt.svg'
      }
    ]
  },
  {
    name: 'set2',
    items: [
      {
        name: 'Vuetify',
        image: 'vuetify.png'
      },

      {
        name: 'Node',
        image: 'nodejs.webp'
      },
      {
        name: 'Mongo DB',
        image: 'mongodb.png'
      },
      {
        name: 'Nginx',
        image: 'nginx.svg'
      }
    ]
  },
  {
    name: 'set3',
    items: [
      {
        name: 'React Native',
        image: 'react.svg'
      },

      {
        name: 'Typescript',
        image: 'typescript.png'
      },
      {
        name: 'Scss',
        image: 'scss.png'
      }
    ]
  },
  {
    name: 'set4',
    items: [
      {
        name: 'Gitlab',
        image: 'gitlab.png'
      },
      {
        name: 'Github',
        image: 'github.png'
      },
      {
        name: 'Confluence',
        image: 'confluence.png'
      },
      {
        name: 'Jira',
        image: 'jira.svg'
      }
    ]
  }
];

const currentSetIndex = ref(0);
let autoSlideInterval;

const nextSet = () => {
  currentSetIndex.value = (currentSetIndex.value + 1) % technologies.length;
};

const prevSet = () => {
  currentSetIndex.value =
    (currentSetIndex.value - 1 + technologies.length) % technologies.length;
};

const goToSet = (index) => {
  currentSetIndex.value = index;
};

const startAutoSlide = () => {
  autoSlideInterval = setInterval(nextSet, 3500);
};

const stopAutoSlide = () => {
  if (autoSlideInterval) {
    clearInterval(autoSlideInterval);
  }
};

onMounted(() => {
  startAutoSlide();
});

onUnmounted(() => {
  stopAutoSlide();
});

const logos = import.meta.glob('../assets/images/logos/*', {
  eager: true,
  query: '?url',
  import: 'default'
});
const getLogo = (name) => {
  const key = `../assets/images/logos/${name}`;
  return logos[key] || '';
};
</script>

<template>
  <section id="skills-technologies" class="skills-technologies-section">
    <!-- Skills Section - What I Do -->
    <div class="skills-section">
      <div class="container">
        <div class="section-title" data-aos="fade-up">What I do</div>
        <div class="skills-grid">
          <div
            class="skill-item"
            v-for="skill in skillsData"
            :key="skill.title"
            data-aos="fade-up"
          >
            <img :alt="skill.alt" class="skill-img" :src="skill.image" />
            <div class="skill-title">{{ skill.title }}</div>
            <div class="skill-description">
              {{ skill.description }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Technologies Section -->
    <div class="technologies-section">
      <div class="container">
        <div class="technologies-title" data-aos="fade-up">
          Technologies I
          <img class="heart" src="../assets/images/heart.png" alt="heart" />
        </div>

        <div
          class="technologies-carousel"
          @mouseenter="stopAutoSlide"
          @mouseleave="startAutoSlide"
        >
          <!-- Carousel Container -->
          <div class="carousel-container">
            <div class="carousel-track">
              <div
                v-for="(skillSet, index) in technologies"
                :key="skillSet.name"
                class="carousel-slide"
                :class="{ active: currentSetIndex === index }"
              >
                <div class="tech-grid">
                  <!-- First Row - 3 items -->
                  <div class="tech-row">
                    <div
                      v-for="tech in skillSet.items.slice(0, 3)"
                      :key="tech.name"
                      class="tech-item"
                      data-aos="zoom-in"
                    >
                      <div class="tech-card">
                        <div class="tech-image-container">
                          <img
                            class="tech-logo"
                            :src="getLogo(tech.image)"
                            :alt="tech.name"
                            loading="lazy"
                          />
                        </div>
                        <p class="tech-name">{{ tech.name }}</p>
                      </div>
                    </div>
                  </div>

                  <!-- Second Row - 3 items -->
                  <div class="tech-row">
                    <div
                      v-for="tech in skillSet.items.slice(3, 6)"
                      :key="tech.name"
                      class="tech-item"
                      data-aos="zoom-in"
                      data-aos-delay="100"
                    >
                      <div class="tech-card">
                        <div class="tech-image-container">
                          <img
                            class="tech-logo"
                            :src="getLogo(tech.image)"
                            :alt="tech.name"
                            loading="lazy"
                          />
                        </div>
                        <p class="tech-name">{{ tech.name }}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Navigation Arrows -->
          <button class="carousel-arrow carousel-arrow-prev" @click="prevSet">
            <span>‹</span>
          </button>
          <button class="carousel-arrow carousel-arrow-next" @click="nextSet">
            <span>›</span>
          </button>

          <!-- Indicators -->
          <div class="carousel-indicators">
            <button
              v-for="(skillSet, index) in technologies"
              :key="skillSet.name"
              class="indicator"
              :class="{ active: currentSetIndex === index }"
              @click="goToSet(index)"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.skills-technologies-section {
  background: #1a1a1a;
  color: white;
}

/* Skills Section Styles */
.skills-section {
  padding: 5rem 0 3rem 0;

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
  }
}

.section-title {
  font-size: 2.5rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 3rem;
  color: white;
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  padding: 0 1.25rem;
}

.skill-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 0 1rem;
}

.skill-title {
  font-size: 1.4375rem;
  font-weight: bold;
  margin: 1rem 0;
  color: white;
}

.skill-description {
  margin-bottom: 0;
  font-size: 1rem;
  line-height: 1.5rem;
  color: #f5f5f7;
}

.skill-img {
  height: 7rem;
  width: auto;
  max-width: 100%;
  object-fit: contain;
  display: block;
  margin: 0 0.5rem 1rem;
}

/* Technologies Section Styles */
.technologies-section {
  padding: 3rem 0 5rem 0;

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
  }

  .technologies-title {
    font-size: 2.5rem;
    font-weight: bold;
    margin-bottom: 3rem;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;

    .heart {
      height: 2.5rem;
      margin-left: 0.5rem;
      animation: heartbeat 1.5s ease-in-out infinite;
    }
  }

  .technologies-carousel {
    position: relative;
    max-width: 800px;
    margin: 0 auto;
    overflow: hidden;
  }

  .carousel-container {
    position: relative;
    height: 400px;
    overflow: hidden;
  }

  .carousel-track {
    position: relative;
    height: 100%;
  }

  .carousel-slide {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    transform: translateX(100%);
    transition: all 0.5s ease-in-out;

    &.active {
      opacity: 1;
      transform: translateX(0);
    }
  }

  .tech-grid {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    height: 100%;
  }

  .tech-row {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
    flex: 1;
  }

  .tech-item {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .tech-card {
    background: #2d2d2d;
    border-radius: 12px;
    padding: 1.5rem 1rem;
    text-align: center;
    transition: all 0.3s ease;
    border: 1px solid #404040;
    width: 100%;
    max-width: 180px;

    &:hover {
      transform: translateY(-5px);
      background: #3a3a3a;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
      border-color: #555;
    }
  }

  .tech-image-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 60px;
    margin-bottom: 1rem;
  }

  .tech-logo {
    height: 3rem;
    width: auto;
    max-width: 100%;
    object-fit: contain;
    transition: transform 0.3s ease;

    .tech-card:hover & {
      transform: scale(1.1);
    }
  }

  .tech-name {
    margin: 0;
    font-size: 0.9rem;
    font-weight: 500;
    color: #e0e0e0;
  }

  /* Carousel Navigation */
  .carousel-arrow {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(255, 255, 255, 0.1);
    border: none;
    color: white;
    font-size: 2rem;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
    z-index: 10;

    &:hover {
      background: rgba(255, 255, 255, 0.2);
      transform: translateY(-50%) scale(1.1);
    }

    &.carousel-arrow-prev {
      left: -70px;
    }

    &.carousel-arrow-next {
      right: -70px;
    }
  }

  .carousel-indicators {
    display: flex;
    justify-content: center;
    gap: 0.5rem;
    margin-top: 2rem;

    .indicator {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      border: none;
      background: rgba(255, 255, 255, 0.3);
      cursor: pointer;
      transition: all 0.3s ease;

      &.active {
        background: white;
        transform: scale(1.2);
      }

      &:hover {
        background: rgba(255, 255, 255, 0.6);
      }
    }
  }
}

// Heartbeat animation
@keyframes heartbeat {
  0% {
    transform: scale(1);
  }
  5% {
    transform: scale(1.1);
  }
  10% {
    transform: scale(1);
  }
  15% {
    transform: scale(1.1);
  }
  20% {
    transform: scale(1);
  }
  100% {
    transform: scale(1);
  }
}

// Responsive design
@media (max-width: 768px) {
  .skills-section {
    padding: 3rem 0 2rem 0;

    .section-title {
      font-size: 2rem;
      margin-bottom: 2rem;
    }

    .skills-grid {
      grid-template-columns: 1fr;
      gap: 1.5rem;
      padding: 0 0.5rem;
    }

    .skill-item {
      padding: 0 0.5rem;
    }

    .skill-img {
      height: 6rem;
    }

    .skill-title {
      font-size: 1.25rem;
    }

    .skill-description {
      font-size: 0.9rem;
      line-height: 1.4rem;
    }
  }

  .technologies-section {
    padding: 2rem 0 3rem 0;

    .technologies-title {
      font-size: 2rem;

      .heart {
        height: 2rem;
      }
    }

    .technologies-carousel {
      max-width: 100%;
    }

    .carousel-container {
      height: 350px;
    }

    .tech-row {
      gap: 1rem;
    }

    .tech-card {
      padding: 1rem 0.5rem;
      max-width: 140px;
    }

    .tech-image-container {
      height: 50px;
    }

    .tech-logo {
      height: 2.5rem;
    }

    .carousel-arrow {
      width: 40px;
      height: 40px;
      font-size: 1.5rem;

      &.carousel-arrow-prev {
        left: 10px;
      }

      &.carousel-arrow-next {
        right: 10px;
      }
    }
  }
}

@media (max-width: 480px) {
  .skills-section {
    .section-title {
      font-size: 1.75rem;
    }

    .skill-img {
      height: 5rem;
    }

    .skill-title {
      font-size: 1.125rem;
    }

    .skill-description {
      font-size: 0.875rem;
      line-height: 1.3rem;
    }
  }

  .technologies-section {
    .carousel-container {
      height: 300px;
    }

    .tech-row {
      grid-template-columns: repeat(3, 1fr);
      gap: 0.5rem;
    }

    .tech-card {
      max-width: 100px;
      padding: 0.75rem 0.25rem;
    }

    .tech-name {
      font-size: 0.8rem;
    }

    .tech-logo {
      height: 2rem;
    }
  }
}
</style>
