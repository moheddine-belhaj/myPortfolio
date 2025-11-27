<script setup>
import { computed } from 'vue';
import Button from './Button.vue';

const props = defineProps({
  project: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['show-details']);


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

const showDetails = () => {
  emit('show-details', props.project);
};
</script>

<template>
  <div class="project-card" data-aos="fade-up">
    <div class="project-image-container">
      <img
        :src="projectImage"
        :alt="project.title"
        class="project-image"
        loading="lazy"
      />
      <div v-if="project.isConfidential" class="confidential-overlay">
        <span>Confidential</span>
      </div>
    </div>

    <div class="project-content">
      <h3 class="project-title">{{ project.title }}</h3>

      <div class="tech-stack">
        <span v-for="tech in project.techStack" :key="tech" class="tech-tag">
          {{ tech }}
        </span>
      </div>

      <p class="project-description clamped">{{ project.description }}</p>

      <div class="project-actions">
        <button class="more-toggle" @click="showDetails">More Details</button>

        <Button
          v-if="project.url && !project.isConfidential"
          class="project-btn"
          @click="openProject(project.url)"
          label="View Project"
        />

        <Button
          v-else
          class="project-btn disabled"
          disabled
          :label="project.isConfidential ? 'Confidential' : 'No Link'"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.project-card {
  background: #2d2d2d;
  border-radius: 12px;
  border: 1px solid #404040;
  overflow: hidden;
  transition: all 0.3s ease;
  height: 100%;
  position: relative;

  &:hover {
    transform: translateY(-5px);
    background: #3a3a3a;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
    border-color: #555;
  }
}

.project-image-container {
  position: relative;
  width: 100%;
  height: 200px;
  overflow: hidden;
}

.project-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;

  .project-card:hover & {
    transform: scale(1.05);
  }
}

.confidential-overlay {
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
    font-size: 1.125rem;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 1px;
  }
}

.project-content {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  height: calc(100% - 200px);
}

.project-title {
  font-size: 1.25rem;
  font-weight: bold;
  color: white;
  margin: 0 0 1rem 0;
  line-height: 1.3;
}

.tech-stack {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.tech-tag {
  background: #404040;
  color: #e0e0e0;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
}

.project-description {
  color: #f5f5f7;
  font-size: 0.9rem;
  line-height: 1.5;
  margin: 0 0 1rem 0;
  flex-grow: 1;
}

.project-description.clamped {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.more-toggle {
  background: transparent;
  border: 1px solid #cfcfcf;
  color: #cfcfcf;
  border-radius: 20px;
  cursor: pointer;
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  margin-bottom: 0.75rem;

  &:hover {
    background: #cfcfcf;
    color: #1a1a1a;
  }
}

.project-actions {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: auto;
}

.project-btn {
  background: transparent;
  color: white;
  border: 1px solid white;
  border-radius: 50px;
  padding: 0.5rem 1.5rem;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover:not(.disabled) {
    background: white;
    color: #1a1a1a;
  }

  &.disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}

/* Responsive Design */
@media (max-width: 768px) {
  .project-image-container {
    height: 180px;
  }

  .project-content {
    padding: 1.25rem;
  }

  .project-title {
    font-size: 1.125rem;
  }

  .project-description {
    font-size: 0.875rem;
  }
}

@media (max-width: 480px) {
  .project-image-container {
    height: 160px;
  }

  .project-content {
    padding: 1rem;
  }
}
</style>
