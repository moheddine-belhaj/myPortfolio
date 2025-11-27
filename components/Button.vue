<template>
  <button
    class="animated-button"
    @click="handleClick"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <span>{{ label }}</span>
    <svg height="100%" width="100%" xmlns="http://www.w3.org/2000/svg">
      <g class="pink">
        <rect x="-100%" y="0" width="100%" height="5" />
        <rect x="-100%" y="5" width="100%" height="5" />
        <rect x="-100%" y="10" width="100%" height="5" />
        <rect x="-100%" y="15" width="100%" height="5" />
        <rect x="-100%" y="20" width="100%" height="5" />
        <rect x="-100%" y="25" width="100%" height="5" />
        <rect x="-100%" y="30" width="100%" height="5" />
        <rect x="-100%" y="35" width="100%" height="5" />
        <rect x="-100%" y="40" width="100%" height="5" />
        <rect x="-100%" y="45" width="100%" height="5" />
      </g>

      <g class="blue">
        <rect x="-100%" y="0" width="100%" height="5" />
        <rect x="-100%" y="5" width="100%" height="5" />
        <rect x="-100%" y="10" width="100%" height="5" />
        <rect x="-100%" y="15" width="100%" height="5" />
        <rect x="-100%" y="20" width="100%" height="5" />
        <rect x="-100%" y="25" width="100%" height="5" />
        <rect x="-100%" y="30" width="100%" height="5" />
        <rect x="-100%" y="35" width="100%" height="5" />
        <rect x="-100%" y="40" width="100%" height="5" />
        <rect x="-100%" y="45" width="100%" height="5" />
      </g>
    </svg>
  </button>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue';
import { gsap } from 'gsap';

const props = defineProps({
  label: {
    type: String,
    required: true
  },
  href: {
    type: String,
    default: null
  },
  target: {
    type: String,
    default: '_blank'
  },
  disabled: {
    type: Boolean,
    default: false
  },
  continuous: {
    type: Boolean,
    default: false // If true, animation loops while hovering
  }
});

const emit = defineEmits(['click']);

let animationInstance = null;
let isHovering = false;

const getNodes = (element) => {
  return [
    gsap.utils.shuffle(Array.from(element.querySelectorAll('.blue rect'))),
    gsap.utils.shuffle(Array.from(element.querySelectorAll('.pink rect')))
  ];
};

const startContinuousAnimation = (element) => {
  if (props.disabled || !isHovering) return;

  const nodes = getNodes(element);

  if (animationInstance) {
    animationInstance.kill();
  }

  // Continuous loop animation
  animationInstance = gsap.timeline({ repeat: -1 });

  // Animate bars in
  animationInstance.to(nodes[0], {
    duration: 0.8,
    ease: 'elastic.out(1, 0.3)',
    xPercent: '100',
    stagger: 0.01,
    overwrite: true,
    delay: 0.13
  });

  animationInstance.to(
    nodes[1],
    {
      duration: 0.8,
      ease: 'elastic.out(1, 0.3)',
      xPercent: '100',
      stagger: 0.01,
      overwrite: true
    },
    0
  );

  // Animate bars back out
  animationInstance.to(
    nodes[0],
    {
      duration: 0.8,
      ease: 'elastic.out(1, 0.3)',
      xPercent: '-100',
      stagger: 0.01,
      overwrite: true,
      delay: 0.5
    },
    '+=0.5'
  );

  animationInstance.to(
    nodes[1],
    {
      duration: 0.8,
      ease: 'elastic.out(1, 0.3)',
      xPercent: '-100',
      stagger: 0.01,
      overwrite: true
    },
    '-=0.8'
  );
};

const stopAnimation = () => {
  if (animationInstance) {
    animationInstance.kill();
    animationInstance = null;
  }
};

const handleMouseEnter = (event) => {
  if (props.disabled) return;

  isHovering = true;

  if (props.continuous) {
    startContinuousAnimation(event.currentTarget);
  } else {
    const nodes = getNodes(event.currentTarget);

    if (animationInstance) {
      animationInstance.kill();
    }

    animationInstance = gsap.timeline();


    animationInstance.to(nodes[0], {
      duration: 0.8,
      ease: 'elastic.out(1, 0.3)',
      xPercent: '100',
      stagger: 0.01,
      overwrite: true,
      delay: 0.13
    });

    animationInstance.to(
      nodes[1],
      {
        duration: 0.8,
        ease: 'elastic.out(1, 0.3)',
        xPercent: '100',
        stagger: 0.01,
        overwrite: true
      },
      0
    );
  }
};

const handleMouseLeave = (event) => {
  isHovering = false;

  if (!props.continuous) {
    const nodes = getNodes(event.currentTarget);

    if (animationInstance) {
      animationInstance.kill();
    }

    animationInstance = gsap.timeline();

    animationInstance.to(nodes[0], {
      duration: 0.8,
      ease: 'elastic.out(1, 0.3)',
      xPercent: '-100',
      stagger: 0.01,
      overwrite: true,
      delay: 0.13
    });

    animationInstance.to(
      nodes[1],
      {
        duration: 0.8,
        ease: 'elastic.out(1, 0.3)',
        xPercent: '-100',
        stagger: 0.01,
        overwrite: true
      },
      0
    );
  } else {
    stopAnimation();
  }
};

const handleClick = (event) => {
  if (props.disabled) return;

  // Emit click event
  emit('click', event);

  // Navigate to link if provided
  if (props.href) {
    if (props.target === '_blank') {
      window.open(props.href, '_blank', 'noopener,noreferrer');
    } else {
      window.location.href = props.href;
    }
  }
};


onUnmounted(() => {
  stopAnimation();
});
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:ital,wght@1,500&display=swap');

.animated-button {
  color: #fff;
  cursor: pointer;
  display: inline-flex;
  vertical-align: middle;
  font-weight: 500;
  font-style: italic;
  align-items: center;
  justify-content: center;
  font-family: 'IBM Plex Mono', monospace;
  height: 50px;
  padding: 0 30px;
  position: relative;
  border: none;
  background: transparent;
  margin: 10px;
  transition: all 0.3s ease;

  &:hover:not(:disabled) {
    transform: translateY(-2px);

    &::before {
      box-shadow: 0 0 25px 2px #0763f7;
    }

    span {
      color: #c40a35;
    }
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:focus {
    outline: none;

    &::before {
      box-shadow: 0 0 25px 2px #0763f7;
    }
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
    /* Lighter border when disabled: target the pseudo element border */
    &::before {
      border-color: rgba(255, 255, 255, 0.4);
    }

    &:hover {
      transform: none;

      &::before {
        box-shadow: none;
      }

      span {
        color: #fff;
      }
    }
  }

  &::before {
    background-color: #24252c;
    background-image: repeating-linear-gradient(
      0deg,
      #181a29,
      #181a29 1px,
      #202436 1px,
      #202436 2px
    );
    border: 2px solid white;
    border-radius: 50px;
    content: '';
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    overflow: hidden;
    box-sizing: border-box;
    /* transform: skew(-15deg); */
    transition: box-shadow 700ms;
    width: 100%;
    z-index: 0;
  }

  span {
    transition: color 350ms;
    z-index: 1;
  }

  svg {
    border-radius: 50px;
    overflow: hidden;
    position: absolute;
    /* transform: skew(-15deg); */

    .blue rect {
      fill: #76b3fa;
      shape-rendering: crispEdges;
      mix-blend-mode: plus-lighter;
    }

    .pink rect {
      fill: #ff6bd3;
      shape-rendering: crispEdges;
    }
  }
}
</style>
