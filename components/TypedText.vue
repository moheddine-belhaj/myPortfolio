<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  strings: { type: Array, default: () => [] },
  loop: { type: Boolean, default: true },
  typeSpeed: { type: Number, default: 50 },
  backSpeed: { type: Number, default: 50 },
  startDelay: { type: Number, default: 500 },
  backDelay: { type: Number, default: 800 }
})

const el = ref(null)
let timer = null
let stopped = false

onMounted(() => {
  const strings = props.strings || []
  if (!strings.length) return

  let sIdx = 0
  let charIdx = 0
  let forward = true

  const step = () => {
    if (stopped) return
    const current = strings[sIdx]
    if (forward) {
      // type forward
      el.value.textContent = current.slice(0, charIdx + 1)
      charIdx++
      if (charIdx >= current.length) {
        // reached end
        forward = false
        timer = setTimeout(step, props.backDelay)
      } else {
        timer = setTimeout(step, props.typeSpeed)
      }
    } else {
      // backspace
      el.value.textContent = current.slice(0, charIdx - 1)
      charIdx--
      if (charIdx <= 0) {
        // move to next string
        forward = true
        sIdx = (sIdx + 1) % strings.length
        if (!props.loop && sIdx === 0) {
          // finished full cycle and no loop
          return
        }
        timer = setTimeout(step, props.typeSpeed)
      } else {
        timer = setTimeout(step, props.backSpeed)
      }
    }
  }

  timer = setTimeout(step, props.startDelay)
})

onUnmounted(() => {
  stopped = true
  if (timer) clearTimeout(timer)
})
</script>
<template>
  <div :class="$attrs.class">
    <span ref="el" class="text-xl"></span>
  </div>
</template>

