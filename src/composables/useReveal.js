// Directive v-reveal : fait apparaître un élément quand il entre à l'écran
export const vReveal = {
  mounted(el, binding) {
    el.classList.add('reveal')
    if (binding.value) el.style.transitionDelay = `${binding.value}ms`
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        el.classList.add('in')
        io.disconnect()
      }
    }, { threshold: 0.15 })
    io.observe(el)
  },
}
