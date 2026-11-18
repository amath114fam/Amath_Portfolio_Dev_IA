<script setup>
import { onBeforeUnmount, ref } from 'vue'
import { Check, Copy, Github, Linkedin, Mail, MapPin, MessageCircle } from 'lucide-vue-next'
import { profile } from '../data'
import { vReveal } from '../composables/useReveal'

const copied = ref(false)
const imageVisible = ref(true)
let copiedTimer
const socialIcons = { linkedin: Linkedin, github: Github, whatsapp: MessageCircle }

function copyFallback() {
  const field = document.createElement('textarea')
  field.value = profile.email
  field.setAttribute('readonly', '')
  field.style.position = 'fixed'
  field.style.opacity = '0'
  document.body.appendChild(field)
  field.select()
  const didCopy = document.execCommand('copy')
  field.remove()
  if (!didCopy) throw new Error('La copie a échoué.')
}

async function copyEmail() {
  try {
    if (navigator.clipboard?.writeText) await navigator.clipboard.writeText(profile.email)
    else copyFallback()
  } catch {
    try {
      copyFallback()
    } catch {
      return
    }
  }
  copied.value = true
  clearTimeout(copiedTimer)
  copiedTimer = setTimeout(() => { copied.value = false }, 2000)
}

onBeforeUnmount(() => clearTimeout(copiedTimer))
</script>

<template>
  <section id="contact" class="contact">
    <div class="container">
      <div class="contact-card" :class="{ 'without-image': !imageVisible }">
        <div class="contact-decoration" aria-hidden="true"></div>
        <div class="contact-content" v-reveal>
          <p class="availability"><span class="pulse" aria-hidden="true"></span>{{ profile.availability }}</p>
          <h2 class="headline">Construisons quelque chose d'<em>utile</em> ensemble</h2>
          <p class="sub">Pour une entreprise ou une mission freelance, parlons de votre idée sans engagement.</p>
          <p class="location"><MapPin :size="18" aria-hidden="true" />{{ profile.location }}, disponible à distance</p>

          <div class="email-contact">
            <div class="email-address"><Mail :size="18" aria-hidden="true" /><span>{{ profile.email }}</span></div>
            <button class="btn btn-line copy-button" type="button" aria-label="Copier l'adresse email" @click="copyEmail">
              <Check v-if="copied" :size="18" aria-hidden="true" />
              <Copy v-else :size="18" aria-hidden="true" />
              <span aria-live="polite">{{ copied ? 'Copié' : 'Copier' }}</span>
            </button>
          </div>

          <p class="social-label">Ou retrouvez-moi sur</p>
          <nav class="social-actions" aria-label="Réseaux sociaux">
            <a v-for="social in profile.socials" :key="social.icon" class="social-button" :href="social.url" target="_blank" rel="noopener">
              <component :is="socialIcons[social.icon]" :size="18" aria-hidden="true" />
              <span>{{ social.label }}</span>
            </a>
          </nav>
        </div>
        <div v-if="imageVisible" class="image-column" v-reveal="150">
          <div class="visual">
            <div class="blob"></div>
            <div class="dots"></div>
            <img :src="profile.contactImage" width="736" height="1104" alt="Illustration d'un développeur au travail" class="contact-image" loading="lazy" @error="imageVisible = false" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.contact { position: relative; padding: 3rem 0 5rem; }
.contact-card { position: relative; isolation: isolate; display: grid; grid-template-columns: 1.1fr 1fr; align-items: center; gap: 2rem; overflow: hidden; max-width: 1040px; margin-inline: auto; padding: 3rem; border: 1px solid var(--line); border-radius: 14px; background: linear-gradient(135deg, var(--accent-soft), var(--bg-soft)); }
.contact-decoration { position: absolute; inset: 0; z-index: 0; overflow: hidden; pointer-events: none; }
.contact-decoration::before, .contact-decoration::after { position: absolute; content: ''; border-radius: 50%; }
.contact-decoration::before { top: -7rem; right: -5rem; width: 22rem; height: 22rem; background: radial-gradient(circle, var(--accent) 0, transparent 68%); opacity: .09; filter: blur(12px); }
.contact-decoration::after { bottom: 1rem; left: 2%; width: 13rem; height: 13rem; opacity: .08; background-image: radial-gradient(var(--accent) 1px, transparent 1px); background-size: 12px 12px; mask-image: radial-gradient(circle, #000 20%, transparent 72%); }
.image-column, .contact-content { position: relative; z-index: 1; min-width: 0; }
.image-column { display: grid; place-items: center; }
.visual { position: relative; width: 100%; max-width: 520px; margin-left: auto; }
.blob { position: absolute; inset: 8% 6% 0 12%; border-radius: 50%; background: var(--accent-soft); }
.dots { position: absolute; right: 0; top: 30%; width: 38%; height: 40%; background-image: radial-gradient(var(--accent) 1.2px, transparent 1.2px); background-size: 14px 14px; opacity: .35; }
.contact-image { position: relative; display: block; width: 100%; height: auto; object-fit: contain; animation: float 6s ease-in-out infinite; }
@keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
.contact-content { width: 100%; text-align: left; }
.availability { display: inline-flex; align-items: center; gap: .55rem; padding: .5rem .8rem; border: 1px solid var(--line); border-radius: 999px; background: var(--surface); color: var(--ink); font-size: .76rem; }
.pulse { width: 8px; height: 8px; flex: 0 0 8px; border-radius: 50%; background: #31845b; box-shadow: 0 0 0 0 rgb(49 132 91 / .35); animation: pulse 2s infinite; }
@keyframes pulse { 70% { box-shadow: 0 0 0 7px rgb(49 132 91 / 0); } 100% { box-shadow: 0 0 0 0 rgb(49 132 91 / 0); } }
.headline { margin-top: 1.2rem; font-family: var(--serif); font-size: clamp(2.5rem, 6vw, 4rem); font-weight: 500; line-height: 1; }
.headline em { color: var(--accent); font-weight: 500; }
.sub { max-width: 50ch; margin-top: 1rem; color: var(--muted); }
.location { display: flex; align-items: center; gap: .5rem; margin-top: 1.1rem; color: var(--muted); font-size: .85rem; }
.location :deep(svg) { flex: 0 0 auto; color: var(--accent); }
.email-contact { display: flex; align-items: center; gap: .65rem; margin-top: 1.8rem; }
.email-address { display: flex; min-width: 0; flex: 1 1 auto; align-items: center; gap: .6rem; padding: .7rem .9rem; border: 1px solid var(--line); border-radius: 999px; background: var(--surface); color: var(--ink); user-select: text; }
.email-address :deep(svg) { flex: 0 0 auto; color: var(--accent); }
.email-address span { min-width: 0; overflow-wrap: anywhere; user-select: text; }
.email-contact .btn { display: inline-flex; flex: 0 0 auto; align-items: center; justify-content: center; gap: 0; min-height: 46px; padding: 0; border: 1px solid var(--line); border-radius: 999px; background: var(--surface); color: var(--ink); transition: transform .2s, color .2s, background .2s, border-color .2s; }
.email-contact .btn :deep(svg) { display: block; width: 18px; height: 18px; max-width: none; flex-shrink: 0; margin-left: 1rem; }
.email-contact .btn span { padding: .7rem 1rem .7rem .5rem; }
.email-contact .btn:hover { transform: translateY(-2px); border-color: var(--accent); background: var(--accent); color: var(--btn-ink); }
.social-label { display: flex; align-items: center; gap: .75rem; margin-top: 2rem; color: var(--muted); font-size: .75rem; }
.social-label::before, .social-label::after { width: 2rem; height: 1px; content: ''; background: var(--line); }
.social-actions { display: flex; flex-wrap: wrap; align-items: center; gap: .7rem; row-gap: .8rem; margin-top: .75rem; }
.social-button { display: inline-flex; align-items: center; justify-content: center; gap: .55rem; min-height: 46px; padding: .75rem 1rem; border: 1px solid var(--line); border-radius: 999px; background: var(--surface); color: var(--muted); font-size: .8rem; transition: transform .2s, color .2s, background .2s, border-color .2s; }
.social-button :deep(svg) { color: var(--accent); }
.social-button:hover :deep(svg) { color: var(--btn-ink); }
.email-contact .btn:focus-visible, .social-button:focus-visible { outline: 2px solid var(--accent); outline-offset: 3px; }
.contact-card.without-image { grid-template-columns: 1fr; max-width: 720px; }
.contact-card.without-image .contact-content { text-align: center; }
.contact-card.without-image .location, .contact-card.without-image .email-contact, .contact-card.without-image .social-actions { justify-content: center; }
@media (max-width: 900px) {
  .contact-card { grid-template-columns: 1fr; gap: 1rem; padding: 2.5rem; }
  .image-column { grid-row: 2; }
  .visual { max-width: 380px; margin: 1rem auto 0; }
  .contact-content { text-align: center; }
  .location { justify-content: center; }
  .email-contact, .social-actions { justify-content: center; }
}
@media (max-width: 560px) {
  .contact { padding: 2.5rem 0; }
  .contact-card { padding: 2rem 1.2rem; }
  .headline { font-size: clamp(2.25rem, 10vw, 3rem); }
}
@media (max-width: 440px) {
  .email-contact { display: grid; grid-template-columns: minmax(0, 1fr); }
  .email-contact .btn { width: 100%; }
}
@media (prefers-reduced-motion: reduce) {
  .pulse { animation: none; }
  .contact-image { animation: none; }
  .email-contact .btn, .social-button { transition: none; }
}
</style>
