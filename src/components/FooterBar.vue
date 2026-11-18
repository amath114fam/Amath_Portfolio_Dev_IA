<script setup>
import { profile, navLinks } from '../data'
import { ArrowUp, Github, Linkedin, MessageCircle } from 'lucide-vue-next'

const socialIcons = { github: Github, linkedin: Linkedin, whatsapp: MessageCircle }
const year = new Date().getFullYear()

function scrollToTop() {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' })
}
</script>

<template>
  <footer class="foot">
    <div class="container grid">
      <div>
        <p class="brand">{{ profile.name }}</p>
        <p class="role">{{ profile.role }}</p>
      </div>
      <div>
        <p class="title">Navigation</p>
        <nav class="footer-nav" aria-label="Navigation de pied de page">
          <a v-for="link in navLinks" :key="link.href" :href="link.href">{{ link.label }}</a>
        </nav>
      </div>
      <div>
        <p class="title">Suivre</p>
        <div class="soc">
          <a v-for="s in profile.socials" :key="s.label" :href="s.url" target="_blank" rel="noopener" :aria-label="s.label"><component :is="socialIcons[s.icon]" :size="18" :stroke-width="1.5" color="currentColor" aria-hidden="true" /></a>
        </div>
      </div>
    </div>
    <div class="container bottom">
      <span aria-hidden="true"></span>
      <p class="copy">© {{ year }} {{ profile.name }}. Tous droits réservés.</p>
      <button class="top-button" type="button" aria-label="Retour en haut de la page" @click="scrollToTop"><ArrowUp :size="16" aria-hidden="true" /></button>
    </div>
  </footer>
</template>

<style scoped>
.foot { border-top: 1px solid var(--line); padding: 2.5rem 0 1.5rem; font-size: .85rem; color: var(--muted); }
.grid { display: grid; grid-template-columns: 1.4fr 1fr 1fr; align-items: start; gap: 2rem; }
.brand { font-family: var(--serif); font-size: 1.6rem; color: var(--ink); }
.title { font-size: .7rem; letter-spacing: .12em; text-transform: uppercase; color: var(--ink); font-weight: 600; margin-bottom: .5rem; }
.soc { display: flex; gap: .6rem; }
.footer-nav { display: grid; gap: .5rem; }
.footer-nav a { width: fit-content; color: var(--muted); transition: color .2s, transform .2s; }
.footer-nav a:hover { color: var(--accent); transform: translateX(4px); }
.footer-nav a:focus-visible, .top-button:focus-visible { outline: 2px solid var(--accent); outline-offset: 3px; }
.soc a { width: 34px; height: 34px; display: grid; place-items: center; border: 1px solid var(--line); border-radius: 50%; font-size: .72rem; font-weight: 600; color: var(--ink); transition: all .2s; }
.soc a:hover { background: var(--accent); border-color: var(--accent); color: var(--btn-ink); }
.bottom { display: grid; grid-template-columns: 1fr auto 1fr; align-items: center; margin-top: 2rem; }
.copy { text-align: center; font-size: .72rem; }
.top-button { justify-self: end; display: grid; width: 38px; height: 38px; place-items: center; border: 1px solid var(--line); border-radius: 50%; background: transparent; color: var(--ink); transition: border-color .2s, color .2s, background .2s; }
.top-button:hover { border-color: var(--accent); background: var(--accent); color: var(--btn-ink); }
@media (max-width: 700px) {
  .grid { grid-template-columns: 1fr; gap: 1.6rem; }
  .bottom { grid-template-columns: 1fr auto; gap: 1rem; }
  .bottom > span { display: none; }
  .copy { justify-self: start; text-align: left; }
}
@media (prefers-reduced-motion: reduce) { .footer-nav a, .top-button { transition: none; } }
</style>
