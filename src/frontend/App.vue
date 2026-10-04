<template>
  <div>
    <NightBackdrop v-if="pulseEnabled" />
    <router-view />
  </div>
</template>

<script setup>
import { useTheme } from './composables/useTheme'
import NightBackdrop from './components/NightBackdrop.vue'
import { computed, inject, watch, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { isPulseThemeEnabled, initPulseMotion } from './utils/pulseTheme'

const appConfig = inject('appConfig', {})
const route = useRoute()
const pulseEnabled = computed(() => isPulseThemeEnabled(appConfig.theme_options) && route.name !== 'Admin')
watch(pulseEnabled, (enabled) => document.body.classList.toggle('pulse-theme', enabled), { immediate: true })
let disposeMotion
onMounted(() => { disposeMotion = initPulseMotion() })
onUnmounted(() => { disposeMotion?.(); document.body.classList.remove('pulse-theme') })

const { initTheme } = useTheme()

initTheme()
</script>
