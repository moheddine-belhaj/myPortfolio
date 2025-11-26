<template>
  <section class="hire-section">
    <div class="parallax-container">
      <div class="parallax-background">
        <img :src="hireMe" alt="Hire me background" class="parallax-image" />
      </div>
      <div class="parallax-overlay"></div>
      <div class="parallax-content">
        <div class="hire-me-content">
          <div class="content">
            <div class="help" data-aos="fade-right">
              I'm open to collaborating for your upcoming projects!
            </div>
            <button
              class="hire-btn"
              @click="handleHireClick"
              data-aos="fade-right"
              data-aos-delay="200"
            >
              Hire me
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import hireMe from '../assets/images/hire-me.jpg';

// Define hire email later
const hireEmail = 'mailto:your-email@gmail.com';

const handleHireClick = () => {
  if (process.client) window.open(hireEmail, '_blank');
};
</script>

<style lang="scss" scoped>
.hire-section {
  height: 200px;
  position: relative;
  overflow: hidden;
}

.parallax-container {
  position: relative;
  height: 100%;
  width: 100%;
  isolation: isolate;
}

.parallax-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  z-index: 1;
}

.parallax-image {
  width: 100%;
  height: 120%;
  object-fit: cover;

  transform: translateY(0);
  transition: transform 0.3s ease-out;

  @media (prefers-reduced-motion: no-preference) {
    transform: translateY(calc(var(--scroll-y, 0) * -0.3));
  }
}

.parallax-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(35, 32, 32, 0.29);
  z-index: 2;
}

.parallax-content {
  position: relative;
  z-index: 3;
  height: 100%;
  display: flex;
  align-items: center;
}

.hire-me-content {
  width: 100%;
  padding: 0 1rem;
}

.content {
  margin-left: 20%;

  .help {
    text-align: left;
    font-size: 1.5em;
    margin-bottom: 1rem;
    color: white;
    font-weight: 500;
    text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.7);
  }
}

.hire-btn {
  background: #000;
  color: white;
  border: none;
  border-radius: 50px;
  padding: 12px 32px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  display: inline-block;

  &:hover {
    background: #333;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  }

  &:active {
    transform: translateY(0);
  }
}

@media screen and (max-width: 767px) {
  .content {
    margin-left: 0 !important;
    text-align: center;

    .help {
      text-align: center;
      font-size: 1.25em;
    }
  }
}

@media screen and (max-width: 480px) {
  .hire-section {
    height: 180px;
  }

  .content .help {
    font-size: 1.1em;
  }

  .hire-btn {
    padding: 10px 24px;
    font-size: 0.9rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .parallax-image {
    transform: none !important;
  }
}
</style>
