<script setup>
import { profile } from '../data'
import { Mail, Phone, MapPin, Github, Linkedin, MessageCircle } from 'lucide-vue-next'

const socialIcons = { github: Github, linkedin: Linkedin, whatsapp: MessageCircle }
const year = new Date().getFullYear()
</script>

<template>
  <footer class="foot">
    <div class="container grid">
      <div>
        <p class="brand">{{ profile.name }}</p>
        <p class="role">{{ profile.role }}</p>
      </div>
      <div>
        <p class="title">Contact</p>
        <a class="contact-link" :href="`mailto:${profile.email}`"><Mail :size="18" :stroke-width="1.5" color="currentColor" aria-hidden="true" />{{ profile.email }}</a>
        <a class="contact-link" :href="`tel:${profile.phone.replace(/\s/g, '')}`"><Phone :size="18" :stroke-width="1.5" color="currentColor" aria-hidden="true" />{{ profile.phone }}</a>
        <p class="contact-link"><MapPin :size="18" :stroke-width="1.5" color="currentColor" aria-hidden="true" />{{ profile.location }}</p>
      </div>
      <div>
        <p class="title">Suivre</p>
        <div class="soc">
          <a v-for="s in profile.socials" :key="s.label" :href="s.url" target="_blank" rel="noopener" :aria-label="s.label"><component :is="socialIcons[s.icon]" :size="18" :stroke-width="1.5" color="currentColor" aria-hidden="true" /></a>
        </div>
      </div>
    </div>
    <p class="copy">© {{ year }} {{ profile.name }}. Tous droits réservés.</p>
  </footer>
</template>

<style scoped>
.foot { border-top: 1px solid var(--line); padding: 2.5rem 0 1.5rem; font-size: .85rem; color: var(--muted); }
.grid { display: grid; grid-template-columns: 1.4fr 1fr 1fr; gap: 2rem; }
.brand { font-family: var(--serif); font-size: 1.6rem; color: var(--ink); }
.title { font-size: .7rem; letter-spacing: .12em; text-transform: uppercase; color: var(--ink); font-weight: 600; margin-bottom: .5rem; }
.soc { display: flex; gap: .6rem; }
.contact-link { display: inline-flex; align-items: center; gap: .5rem; }
.soc a { width: 34px; height: 34px; display: grid; place-items: center; border: 1px solid var(--line); border-radius: 50%; font-size: .72rem; font-weight: 600; color: var(--ink); transition: all .2s; }
.soc a:hover { background: var(--accent); border-color: var(--accent); color: #fff; }
.copy { text-align: center; margin-top: 2rem; font-size: .72rem; }
@media (max-width: 700px) { .grid { grid-template-columns: 1fr; } }
</style>
