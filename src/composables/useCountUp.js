import { ref, onMounted, onBeforeUnmount } from 'vue'

// Compteur animé qui démarre quand l'élément devient visible
export function useCountUp(target, duration = 1400) {
  const el = ref(null)
  const value = ref(0)
  let io

  onMounted(() => {
    io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      io.disconnect()
      const start = performance.now()
      const tick = (now) => {
        const p = Math.min((now - start) / duration, 1)
        value.value = Math.round(target * (1 - Math.pow(1 - p, 3)))
        if (p < 1) requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
    }, { threshold: 0.5 })
    if (el.value) io.observe(el.value)
  })
  onBeforeUnmount(() => io && io.disconnect())

  return { el, value }
}
