<script setup>
import { ref, computed, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { projects } from '../data'
import { X, ExternalLink, Github, ChevronLeft, ChevronRight } from 'lucide-vue-next'
import { vReveal } from '../composables/useReveal'

const selected = ref(null)
const track = ref(null)
const visibleCount = ref(getVisibleCount())
const isAtStart = ref(true)
const isAtEnd = ref(true)
const activePage = ref(0)
const pageCount = computed(() => Math.ceil(projects.length / visibleCount.value))
const hasControls = computed(() => projects.length > visibleCount.value)

function getVisibleCount() {
  if (typeof window === 'undefined') return 3
  if (window.innerWidth <= 560) return 1
  if (window.innerWidth <= 900) return 2
  return 3
}

function updateScrollState() {
  const element = track.value
  if (!element) return
  const maxScroll = element.scrollWidth - element.clientWidth
  isAtStart.value = element.scrollLeft <= 1
  isAtEnd.value = element.scrollLeft >= maxScroll - 1
  activePage.value = element.clientWidth
    ? Math.min(pageCount.value - 1, Math.max(0, Math.round(element.scrollLeft / element.clientWidth)))
    : 0
}

function updateLayout() {
  visibleCount.value = getVisibleCount()
  nextTick(updateScrollState)
}

function getScrollBehavior() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
}

function scrollPage(direction) {
  if (!track.value) return
  track.value.scrollBy({ left: direction * track.value.clientWidth, behavior: getScrollBehavior() })
}

function goToPage(page) {
  if (!track.value) return
  track.value.scrollTo({ left: page * track.value.clientWidth, behavior: getScrollBehavior() })
}

function handleTrackKeydown(event) {
  if (event.key === 'ArrowLeft' && !isAtStart.value) {
    event.preventDefault()
    scrollPage(-1)
  } else if (event.key === 'ArrowRight' && !isAtEnd.value) {
    event.preventDefault()
    scrollPage(1)
  }
}

onMounted(() => {
  window.addEventListener('resize', updateLayout, { passive: true })
  updateLayout()
})
onBeforeUnmount(() => window.removeEventListener('resize', updateLayout))
</script>

<template>
  <section id="projets" class="projects">
    <div class="container">
      <div class="head" v-reveal>
        <div>
          <p class="eyebrow">Réalisations</p>
          <h2 class="h2">Projets sélectionnés</h2>
        </div>
        <div v-if="hasControls" class="slider-controls">
          <button class="slider-btn" type="button" aria-label="Projets précédents" :disabled="isAtStart" @click="scrollPage(-1)"><ChevronLeft :size="20" :stroke-width="1.5" color="currentColor" aria-hidden="true" /></button>
          <button class="slider-btn" type="button" aria-label="Projets suivants" :disabled="isAtEnd" @click="scrollPage(1)"><ChevronRight :size="20" :stroke-width="1.5" color="currentColor" aria-hidden="true" /></button>
        </div>
      </div>

      <div ref="track" class="cards" role="region" aria-label="Projets" tabindex="0" @keydown="handleTrackKeydown" @scroll.passive="updateScrollState">
        <button v-for="p in projects" :key="p.id" class="card" @click="selected = p" :aria-label="`Détails du projet ${p.name}`">
          <div class="thumb" :style="{ '--c': p.color }">
            <img v-if="p.image" :src="p.image" :alt="p.name" />
            <template v-else>
              <span class="win"><i /><i /><i /></span>
              <strong>{{ p.name }}</strong>
            </template>
          </div>
          <h3>{{ p.name }}</h3>
          <p>{{ p.kind }}</p>
        </button>
      </div>
      <div v-if="hasControls" class="slider-dots" aria-label="Navigation des projets">
        <button v-for="page in pageCount" :key="page" class="slider-dot" type="button" :class="{ active: activePage === page - 1 }" :aria-label="'Aller à la page ' + page" :aria-current="activePage === page - 1 ? 'page' : undefined" @click="goToPage(page - 1)" />
      </div>
    </div>

    <Transition name="fade">
      <div v-if="selected" class="overlay" @click.self="selected = null" @keydown.esc="selected = null">
        <div class="modal" role="dialog" aria-modal="true" :aria-label="selected.name">
          <button class="close" @click="selected = null" aria-label="Fermer"><X :size="20" :stroke-width="1.5" color="currentColor" aria-hidden="true" /></button>
          <div class="m-thumb" :style="{ '--c': selected.color }">
            <img v-if="selected.image" :src="selected.image" :alt="selected.name" />
            <strong v-else>{{ selected.name }}</strong>
          </div>
          <div class="m-body">
            <p class="eyebrow">{{ selected.kind }}</p>
            <h3>{{ selected.name }}</h3>
            <p class="desc">{{ selected.desc }}</p>
            <ul class="tags"><li v-for="t in selected.tags" :key="t">{{ t }}</li></ul>
            <div class="m-actions">
              <a v-if="selected.demo" :href="selected.demo" target="_blank" rel="noopener" class="btn btn-dark"><ExternalLink :size="18" :stroke-width="1.5" color="currentColor" aria-hidden="true" />Voir la démo</a>
              <a v-if="selected.code" :href="selected.code" target="_blank" rel="noopener" class="btn btn-line"><Github :size="18" :stroke-width="1.5" color="currentColor" aria-hidden="true" />Code source</a>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </section>
</template>

<style scoped>
.projects { padding: 1rem 0 6rem; }
.head { display: flex; justify-content: space-between; align-items: flex-end; flex-wrap: wrap; gap: 1.2rem; margin-bottom: 2rem; }

.cards { display: flex; gap: 1.4rem; overflow-x: auto; overflow-y: hidden; scroll-snap-type: x mandatory; scroll-behavior: smooth; padding-block: 10px; scrollbar-width: none; }
.cards::-webkit-scrollbar { display: none; }
.card { background: none; border: 0; padding: 0; text-align: left; color: inherit; flex: 0 0 calc((100% - 2.8rem) / 3); scroll-snap-align: start; min-width: 0; }
.thumb { position: relative; aspect-ratio: 1 / .92; background: linear-gradient(150deg, var(--c), color-mix(in srgb, var(--c) 40%, #000)); display: grid; place-items: center; overflow: hidden; margin-bottom: .9rem; transition: transform .35s; }
.thumb img { width: 100%; height: 100%; object-fit: cover; }
.thumb strong { font-family: var(--serif); color: #fff; font-size: 1.7rem; font-weight: 500; text-align: center; padding: 0 1rem; line-height: 1.1; transition: transform .35s; }
.win { position: absolute; top: 12px; left: 14px; display: flex; gap: 5px; }
.win i { width: 7px; height: 7px; border-radius: 50%; background: rgba(255,255,255,.55); }
.card:hover .thumb { transform: translateY(-6px); }
.card:hover .thumb strong { transform: scale(1.06); }
.card h3 { font-size: .8rem; letter-spacing: .08em; text-transform: uppercase; font-weight: 600; }
.card p { font-size: .8rem; color: var(--muted); }
.slider-controls { display: flex; gap: .6rem; }
.slider-btn { width: 42px; height: 42px; flex: 0 0 auto; padding: 0; margin: 0; display: inline-flex; align-items: center; justify-content: center; line-height: 1; border: 1px solid var(--line); border-radius: 50%; background: none; color: var(--ink); -webkit-appearance: none; appearance: none; transition: border-color .2s, color .2s, opacity .2s; }
.slider-btn :deep(svg) { display: block; width: 20px; height: 20px; min-width: 20px; max-width: none; flex-shrink: 0; }
.slider-btn:hover:not(:disabled) { border-color: var(--accent); color: var(--accent); }
.slider-btn:disabled { opacity: .35; cursor: not-allowed; }
.slider-dots { display: flex; justify-content: center; gap: .55rem; margin-top: 1.2rem; }
.slider-dot { width: 9px; height: 9px; padding: 0; border: 0; border-radius: 50%; background: var(--line); }
.slider-dot.active { background: var(--accent); }


.overlay { position: fixed; inset: 0; background: rgba(10, 8, 18, .6); backdrop-filter: blur(4px); display: grid; place-items: center; z-index: 100; padding: 1.2rem; }
.modal { position: relative; display: grid; grid-template-columns: 1fr 1fr; width: min(860px, 100%); background: var(--surface); border-radius: 8px; overflow: hidden; }
.close { position: absolute; top: .6rem; right: .9rem; z-index: 2; width: 38px; height: 38px; padding: 0; display: inline-flex; align-items: center; justify-content: center; background: none; border: 0; color: var(--ink); line-height: 1; -webkit-appearance: none; appearance: none; }
.close :deep(svg) { display: block; width: 20px; height: 20px; max-width: none; flex-shrink: 0; }
.m-thumb { background: linear-gradient(150deg, var(--c), color-mix(in srgb, var(--c) 40%, #000)); min-height: 280px; display: grid; place-items: center; }
.m-thumb img { width: 100%; height: 100%; object-fit: cover; }
.m-thumb strong { font-family: var(--serif); color: #fff; font-size: 2.1rem; font-weight: 500; text-align: center; padding: 1rem; }
.m-body { padding: 2rem; }
.m-body h3 { font-family: var(--serif); font-size: 2rem; font-weight: 500; margin: .3rem 0 .8rem; }
.desc { color: var(--muted); margin-bottom: 1rem; }
.tags { display: flex; flex-wrap: wrap; gap: .4rem; list-style: none; padding: 0; margin-bottom: 1.4rem; }
.tags li { font-size: .75rem; padding: .25rem .7rem; border-radius: 999px; background: var(--accent-soft); color: var(--accent); }
.m-actions { display: flex; gap: .7rem; flex-wrap: wrap; }
.fade-enter-active, .fade-leave-active { transition: opacity .25s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
@media (max-width: 900px) { .card { flex-basis: calc((100% - 1.4rem) / 2); } }
@media (max-width: 560px) { .card { flex-basis: 100%; } }
@media (prefers-reduced-motion: reduce) { .cards { scroll-behavior: auto; } }
@media (max-width: 700px) { .modal { grid-template-columns: 1fr; } .m-thumb { min-height: 180px; } }
</style>
