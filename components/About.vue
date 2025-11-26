<template>
  <section id="about" class="about-section">
    <div class="container">
      <div class="section-title" data-aos="fade-up">About Me</div>

      <div class="about-content">
        <div class="about-grid">
          <!-- Picture Section -->
          <div class="picture-section" data-aos="fade-right">
            <Picture
              :imageSrc="profileImage"
              altText="Your Name - Developer"
              :width="350"
              :height="350"
            />
          </div>

          <!-- Text Content Section -->
          <div class="text-section" data-aos="fade-left" data-aos-delay="200">
            <p class="about-description">
              Passionate developer with expertise in modern web technologies. I
              love creating beautiful, functional applications that provide
              great user experiences.
            </p>
            <div class="about-details">
              <p>
                With a strong foundation in both frontend and backend
                development, I specialize in creating seamless digital
                experiences that combine innovative design with robust
                functionality.
              </p>
              <p>
                Always eager to learn new technologies and take on challenging
                projects that push the boundaries of what's possible on the web.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import Picture from './Picture.vue';
import profileImage from '../assets/images/Profile.jpg';
</script>

<style lang="scss" scoped>
.about-section {
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

.about-content {
  max-width: 100%;
}

.about-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
}

.picture-section {
  display: flex;
  justify-content: center;
}

.text-section {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.about-description {
  font-size: 1.25rem;
  line-height: 1.8;
  color: #f5f5f7;
  margin: 0;
  font-weight: 500;
}

.about-details {
  display: flex;
  flex-direction: column;
  gap: 1rem;

  p {
    font-size: 1rem;
    line-height: 1.6;
    color: #e0e0e0;
    margin: 0;
  }
}

@media (max-width: 768px) {
  .about-section {
    padding: 3rem 0;
  }

  .section-title {
    font-size: 2rem;
    margin-bottom: 2rem;
  }

  .about-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .about-description {
    font-size: 1.125rem;
    line-height: 1.6;
  }

  .about-details p {
    font-size: 0.9rem;
  }

  .picture-section {
    order: -1;
  }
}

@media (max-width: 480px) {
  .about-section {
    padding: 2rem 0;
  }

  .section-title {
    font-size: 1.75rem;
  }

  .about-description {
    font-size: 1rem;
    line-height: 1.5;
  }

  .about-grid {
    gap: 1.5rem;
  }
}
</style>
