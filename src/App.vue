<script setup>
import { ref, onMounted } from 'vue'
import NavBar from './components/NavBar.vue'
import HeroSection from './components/HeroSection.vue'
import ServicesStrip from './components/ServicesStrip.vue'
import ProjectsSection from './components/ProjectsSection.vue'
import AboutSection from './components/AboutSection.vue'
import ContactBanner from './components/ContactBanner.vue'
import FooterBar from './components/FooterBar.vue'

const theme = ref('light')

onMounted(() => {
  const saved = localStorage.getItem('theme')
  theme.value = saved || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
  document.documentElement.dataset.theme = theme.value
})

function toggleTheme() {
  theme.value = theme.value === 'dark' ? 'light' : 'dark'
  document.documentElement.dataset.theme = theme.value
  localStorage.setItem('theme', theme.value)
}
</script>

<template>
  <NavBar :theme="theme" @toggle-theme="toggleTheme" />
  <main>
    <HeroSection />
    <ServicesStrip />
    <ProjectsSection />
    <AboutSection />
    <ContactBanner />
  </main>
  <FooterBar />
</template>
