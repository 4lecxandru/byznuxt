<template>
  <div class="slide">
    <video :src="videoSrc" muted loop playsinline ref="videoRef"></video>
    <div class="gradient"></div>
    <div class="content">
      <h2><slot name="title" /></h2>
      <p><slot name="description" /></p>
      <slot name="actions" />
    </div>
  </div>
</template>

<script setup>
defineProps({
  videoSrc: { type: String, required: true }
})
// Poți adăuga logica de ref/observer sau o poți păstra centralizat în pagină.
</script>

<style scoped>
.slide {
  position: relative;
  height: 100vh;
  width: 100vw;
  scroll-snap-align: start;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 16vh 5vw 8vh;
  background: #000;
}
.slide video {
  position: absolute;
  top: 0; left: 0;
  width: 100%; height: 100%;
  object-fit: cover;
}
.gradient {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.2) 100%);
  pointer-events: none;
}
.content {
  position: relative;
  z-index: 5;
  max-width: 450px;
}
/* Restul stilurilor pentru h2, p, etc. */
</style>