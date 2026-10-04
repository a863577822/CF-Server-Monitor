<template>
  <div class="pulse-backdrop" aria-hidden="true">
    <img class="pulse-night-image" :src="nightImage" alt="">
    <canvas ref="canvas" class="pulse-night-stars"></canvas>
    <div class="pulse-night-mist"></div>
    <div class="pulse-night-shade"></div>
  </div>
  <div class="pulse-background-controls">
    <button type="button" class="pulse-motion-toggle" :aria-pressed="pulseMotion" @click="togglePulseMotion">
      <span aria-hidden="true">{{ pulseMotion ? 'Ⅱ' : '▷' }}</span>
      {{ pulseMotion ? (zh ? '星夜流动中' : 'Night in motion') : (zh ? '星夜已暂停' : 'Night paused') }}
    </button>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import nightImage from '../assets/starry.jpg'
import { currentLang } from '../utils/i18n'
import { pulseMotion } from '../utils/pulseTheme'
import { togglePulseMotion } from '../utils/pulseTheme'

const canvas = ref(null)
const zh = computed(() => currentLang.value === 'zh')
let context, width = 0, height = 0, frame = 0, previousFrame = 0, elapsed = 0
let stars = []
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')

const resize = () => {
  if (!canvas.value || !context) return
  width = window.innerWidth
  height = window.innerHeight
  const ratio = Math.min(window.devicePixelRatio || 1, 1.5)
  canvas.value.width = Math.round(width * ratio)
  canvas.value.height = Math.round(height * ratio)
  context.setTransform(ratio, 0, 0, ratio, 0, 0)
  stars = Array.from({ length: width < 700 ? 35 : 65 }, () => ({
    x: Math.random() * width, y: Math.random() * height * .5,
    radius: .35 + Math.random() * .65, phase: Math.random() * Math.PI * 2,
    speed: .3 + Math.random() * .45, glow: .12 + Math.random() * .25
  }))
  draw()
}

const draw = () => {
  if (!context) return
  context.clearRect(0, 0, width, height)
  for (const star of stars) {
    const brightness = star.glow * (.65 + Math.sin(elapsed * star.speed + star.phase) * .35)
    context.beginPath()
    context.fillStyle = `rgba(215,232,245,${brightness})`
    context.arc(star.x, star.y, star.radius, 0, Math.PI * 2)
    context.fill()
  }
  // An occasional quiet trail, confined to the sky above the working panels.
  const cycle = elapsed % 24
  if (cycle < 2.5 && pulseMotion.value && !reducedMotion.matches) {
    const progress = cycle / 2.5
    const x = width * (.62 + progress * .22)
    const y = height * (.06 + progress * .14)
    const alpha = Math.sin(progress * Math.PI) * .3
    const gradient = context.createLinearGradient(x - 65, y - 24, x, y)
    gradient.addColorStop(0, 'rgba(208,230,245,0)')
    gradient.addColorStop(1, `rgba(208,230,245,${alpha})`)
    context.beginPath(); context.strokeStyle = gradient; context.lineWidth = .8
    context.moveTo(x - 65, y - 24); context.lineTo(x, y); context.stroke()
  }
}

const tick = (timestamp) => {
  frame = requestAnimationFrame(tick)
  if (previousFrame && timestamp - previousFrame < 40) return
  if (previousFrame) elapsed += Math.min((timestamp - previousFrame) / 1000, .1)
  previousFrame = timestamp
  draw()
}

const synchronize = () => {
  if (frame) cancelAnimationFrame(frame)
  frame = 0
  previousFrame = 0
  if (context && pulseMotion.value && !document.hidden && !reducedMotion.matches) frame = requestAnimationFrame(tick)
  else draw()
}
watch(pulseMotion, synchronize)
onMounted(() => {
  context = canvas.value?.getContext('2d')
  resize(); synchronize()
  window.addEventListener('resize', resize, { passive: true })
  document.addEventListener('visibilitychange', synchronize)
  reducedMotion.addEventListener('change', synchronize)
})
onUnmounted(() => {
  if (frame) cancelAnimationFrame(frame)
  window.removeEventListener('resize', resize)
  document.removeEventListener('visibilitychange', synchronize)
  reducedMotion.removeEventListener('change', synchronize)
})
</script>
