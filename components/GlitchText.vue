<template>
  <div class="glitch-wrapper">
    <h1 class="glitch" :style="glitchStyle">
      {{ text }}
    </h1>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  text: {
    type: String,
    default: 'Glitch'
  },
  fontSize: {
    type: String,
    default: '100px'
  },
  fontWeight: {
    type: String,
    default: '800'
  },
  animationDuration: {
    type: String,
    default: '2s'
  },
  glitchColor1: {
    type: String,
    default: 'red'
  },
  glitchColor2: {
    type: String,
    default: 'blue'
  }
});

const glitchStyle = computed(() => {
  return {
    '--font-size': props.fontSize,
    '--font-weight': props.fontWeight,
    '--animation-duration': props.animationDuration,
    '--glitch-color-1': props.glitchColor1,
    '--glitch-color-2': props.glitchColor2
  };
});
</script>

<style scoped>
.glitch-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.glitch {
  color: white;
  font-family: sans-serif;
  font-weight: var(--font-weight, 800);
  position: relative;
  font-size: var(--font-size, 100px);
  padding: 30px;
  margin: 0;
}

.glitch::before,
.glitch::after {
  padding: 30px;
  color: white;
  content: attr(data-text);
  position: absolute;
  width: 100%;
  height: 100%;
  background: black;
  overflow: hidden;
  top: 0;
}

.glitch::before {
  left: 3px;
  text-shadow: -2px 0 var(--glitch-color-1, red);
  animation-name: glitch-animation-1;
  animation-duration: var(--animation-duration, 2s);
  animation-timing-function: linear;
  animation-delay: 0s;
  animation-iteration-count: infinite;
  animation-direction: reverse-alternate;
}

.glitch::after {
  left: -3px;
  text-shadow: -2px 0 var(--glitch-color-2, blue);
  animation-name: glitch-animation-2;
  animation-duration: var(--animation-duration, 2s);
  animation-timing-function: linear;
  animation-delay: 0s;
  animation-iteration-count: infinite;
  animation-direction: reverse-alternate;
}

/* Generate random clip paths for glitch effect */
@keyframes glitch-animation-1 {
  0% {
    clip: rect(32px, 9999px, 82px, 0);
  }
  5% {
    clip: rect(12px, 9999px, 77px, 0);
  }
  10% {
    clip: rect(53px, 9999px, 91px, 0);
  }
  15% {
    clip: rect(61px, 9999px, 103px, 0);
  }
  20% {
    clip: rect(37px, 9999px, 19px, 0);
  }
  25% {
    clip: rect(6px, 9999px, 4px, 0);
  }
  30% {
    clip: rect(42px, 9999px, 31px, 0);
  }
  35% {
    clip: rect(87px, 9999px, 73px, 0);
  }
  40% {
    clip: rect(9px, 9999px, 100px, 0);
  }
  45% {
    clip: rect(25px, 9999px, 57px, 0);
  }
  50% {
    clip: rect(54px, 9999px, 28px, 0);
  }
  55% {
    clip: rect(13px, 9999px, 65px, 0);
  }
  60% {
    clip: rect(78px, 9999px, 47px, 0);
  }
  65% {
    clip: rect(3px, 9999px, 88px, 0);
  }
  70% {
    clip: rect(45px, 9999px, 96px, 0);
  }
  75% {
    clip: rect(68px, 9999px, 11px, 0);
  }
  80% {
    clip: rect(21px, 9999px, 39px, 0);
  }
  85% {
    clip: rect(84px, 9999px, 52px, 0);
  }
  90% {
    clip: rect(7px, 9999px, 70px, 0);
  }
  95% {
    clip: rect(49px, 9999px, 26px, 0);
  }
  100% {
    clip: rect(15px, 9999px, 60px, 0);
  }
}

@keyframes glitch-animation-2 {
  0% {
    clip: rect(76px, 9999px, 23px, 0);
  }
  5% {
    clip: rect(28px, 9999px, 89px, 0);
  }
  10% {
    clip: rect(41px, 9999px, 14px, 0);
  }
  15% {
    clip: rect(67px, 9999px, 45px, 0);
  }
  20% {
    clip: rect(8px, 9999px, 98px, 0);
  }
  25% {
    clip: rect(92px, 9999px, 33px, 0);
  }
  30% {
    clip: rect(19px, 9999px, 71px, 0);
  }
  35% {
    clip: rect(55px, 9999px, 6px, 0);
  }
  40% {
    clip: rect(83px, 9999px, 50px, 0);
  }
  45% {
    clip: rect(11px, 9999px, 64px, 0);
  }
  50% {
    clip: rect(37px, 9999px, 27px, 0);
  }
  55% {
    clip: rect(69px, 9999px, 95px, 0);
  }
  60% {
    clip: rect(2px, 9999px, 42px, 0);
  }
  65% {
    clip: rect(44px, 9999px, 79px, 0);
  }
  70% {
    clip: rect(88px, 9999px, 17px, 0);
  }
  75% {
    clip: rect(26px, 9999px, 58px, 0);
  }
  80% {
    clip: rect(73px, 9999px, 35px, 0);
  }
  85% {
    clip: rect(5px, 9999px, 81px, 0);
  }
  90% {
    clip: rect(48px, 9999px, 22px, 0);
  }
  95% {
    clip: rect(91px, 9999px, 66px, 0);
  }
  100% {
    clip: rect(30px, 9999px, 9px, 0);
  }
}


@media (max-width: 768px) {
  .glitch {
    font-size: 60px;
    padding: 20px;
  }

  .glitch::before,
  .glitch::after {
    padding: 20px;
  }
}

@media (max-width: 480px) {
  .glitch {
    font-size: 40px;
    padding: 15px;
  }

  .glitch::before,
  .glitch::after {
    padding: 15px;
  }
}
</style>
