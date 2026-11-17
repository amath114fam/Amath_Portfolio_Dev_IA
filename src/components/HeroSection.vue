<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { profile } from '../data'
import { ArrowRight, ArrowDown, Download } from 'lucide-vue-next'

// Texte qui s'écrit et s'efface en boucle
const badgeName = profile.name.toUpperCase()
const initials = profile.name.trim().split(/\s+/).filter(Boolean).map((part, index, words) => index === 0 || index === words.length - 1 ? part[0] : '').join('').toUpperCase()
const typed = ref('')
let i = 0, j = 0, deleting = false, timer

function tick() {
  const word = profile.rotating[i]
  typed.value = word.slice(0, j)
  if (!deleting && j === word.length) { deleting = true; timer = setTimeout(tick, 1400); return }
  if (deleting && j === 0) { deleting = false; i = (i + 1) % profile.rotating.length }
  j += deleting ? -1 : 1
  timer = setTimeout(tick, deleting ? 35 : 70)
}
onMounted(() => {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) { typed.value = profile.rotating[0]; return }
  tick()
})
onBeforeUnmount(() => clearTimeout(timer))

// Léger effet de parallaxe sur la photo
const tilt = ref({ x: 0, y: 0 })
function onMove(e) {
  const r = e.currentTarget.getBoundingClientRect()
  tilt.value = { x: ((e.clientX - r.left) / r.width - 0.5) * 14, y: ((e.clientY - r.top) / r.height - 0.5) * 14 }
}
</script>

<template>
  <section id="accueil" class="hero">
    <div class="container grid">
      <div class="text">
        <p class="eyebrow">Salut, Je suis {{ profile.name }}</p>
        <h1>
          Je crée
          <span class="typed">{{ typed }}<i class="caret" /></span>
          <em>qui marquent les esprits.</em>
        </h1>
        <hr />
        <p class="lead">{{ profile.intro }}</p>
        <div class="buttons">
          <a href="#projets" class="btn btn-dark">Voir mes projets <ArrowRight :size="18" :stroke-width="1.5" color="currentColor" aria-hidden="true" /></a>
          <a :href="profile.cvUrl" download class="btn btn-line"><Download :size="16" :stroke-width="1.5" aria-hidden="true" />Télécharger mon CV</a>
        </div>
      </div>

      <div class="visual" @mousemove="onMove" @mouseleave="tilt = { x: 0, y: 0 }">
        <div class="blob" :style="{ transform: `translate(${tilt.x * -1}px, ${tilt.y * -1}px)` }" />
        <div class="dots" />
        <img v-if="profile.photo" :src="profile.photo" :alt="`Portrait de ${profile.name}`" class="photo" :style="{ transform: `translate(${tilt.x}px, ${tilt.y}px)` }" />
        <div v-else class="photo placeholder" :style="{ transform: `translate(${tilt.x}px, ${tilt.y}px)` }">
          <span>{{ profile.name[0] }}</span>
        </div>
        <svg class="badge" viewBox="0 0 120 120" aria-hidden="true">
          <defs><path id="c" d="M60,60 m-46,0 a46,46 0 1,1 92,0 a46,46 0 1,1 -92,0" /></defs>
          <text><textPath href="#c" textLength="289.03" lengthAdjust="spacing">{{ badgeName }} · DEV FULL-STACK + IA · {{ badgeName }} · </textPath></text>
          <text x="60" y="68" text-anchor="middle" class="sig">{{ initials }}.</text>
        </svg>
      </div>
    </div>
    <a href="#services" class="scroll" aria-label="Défiler vers le bas"><span>Défiler</span><ArrowDown :size="18" :stroke-width="1.5" color="currentColor" aria-hidden="true" /><i /></a>
  </section>
</template>

<style scoped>
.hero { position: relative; padding: 3rem 0 5rem; overflow: hidden; }
.grid { display: grid; grid-template-columns: 1.1fr 1fr; align-items: center; gap: 2rem; }
h1 { font-family: var(--serif); font-weight: 500; font-size: clamp(2.6rem, 5.6vw, 4.4rem); line-height: 1.05; margin: 1.2rem 0 1.6rem; }
.typed { display: block; min-height: 1.1em; }
.caret { display: inline-block; width: 2px; height: .85em; background: var(--accent); margin-left: 4px; vertical-align: -.05em; animation: blink 1s steps(1) infinite; }
@keyframes blink { 50% { opacity: 0; } }
h1 em { display: block; color: var(--accent); font-style: italic; }
hr { width: 56px; border: 0; border-top: 1px solid var(--ink); margin-bottom: 1.4rem; }
.lead { max-width: 46ch; color: var(--muted); margin-bottom: 2rem; }
.buttons { display: flex; flex-wrap: wrap; gap: .9rem; }

.visual { position: relative; aspect-ratio: 1 / 1.05; max-width: 520px; margin-left: auto; width: 100%; }
.blob { position: absolute; inset: 8% 6% 0 12%; border-radius: 50%; background: var(--accent-soft); transition: transform .3s ease-out; }
.dots { position: absolute; right: 0; top: 30%; width: 38%; height: 40%; background-image: radial-gradient(var(--accent) 1.2px, transparent 1.2px); background-size: 14px 14px; opacity: .35; }
.photo { position: absolute; inset: 0 8% 0 8%; width: 84%; height: 100%; object-fit: cover; object-position: top; transition: transform .3s ease-out; border-radius: 50% 50% 0 0 / 38% 38% 0 0; }
.placeholder { display: grid; place-items: center; background: linear-gradient(160deg, var(--accent), #2b1f5c); }
.placeholder span { font-family: var(--serif); font-size: clamp(7rem, 16vw, 12rem); color: #fff; opacity: .9; font-weight: 600; }
.badge { position: absolute; right: 0; top: 2%; width: 112px; height: 112px; animation: spin 24s linear infinite; }
.badge text { font-size: 8.5px; letter-spacing: .15em; fill: var(--ink); }
.badge .sig { font-family: var(--script); font-size: 26px; letter-spacing: 0; fill: var(--accent); animation: spin-rev 24s linear infinite; transform-origin: 60px 60px; }
@keyframes spin { to { transform: rotate(360deg); } }
@keyframes spin-rev { to { transform: rotate(-360deg); } }

.scroll { position: absolute; left: max(24px, calc((100% - var(--maxw)) / 2)); bottom: 1.2rem; display: flex; flex-direction: column; gap: .4rem; font-size: .6rem; letter-spacing: .14em; text-transform: uppercase; color: var(--muted); }
.scroll i { width: 1px; height: 28px; background: var(--ink); transform-origin: top; animation: drop 1.8s ease-in-out infinite; }
@keyframes drop { 0% { transform: scaleY(0); } 60% { transform: scaleY(1); opacity: 1; } 100% { transform: scaleY(1); opacity: 0; } }

@media (max-width: 900px) {
  .grid { grid-template-columns: 1fr; }
  .visual { margin: 1rem auto 0; max-width: 380px; }
  .scroll { display: none; }
}
</style>
