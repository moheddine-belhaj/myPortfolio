<script setup>
import { ref } from 'vue';
import Project from './Project.vue';
import ProjectModal from './ProjectModal.vue';

// Projects data
const projects = ref([
  {
    title: 'Job Portal',
    isConfidential: false,
    techStack: ['Vue JS', 'Tailwindcss', 'Golang', 'PostgreSQL'],
    cover: 'random.png',
    description:
      'A job portal web application where users can search and apply for jobs. I worked on building the frontend using Vuejs and integrated it with backend APIs developed in Golang. Implemented features like job search.',
    url: 'https://github.com/moheddine-belhaj/Job_app'
  },
  {
    title: 'Delevery App',
    techStack: ['React Native', 'Redux', 'Node JS', 'Mongo DB'],
    isConfidential: true,
    description: `It is a React native app where I worked on designing auth and navigation screens. Also, worked on the complete state management of the auth flow and third party integrations to provide real time live updates to the user.`,
    cover: 'random.png'
  },
  {
    title: 'My Portfolio',
    techStack: ['Nuxt JS ', ' Vue JS', 'GSAP'],
    cover: 'random.png',
    description:
      'This is the initial version of portfolio to display my work. Developed this project in a short span of time. I have planned to add more sections and micro interactions in the future',
    isConfidential: false,
    url: 'https://github.com/moheddine-belhaj/myPortfolio'
  },

  {
    title: 'Job Portal',
    isConfidential: false,
    techStack: ['Vue JS', 'Tailwindcss', 'Golang', 'PostgreSQL'],
    cover: 'random.png',
    description:
      'A job portal web application where users can search and apply for jobs. I worked on building the frontend using Vuejs and integrated it with backend APIs developed in Golang. Implemented features like job search.',
    url: 'https://github.com/moheddine-belhaj/Job_app'
  },
  {
    title: 'Job Portal',
    isConfidential: false,
    techStack: ['Vue JS', 'Tailwindcss', 'Golang', 'PostgreSQL'],
    cover: 'random.png',
    description:
      'A job portal web application where users can search and apply for jobs. I worked on building the frontend using Vuejs and integrated it with backend APIs developed in Golang. Implemented features like job search.',
    url: 'https://github.com/moheddine-belhaj/Job_app'
  }
]);

const moreProjects = ref('https://github.com/moheddine-belhaj');

// Modal state
const selectedProject = ref(null);
const isModalOpen = ref(false);

const openMoreProjects = () => {
  if (process.client) {
    window.open(moreProjects.value, '_blank');
  }
};

const handleShowDetails = (project) => {
  selectedProject.value = project;
  isModalOpen.value = true;
};

const handleCloseModal = () => {
  isModalOpen.value = false;
  selectedProject.value = null;
};
</script>

<template>
  <section id="works" class="works-section">
    <div class="container">
      <div class="section-title" data-aos="fade-up">Recent works</div>

      <!-- Optional description -->
      <div class="works-description" data-aos="fade-up" data-aos-delay="100">
        I have worked in 10+ projects in various Javascript technologies by
        collaborating with some incredible teams and also by independently
        handling project that involves agile methodology. All my works comes
        under Squashapps pvt ltd and hence the name cannot be revealed. So, here
        are my recent project's one liners and my contribution to the project.
      </div>

      <div class="projects-grid">
        <Project
          v-for="(project, index) in projects"
          :key="project.title"
          :project="project"
          :data-aos="'fade-up'"
          :data-aos-delay="(index % 3) * 100"
          @show-details="handleShowDetails"
        />
      </div>

      <div class="view-more-container" data-aos="fade-up">
        <button class="view-more-btn" @click="openMoreProjects">
          View more
        </button>
      </div>
    </div>

    <!-- Full-page Modal -->
    <ProjectModal
      v-if="selectedProject"
      :project="selectedProject"
      :is-open="isModalOpen"
      @close="handleCloseModal"
    />
  </section>
</template>

<style lang="scss" scoped>
.works-section {
  padding: 5rem 0;
  background: #1a1a1a;
  color: white;

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

.works-description {
  font-size: 1.3rem;
  line-height: 2rem;
  margin-bottom: 3rem;
  text-align: center;
  color: #f5f5f7;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.view-more-container {
  text-align: center;
  margin: 2rem 0;
}

.view-more-btn {
  background: transparent;
  color: white;
  border: 1px solid white;
  border-radius: 50px;
  padding: 0.75rem 2rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: white;
    color: #1a1a1a;
  }
}

.work-traits {
  margin-top: 5rem;
  padding-top: 3rem;
  border-top: 1px solid #404040;
}

.traits-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}

.trait-item {
  text-align: center;
  padding: 0 1rem;
}

.trait-img {
  height: 6rem;
  width: auto;
  object-fit: contain;
  margin-bottom: 1rem;
}

.trait-title {
  font-size: 1.4375rem;
  font-weight: bold;
  color: white;
}

/* Responsive Design */
@media (max-width: 768px) {
  .works-section {
    padding: 3rem 0;
  }

  .section-title {
    font-size: 2rem;
    margin-bottom: 2rem;
  }

  .works-description {
    font-size: 1.125rem;
    line-height: 1.6;
    margin-bottom: 2rem;
  }

  .projects-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .work-traits {
    margin-top: 3rem;
    padding-top: 2rem;
  }

  .traits-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .trait-img {
    height: 5rem;
  }

  .trait-title {
    font-size: 1.25rem;
  }
}

@media (max-width: 480px) {
  .works-section {
    padding: 2rem 0;
  }

  .section-title {
    font-size: 1.75rem;
  }

  .works-description {
    font-size: 1rem;
    line-height: 1.5;
  }

  .projects-grid {
    grid-template-columns: 1fr;
  }

  .trait-img {
    height: 4rem;
  }

  .trait-title {
    font-size: 1.125rem;
  }
}
</style>
