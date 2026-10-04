import { ref } from 'vue'
import { isThemeOptionEnabled } from './themeOptions'

export const isPulseThemeEnabled = (options) => import.meta.env.VITE_PULSE_THEME === 'true' || isThemeOptionEnabled(options, 'starry') || isThemeOptionEnabled(options, 'pulse')
export const pulseMotion = ref(true)

export const setPulseMotion = (enabled) => {
  pulseMotion.value = Boolean(enabled)
  document.body.classList.toggle('pulse-motion-off', !pulseMotion.value)
}

export const togglePulseMotion = () => {
  setPulseMotion(!pulseMotion.value)
  try { localStorage.setItem('pulse_motion', String(pulseMotion.value)) } catch (_) { /* Storage can be disabled. */ }
}

export const initPulseMotion = () => {
  const media = window.matchMedia('(prefers-reduced-motion: reduce)')
  let saved
  try { saved = localStorage.getItem('pulse_motion') } catch (_) { /* Use system preference. */ }
  setPulseMotion(saved === null || saved === undefined ? !media.matches : saved === 'true')
  const update = () => {
    let preference
    try { preference = localStorage.getItem('pulse_motion') } catch (_) { /* Use system preference. */ }
    if (preference === null || preference === undefined) setPulseMotion(!media.matches)
  }
  const visibility = () => document.body.classList.toggle('pulse-tab-hidden', document.hidden)
  media.addEventListener('change', update)
  document.addEventListener('visibilitychange', visibility)
  visibility()
  return () => {
    media.removeEventListener('change', update)
    document.removeEventListener('visibilitychange', visibility)
  }
}
