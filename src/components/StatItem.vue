<script setup>
import { computed } from 'vue'
import { ChevronDown } from 'lucide-vue-next'
import { useCountUp } from '../composables/useCountUp'

const props = defineProps({
  value: { type: Number, required: true },
  suffix: { type: String, default: '' },
  label: { type: String, required: true },
  detail: { type: String, default: null },
  open: { type: Boolean, default: false },
  formations: { type: Array, default: () => [] },
  languages: { type: Array, default: () => [] },
})
const emit = defineEmits(['toggle', 'pointer-enter', 'pointer-leave'])
const { el, value } = useCountUp(props.value)
const interactive = computed(() => Boolean(props.detail))
const details = computed(() => props.detail === 'formations' ? props.formations : props.languages)
const panelId = computed(() => `stat-detail-${props.detail}`)

function onPointerEnter(event) {
  if (interactive.value && event.pointerType === 'mouse') emit('pointer-enter', props.detail)
}

function onPointerLeave(event) {
  if (interactive.value && event.pointerType === 'mouse') emit('pointer-leave', props.detail)
}
</script>

<template>
  <div ref="el" class="stat" @pointerenter="onPointerEnter" @pointerleave="onPointerLeave">
    <button v-if="interactive" class="stat-trigger" type="button" :aria-expanded="open" :aria-controls="panelId" @click="emit('toggle', detail)">
      <span class="num">{{ value }}{{ suffix }}</span>
      <span class="lab">{{ label }} <ChevronDown :size="14" aria-hidden="true" class="chevron" /></span>
    </button>
    <div v-else class="stat-static">
      <span class="num">{{ value }}{{ suffix }}</span>
      <span class="lab">{{ label }}</span>
    </div>

    <Transition name="popover">
      <div v-if="interactive && open" :id="panelId" class="popover" role="region" :aria-label="label">
        <ol v-if="detail === 'formations'" class="formation-list">
          <li v-for="(formation, index) in formations" :key="`${formation.school}-${formation.title}`" class="formation">
            <span class="timeline" :class="{ last: index === formations.length - 1 }" aria-hidden="true"></span>
            <div><strong>{{ formation.title }}</strong><span class="school">{{ formation.school }}</span><span class="period">{{ formation.period }}</span></div>
          </li>
        </ol>
        <ul v-else class="language-list">
          <li v-for="language in languages" :key="language.name" class="language-badge">
            <strong>{{ language.name }}</strong><span v-if="language.level"> · {{ language.level }}</span>
          </li>
        </ul>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.stat { position: relative; display: flex; align-items: baseline; gap: 1rem; padding: 1.1rem 0; border-bottom: 1px solid var(--line); }
.stat-trigger, .stat-static { display: flex; align-items: baseline; gap: 1rem; width: 100%; text-align: left; }
.stat-trigger { padding: 0; border: 0; background: transparent; color: inherit; }
.stat-trigger:focus-visible { outline: 2px solid var(--accent); outline-offset: 5px; border-radius: 3px; }
.num { font-family: var(--serif); font-size: 2.8rem; line-height: 1; min-width: 4.5rem; color: var(--accent); }
.lab { display: inline-flex; align-items: center; gap: .3rem; font-size: .85rem; color: var(--muted); }
.chevron { transition: transform .2s; }
.stat-trigger[aria-expanded="true"] .chevron { transform: rotate(180deg); }
.popover { position: absolute; top: calc(100% + .4rem); left: 0; z-index: 10; width: min(340px, calc(100vw - 32px)); max-height: 20rem; overflow-y: auto; padding: 1.2rem; border: 1px solid var(--line); border-radius: 10px; background: var(--surface); color: var(--ink); box-shadow: 0 10px 30px rgb(0 0 0 / .12); }
.formation-list, .language-list { list-style: none; padding: 0; margin: 0; }
.formation { display: grid; grid-template-columns: 14px 1fr; gap: .8rem; padding-bottom: 1rem; }
.formation:last-child { padding-bottom: 0; }
.formation > div { display: grid; gap: .15rem; }
.formation strong { font-size: .88rem; line-height: 1.4; }
.timeline { position: relative; justify-self: center; width: 9px; height: 9px; margin-top: .35rem; border-radius: 50%; background: var(--accent); }
.timeline:not(.last)::after { position: absolute; top: 9px; left: 4px; width: 1px; height: calc(100% + 1.15rem); content: ''; background: var(--line); }
.school { color: var(--accent); font-size: .82rem; }
.period { color: var(--muted); font-size: .76rem; }
.language-list { display: flex; flex-wrap: wrap; gap: .5rem; }
.language-badge { padding: .35rem .7rem; border: 1px solid var(--line); border-radius: 999px; background: var(--surface); font-size: .78rem; }
.language-badge span { color: var(--muted); font-size: .72rem; }
.popover-enter-active, .popover-leave-active { transition: opacity .2s ease, transform .2s ease; }
.popover-enter-from, .popover-leave-to { opacity: 0; transform: translateY(8px); }
@media (max-width: 860px) { .popover { width: 100%; } }
@media (prefers-reduced-motion: reduce) { .popover-enter-active, .popover-leave-active, .chevron { transition: none; } }
</style>
