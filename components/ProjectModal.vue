<script setup>
import { computed } from 'vue';
import Button from './Button.vue';

const props = defineProps({
  project: {
    type: Object,
    required: true
  },
  isOpen: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['close']);

const projectImage = computed(() => {
  const cover = props.project && props.project.cover;
  if (!cover) return '/images/placeholder-project.jpg';

  if (
    typeof cover === 'string' &&
    (cover.startsWith('http') || cover.startsWith('/'))
  ) {
    return cover;
  }

  try {
    return new URL(`../assets/images/${cover}`, import.meta.url).href;
  } catch {
    return '/images/placeholder-project.jpg';
  }
});

const openProject = (url) => {
  if (url && process.client) {
    window.open(url, '_blank');
  }
};

const closeModal = () => {
  emit('close');
};
</script>
<template>
  <div v-if="isOpen" class="project-modal-fullpage" @click="closeModal">
    <div class="modal-content" @click.stop>
      <div class="modal-header">
        <button class="close-btn" @click="closeModal">
          <span>×</span>
        </button>
      </div>

      <div class="modal-body">
        <div class="project-hero">
          <img :src="projectImage" :alt="project.title" class="hero-image" />
          <div v-if="project.isConfidential" class="hero-confidential-overlay">
            <span>Confidential Project</span>
          </div>
        </div>

        <div class="project-details">
          <div class="details-content">
            <h1 class="project-title">{{ project.title }}</h1>

            <div class="tech-stack-section">
              <h3>Technologies Used</h3>
              <div class="tech-tags">
                <span
                  v-for="tech in project.techStack"
                  :key="tech"
                  class="tech-tag"
                >
                  {{ tech }}
                </span>
              </div>
            </div>

            <div class="description-section">
              <h3>Project Description</h3>
              <p class="project-description">{{ project.description }}</p>
            </div>

            <!-- Confidential Notice -->
            <div v-if="project.isConfidential" class="confidential-section">
              <div class="confidential-notice">
                <span class="lock-icon">🔒</span>
                <p>
                  This project comes under Squashapps pvt ltd and hence its name
                  is confidential.
                </p>
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="action-buttons">
              <Button
                v-if="project.url && !project.isConfidential"
                class="action-btn primary"
                @click="openProject(project.url)"
                label="View Project Code"
              />

              <Button
                v-else-if="project.isConfidential"
                class="action-btn secondary disabled"
                disabled
                label="Confidential Project"
              />

              <Button
                class="action-btn secondary"
                @click="closeModal"
                label="Close"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.project-modal-fullpage {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #1a1a1a;
  z-index: 1000;
  overflow-y: auto;
}

.modal-content {
  min-height: 100vh;
  background: #1a1a1a;
}

.modal-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  padding: 1.5rem;
  background: rgba(26, 26, 26, 0.9);
  backdrop-filter: blur(10px);
  z-index: 10;
  display: flex;
  justify-content: flex-end;
}

.close-btn {
  background: rgba(45, 45, 45, 0.8);
  border: 1px solid #555;
  color: white;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 2rem;
  transition: all 0.3s ease;

  &:hover {
    background: #404040;
    transform: scale(1.1);
  }
}

.modal-body {
  padding-top: 80px; /* Account for fixed header */
}

.project-hero {
  position: relative;
  width: 100%;
  height: 60vh;
  min-height: 400px;
  overflow: hidden;
}

.hero-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero-confidential-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;

  span {
    color: white;
    font-size: 2rem;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 2px;
  }
}

.project-details {
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem 2rem;
}

.details-content {
  max-width: 800px;
  margin: 0 auto;
}

.project-title {
  font-size: 3rem;
  font-weight: bold;
  color: white;
  margin: 0 0 3rem 0;
  line-height: 1.2;
  text-align: center;
}

.tech-stack-section {
  margin-bottom: 3rem;

  h3 {
    font-size: 1.5rem;
    color: #f5f5f7;
    margin-bottom: 1.5rem;
    font-weight: 600;
  }
}

.tech-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.tech-tag {
  background: #404040;
  color: #e0e0e0;
  padding: 0.75rem 1.5rem;
  border-radius: 25px;
  font-size: 1rem;
  font-weight: 500;
  border: 1px solid #555;
}

.description-section {
  margin-bottom: 3rem;

  h3 {
    font-size: 1.5rem;
    color: #f5f5f7;
    margin-bottom: 1.5rem;
    font-weight: 600;
  }
}

.project-description {
  color: #f5f5f7;
  font-size: 1.25rem;
  line-height: 1.8;
  margin: 0;
}

.confidential-section {
  margin-bottom: 3rem;
}

.confidential-notice {
  background: rgba(255, 0, 0, 0.1);
  border: 1px solid rgba(255, 0, 0, 0.3);
  border-radius: 12px;
  padding: 2rem;
  display: flex;
  align-items: center;
  gap: 1rem;

  .lock-icon {
    font-size: 2rem;
  }

  p {
    color: #ff6b6b;
    margin: 0;
    font-size: 1.1rem;
    line-height: 1.5;
    flex: 1;
  }
}

.action-buttons {
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  flex-wrap: wrap;
}

.action-btn {
  min-width: 200px;

  &.primary {
    border-color: white;
    color: white;

    &:hover:not(.disabled) {
      background: white;
      color: #1a1a1a;
    }
  }

  &.secondary {
    border-color: #555;
    color: #cfcfcf;

    &:hover {
      background: #555;
      color: white;
    }
  }

  &.disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}

/* Responsive Design */
@media (max-width: 768px) {
  .modal-header {
    padding: 1rem;
  }

  .close-btn {
    width: 45px;
    height: 45px;
    font-size: 1.75rem;
  }

  .modal-body {
    padding-top: 70px;
  }

  .project-hero {
    height: 40vh;
    min-height: 300px;
  }

  .project-details {
    padding: 3rem 1.5rem;
  }

  .project-title {
    font-size: 2.5rem;
    margin-bottom: 2rem;
  }

  .tech-tag {
    padding: 0.6rem 1.2rem;
    font-size: 0.9rem;
  }

  .project-description {
    font-size: 1.1rem;
    line-height: 1.6;
  }

  .confidential-notice {
    padding: 1.5rem;
    flex-direction: column;
    text-align: center;

    .lock-icon {
      font-size: 1.5rem;
    }

    p {
      font-size: 1rem;
    }
  }

  .action-buttons {
    flex-direction: column;
    align-items: center;
  }

  .action-btn {
    width: 100%;
    max-width: 300px;
  }
}

@media (max-width: 480px) {
  .project-hero {
    height: 35vh;
    min-height: 250px;
  }

  .project-details {
    padding: 2rem 1rem;
  }

  .project-title {
    font-size: 2rem;
  }

  .tech-stack-section h3,
  .description-section h3 {
    font-size: 1.25rem;
  }

  .project-description {
    font-size: 1rem;
  }

  .tech-tags {
    gap: 0.5rem;
  }

  .tech-tag {
    padding: 0.5rem 1rem;
    font-size: 0.8rem;
  }
}
</style>
