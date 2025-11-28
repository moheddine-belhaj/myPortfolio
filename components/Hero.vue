<script setup>
import TypedText from './TypedText.vue';
import StackAnimation from './TitleAnimation.vue';
import scrollGif from '../assets/images/scroll.gif';
import Button from './Button.vue';
</script>

<template>
  <section id="home" class="hero-section">
    <div class="hero-content" data-aos="zoom-in">
      <div class="banner-text">Hi, I am</div>

      <div class="full-name">Moheddine Belhaj Alaya</div>


      <StackAnimation
        prefix="Full"
        text="Stack"
        suffix="Developer"
        :stacks="3"
        fontSize="4rem"
        containerFontSize="1.5rem"
      />

      <p class="additional-roles">
        <TypedText
          class="justify-center inline-block"
          :loop="true"
          :type-speed="45"
          :back-speed="35"
          :strings="[
            'Javascript enthusiast',
            'Avid learner',
            'Problem solver',
            'Tech innovator'
          ]"
        />
      </p>

      <Button
        label="View My Work"
        href="https://github.com/moheddine-belhaj"
        target="_blank"
      />
    </div>

    <div class="scroll-indicator" aria-hidden="true">
      <img :src="scrollGif" alt="scroll" class="scroll-gif" />
    </div>
  </section>
</template>

<style lang="scss" scoped>
.hero-section {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #060608;
  color: #fafafa;
  overflow: hidden;
}

.hero-content {
  text-align: center;
  z-index: 1;
}

.banner-text {
  font-size: 1.5rem;
  color: #888;
  margin-bottom: 1rem;
  font-weight: 300;
}

.full-name {
  font-size: 4rem;
  font-weight: bold;
  margin-bottom: 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.stack-animation-container {
  margin-bottom: 2rem;
  min-height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.additional-roles {
  font-size: 1.5rem;
  color: #888;
  margin-bottom: 3rem;
  min-height: 2rem;
}

.scroll-indicator {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
}

.scroll-gif {
  width: 7rem;
  height: 7rem;
  opacity: 0.8;
}


@media (max-width: 768px) {
  .banner-text {
    font-size: 1.25rem;
  }

  .full-name {
    font-size: 3rem;
    margin-bottom: 1.5rem;
  }

  .stack-animation-container {
    margin-bottom: 1.5rem;
    min-height: 60px;
  }

  .additional-roles {
    font-size: 1.25rem;
    margin-bottom: 2rem;
  }

  .scroll-gif {
    width: 6rem;
    height: 6rem;
  }
}

@media (max-width: 480px) {
  .banner-text {
    font-size: 1.125rem;
  }

  .full-name {
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }

  .stack-animation-container {
    margin-bottom: 1rem;
    min-height: 50px;
  }

  .additional-roles {
    font-size: 1.125rem;
    margin-bottom: 1.5rem;
  }

  .scroll-gif {
    width: 5rem;
    height: 5rem;
  }
}
</style>
