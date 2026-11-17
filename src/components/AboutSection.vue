<script setup>
import { profile, stats, skills } from '../data'
import { Download } from 'lucide-vue-next'
import { useCountUp } from '../composables/useCountUp'
import { vReveal } from '../composables/useReveal'
import { h } from 'vue'

// Petit composant interne pour un chiffre animé
const Stat = {
  props: { value: Number, suffix: String, label: String },
  setup(props) {
    const { el, value } = useCountUp(props.value)
    return () => h('div', { class: 'stat', ref: el }, [
      h('span', { class: 'num' }, `${value.value}${props.suffix}`),
      h('span', { class: 'lab' }, props.label),
    ])
  },
}
</script>

<template>
  <section id="a-propos" class="about">
    <div class="container grid">
      <div v-reveal>
        <p class="eyebrow">À propos</p>
        <h2 class="h2">Un bon produit ne se contente pas d'être beau, il doit servir.</h2>
        <p class="txt">Je pars du Python et de Django, puis je construis des interfaces en Vue.js, React ou Angular. Je m'intéresse particulièrement aux solutions locales, notamment dans l'éducation, qui répondent à de vrais besoins au Sénégal.</p>
        <ul class="skills"><li v-for="s in skills" :key="s">{{ s }}</li></ul>
        <a :href="profile.cvUrl" download class="btn btn-line"><Download :size="18" :stroke-width="1.5" color="currentColor" aria-hidden="true" />Télécharger mon CV</a>
      </div>
      <div class="stats" v-reveal="150">
        <Stat v-for="s in stats" :key="s.label" v-bind="s" />
      </div>
    </div>
  </section>
</template>

<style scoped>
.about { background: var(--bg-soft); padding: 5rem 0; }
.grid { display: grid; grid-template-columns: 1.2fr 1fr; gap: 4rem; align-items: center; }
.txt { color: var(--muted); margin: 1.2rem 0; max-width: 52ch; }
.skills { display: flex; flex-wrap: wrap; gap: .5rem; list-style: none; padding: 0; margin-bottom: 1.8rem; }
.skills li { font-size: .78rem; padding: .3rem .8rem; border: 1px solid var(--line); border-radius: 999px; background: var(--surface); transition: transform .2s, border-color .2s; }
.skills li:hover { transform: translateY(-2px); border-color: var(--accent); }
.stats { display: grid; }
:deep(.stat) { display: flex; align-items: baseline; gap: 1rem; padding: 1.1rem 0; border-bottom: 1px solid var(--line); }
:deep(.num) { font-family: var(--serif); font-size: 2.8rem; line-height: 1; min-width: 4.5rem; color: var(--accent); }
:deep(.lab) { font-size: .85rem; color: var(--muted); }
@media (max-width: 860px) { .grid { grid-template-columns: 1fr; gap: 2.5rem; } }
</style>
