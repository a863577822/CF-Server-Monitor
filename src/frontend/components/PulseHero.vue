<template>
  <section class="pulse-hero">
    <div class="pulse-eyebrow">SERVER OBSERVATORY</div>
    <h1>{{ title }}</h1>
    <p>{{ zh ? '每一个节点，都有归属。实时掌握服务器的运行状态。' : 'Every node belongs. A clear view of your infrastructure.' }}</p>
    <div class="pulse-hero-badges">
      <span>{{ zh ? '在线节点' : 'Online nodes' }} <b>{{ online }}</b></span>
      <span class="pulse-hero-status"><i :class="{ connected }"></i>{{ connected ? (zh ? '实时连接已建立' : 'Live connection established') : (zh ? '正在连接实时数据' : 'Connecting to live data') }}</span>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { currentLang } from '../utils/i18n'

defineProps({ title: String, online: Number, connected: Boolean })
const zh = computed(() => currentLang.value === 'zh')
</script>
