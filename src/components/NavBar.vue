<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { profile, navLinks } from '../data'
import { Sun, Moon, Menu, X } from 'lucide-vue-next'

defineProps({ theme: String })
defineEmits(['toggle-theme'])

const open = ref(false)
const scrolled = ref(false)
const onScroll = () => (scrolled.value = window.scrollY > 10)
onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <header class="nav" :class="{ scrolled }">
    <div class="container bar">
      <a href="#accueil" class="logo" aria-label="Accueil">
        <span class="mono">A</span>
        <span class="logo-text"><b>{{ profile.name }}</b><small>Développeur Full-Stack + IA</small></span>
      </a>

      <nav :class="{ open }" aria-label="Navigation principale">
        <a v-for="l in navLinks" :key="l.href" :href="l.href" @click="open = false">{{ l.label }}</a>
      </nav>

      <div class="actions">
        <button class="icon-btn" @click="$emit('toggle-theme')" :aria-label="theme === 'dark' ? 'Mode clair' : 'Mode sombre'">
          <Sun v-if="theme === 'dark'" :size="18" :stroke-width="1.5" color="currentColor" aria-hidden="true" />
          <Moon v-else :size="18" :stroke-width="1.5" color="currentColor" aria-hidden="true" />
        </button>
        <a href="#contact" class="btn btn-dark cta">Discutons</a>
        <button class="icon-btn burger" @click="open = !open" :aria-expanded="open" aria-label="Menu">
          <Menu v-if="!open" :size="20" :stroke-width="1.5" color="currentColor" aria-hidden="true" /><X v-else :size="20" :stroke-width="1.5" color="currentColor" aria-hidden="true" />
        </button>
      </div>
    </div>
  </header>
</template>

<style scoped>
.nav { position: sticky; top: 0; z-index: 50; background: color-mix(in srgb, var(--bg) 85%, transparent); backdrop-filter: blur(12px); border-bottom: 1px solid transparent; transition: border-color .3s; }
.nav.scrolled { border-color: var(--line); }
.bar { display: flex; align-items: center; justify-content: space-between; height: 72px; gap: 1rem; }
.logo { display: flex; align-items: center; gap: .7rem; }
.mono { font-family: var(--serif); font-size: 2.2rem; line-height: 1; font-weight: 600; }
.logo-text { display: flex; flex-direction: column; line-height: 1.15; }
.logo-text b { font-size: .8rem; letter-spacing: .14em; text-transform: uppercase; font-weight: 500; }
.logo-text small { font-size: .62rem; letter-spacing: .1em; color: var(--muted); }
nav { display: flex; gap: 2.2rem; }
nav a { font-size: .75rem; letter-spacing: .1em; text-transform: uppercase; position: relative; padding: .4rem 0; }
nav a::after { content: ''; position: absolute; left: 0; right: 100%; bottom: 0; height: 2px; background: var(--accent); transition: right .25s; }
nav a:hover::after { right: 0; }
.actions { display: flex; align-items: center; gap: .8rem; }
.icon-btn { background: none; border: 1px solid var(--line); border-radius: 50%; width: 38px; height: 38px; display: grid; place-items: center; color: var(--ink); transition: border-color .2s, color .2s; }
.icon-btn:hover { border-color: var(--accent); color: var(--accent); }
.burger { display: none; }

@media (max-width: 900px) {
  .cta { display: none; }
  .burger { display: grid; }
  nav { position: absolute; top: 72px; left: 0; right: 0; flex-direction: column; gap: 0; background: var(--bg); border-bottom: 1px solid var(--line); max-height: 0; overflow: hidden; transition: max-height .35s ease; }
  nav.open { max-height: 380px; }
  nav a { padding: 1rem 24px; border-top: 1px solid var(--line); }
}
</style>
