<script setup>
import { reactive, ref } from 'vue'
import { profile } from '../data'
import { Send } from 'lucide-vue-next'
import { vReveal } from '../composables/useReveal'

const form = reactive({ name: '', email: '', message: '' })
const sent = ref(false)

// Ouvre le client mail avec le message pré-rempli (aucun serveur nécessaire)
function submit() {
  const subject = encodeURIComponent(`Projet – ${form.name}`)
  const body = encodeURIComponent(`${form.message}\n\n${form.name} (${form.email})`)
  window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`
  sent.value = true
}
</script>

<template>
  <section id="contact" class="contact">
    <div class="container box" v-reveal>
      <div class="intro">
        <p class="eyebrow">Un projet en tête ?</p>
        <h2 class="h2">Construisons quelque chose d'utile ensemble.</h2>
        <p class="sub">Entreprise ou mission freelance, j'ai hâte d'en discuter.</p>
      </div>
      <form @submit.prevent="submit">
        <label>Nom<input v-model.trim="form.name" required autocomplete="name" /></label>
        <label>Email<input v-model.trim="form.email" type="email" required autocomplete="email" /></label>
        <label>Message<textarea v-model.trim="form.message" rows="4" required /></label>
        <button class="btn btn-dark" type="submit"><Send :size="18" :stroke-width="1.5" color="currentColor" aria-hidden="true" />Envoyer le message</button>
        <p v-if="sent" class="ok" role="status">Ton application mail s'ouvre avec le message prêt à partir.</p>
      </form>
    </div>
  </section>
</template>

<style scoped>
.contact { padding: 4rem 0; }
.box { display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; background: var(--accent-soft); border-radius: 10px; padding: 3rem; }
.sub { color: var(--muted); margin-top: 1rem; }
form { display: grid; gap: 1rem; }
label { display: grid; gap: .35rem; font-size: .78rem; font-weight: 500; }
input, textarea { font: inherit; padding: .75rem .9rem; border: 1px solid var(--line); border-radius: var(--radius); background: var(--surface); color: var(--ink); resize: vertical; }
input:focus, textarea:focus { outline: 2px solid var(--accent); border-color: transparent; }
form .btn { justify-self: start; }
.ok { font-size: .8rem; color: var(--accent); }
@media (max-width: 860px) { .box { grid-template-columns: 1fr; padding: 2rem 1.4rem; } }
</style>
