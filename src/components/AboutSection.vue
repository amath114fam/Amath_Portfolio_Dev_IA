<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { stats, skills, formations, languages } from '../data'
import StatItem from './StatItem.vue'
import { vReveal } from '../composables/useReveal'

const activeDetail = ref(null)
let closeTimer

function openDetail(detail) {
  clearTimeout(closeTimer)
  activeDetail.value = detail
}

function scheduleClose(detail) {
  clearTimeout(closeTimer)
  closeTimer = setTimeout(() => {
    if (activeDetail.value === detail) activeDetail.value = null
  }, 180)
}

function toggleDetail(detail) {
  clearTimeout(closeTimer)
  activeDetail.value = activeDetail.value === detail ? null : detail
}

function onOutsideClick(event) {
  if (activeDetail.value && !event.target.closest('.stat')) activeDetail.value = null
}

function onKeydown(event) {
  if (event.key === 'Escape') activeDetail.value = null
}

onMounted(() => {
  document.addEventListener('click', onOutsideClick)
  document.addEventListener('keydown', onKeydown)
})
onBeforeUnmount(() => {
  clearTimeout(closeTimer)
  document.removeEventListener('click', onOutsideClick)
  document.removeEventListener('keydown', onKeydown)
})
</script>

<template>
  <section id="a-propos" class="about">
    <div class="container grid">
      <div v-reveal>
        <p class="eyebrow">À propos</p>
        <h2 class="h2">Un bon produit ne se contente pas d'être beau, il doit servir.</h2>
        <p class="txt">Je pars du Python et de Django, puis je construis des interfaces avec les technologies adaptées. Je m'intéresse particulièrement aux solutions locales, notamment dans l'éducation, qui répondent à de vrais besoins au Sénégal.</p>
        <ul class="skills"><li v-for="s in skills" :key="s">{{ s }}</li></ul>
      </div>
      <div class="stats" v-reveal="150">
        <StatItem v-for="s in stats" :key="s.label" v-bind="s" :open="activeDetail === s.detail" :formations="formations" :languages="languages" @toggle="toggleDetail" @pointer-enter="openDetail" @pointer-leave="scheduleClose" />
      </div>
    </div>
  </section>
</template>

<style scoped>
.about { background: var(--bg-soft); padding: 5rem 0; }
.grid { display: grid; grid-template-columns: 1.2fr 1fr; gap: 4rem; align-items: center; }
.txt { color: var(--muted); margin: 1.2rem 0; max-width: 52ch; }
.skills { display: flex; flex-wrap: wrap; gap: .5rem; list-style: none; padding: 0; margin-bottom: 0; }
.skills li { font-size: .78rem; padding: .3rem .8rem; border: 1px solid var(--line); border-radius: 999px; background: var(--surface); transition: transform .2s, border-color .2s; }
.skills li:hover { transform: translateY(-2px); border-color: var(--accent); }
.stats { display: grid; }
.stats { align-content: center; }
@media (max-width: 860px) { .grid { grid-template-columns: 1fr; gap: 2.5rem; } }
</style>
