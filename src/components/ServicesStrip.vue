<script setup>
import { services } from '../data'
import { Globe, Server, Smartphone, Sparkles } from 'lucide-vue-next'
import { vReveal } from '../composables/useReveal'

const icons = { web: Globe, api: Server, mobile: Smartphone, ai: Sparkles }
</script>

<template>
  <section id="services" class="strip">
    <div class="container panel">
      <article v-for="(s, k) in services" :key="s.title" class="item" v-reveal="k * 90">
        <div class="icon-wrap">
          <component :is="icons[s.icon]" :size="40" :stroke-width="1.5" color="currentColor" aria-hidden="true" />
        </div>
        <h3>{{ s.title }}</h3>
        <p>{{ s.text }}</p>
      </article>
    </div>
  </section>
</template>

<style scoped>
.strip { padding: 1rem 0 5rem; }
.panel { display: grid; grid-template-columns: repeat(4, 1fr); background: var(--bg-soft); border-radius: 8px; padding: 2.2rem 0; }

/* Chaque service : icône, puis titre, puis texte, empilés et centrés */
.item { display: flex; flex-direction: column; align-items: center; text-align: center; gap: .9rem; padding: 0 1.6rem; min-width: 0; }
.item + .item { border-left: 1px solid var(--line); }

.icon-wrap { width: 64px; height: 64px; display: grid; place-items: center; flex-shrink: 0; border-radius: 50%; background: var(--accent-soft); color: var(--accent); transition: transform .25s ease; }
.item:hover .icon-wrap { transform: translateY(-4px); }

h3 { font-size: .8rem; letter-spacing: .08em; text-transform: uppercase; font-weight: 600; color: var(--ink); overflow-wrap: break-word; }
p { font-size: .85rem; color: var(--muted); line-height: 1.5; max-width: 26ch; }

/* Tablette : 2 colonnes */
@media (max-width: 960px) {
  .panel { grid-template-columns: 1fr 1fr; gap: 2rem 0; }
  .item:nth-child(3) { border-left: 0; }
}

/* Mobile : 1 colonne */
@media (max-width: 560px) {
  .panel { grid-template-columns: 1fr; }
  .item + .item { border-left: 0; border-top: 1px solid var(--line); padding-top: 1.8rem; }
}

@media (prefers-reduced-motion: reduce) {
  .icon-wrap { transition: none; }
  .item:hover .icon-wrap { transform: none; }
}
</style>