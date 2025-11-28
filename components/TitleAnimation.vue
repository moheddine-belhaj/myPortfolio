<template>
  <div class="stack-container">
    <span class="prefix">{{ prefix }}</span>
    <div class="stack" :style="`--stacks: ${stacks}`">
      <span
        v-for="index in stacks"
        :key="index"
        :style="`--index: ${index - 1};`"
      >
        {{ text }}
      </span>
    </div>
    <span class="suffix">{{ suffix }}</span>
  </div>
</template>

<script setup>
const props = defineProps({
  text: {
    type: String,
    default: 'STACK'
  },
  prefix: {
    type: String,
    default: 'Full'
  },
  suffix: {
    type: String,
    default: 'Developer'
  },
  stacks: {
    type: Number,
    default: 3
  },
  fontSize: {
    type: String,
    default: '4rem'
  },
  containerFontSize: {
    type: String,
    default: '1.5rem'
  }
});
</script>

<style scoped>
.stack-container {
  color: var(--color, red);
  font-size: v-bind('props.containerFontSize');
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
  justify-content: center;
}

.prefix,
.suffix {
  font-weight: 500;
}

.suffix {
  text-align: right;
}

.stack {
  display: grid;
  grid-template-columns: 1fr;
}

.stack span {
  font-weight: bold;
  grid-row-start: 1;
  grid-column-start: 1;
  font-size: v-bind('props.fontSize');
  --stack-height: calc(100% / var(--stacks) - 1px);
  --inverse-index: calc(calc(var(--stacks) - 1) - var(--index));
  --clip-top: calc(var(--stack-height) * var(--index));
  --clip-bottom: calc(var(--stack-height) * var(--inverse-index));
  clip-path: inset(var(--clip-top) 0 var(--clip-bottom) 0);
  animation:
    stack 340ms cubic-bezier(0.46, 0.29, 0, 1.24) 1 backwards
      calc(var(--index) * 120ms),
    glitch 2s ease infinite 2s alternate-reverse;
}

.stack span:nth-child(odd) {
  --glitch-translate: 8px;
}
.stack span:nth-child(even) {
  --glitch-translate: -8px;
}

@keyframes stack {
  0% {
    opacity: 0;
    transform: translateX(-50%);
    text-shadow:
      -2px 3px 0 red,
      2px -3px 0 blue;
  }
  60% {
    opacity: 0.5;
    transform: translateX(50%);
  }
  80% {
    transform: none;
    opacity: 1;
    text-shadow:
      2px -3px 0 red,
      -2px 3px 0 blue;
  }
  100% {
    text-shadow: none;
  }
}

@keyframes glitch {
  0% {
    text-shadow:
      -2px 3px 0 red,
      2px -3px 0 blue;
    transform: translate(var(--glitch-translate));
  }
  2% {
    text-shadow:
      2px -3px 0 red,
      -2px 3px 0 blue;
  }
  4%,
  100% {
    text-shadow: none;
    transform: none;
  }
}

/* Responsive design */
@media (max-width: 768px) {
  .stack-container {
    font-size: 1.25rem;
    flex-direction: column;
    gap: 0.25rem;
  }

  .stack span {
    font-size: 3rem;
  }
}

@media (max-width: 480px) {
  .stack-container {
    font-size: 1rem;
  }

  .stack span {
    font-size: 2.5rem;
  }
}
</style>
