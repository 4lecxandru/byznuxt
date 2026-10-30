<template>
  <div class="reel-app-wrapper">
    <div class="feed" id="mainFeed">
      
      <!-- Slide 1 -->
      <ReelSlide video-src="/reelsales/StorySaver.net-mrs_lgl-Video-1774254803609.mp4">
        <template #title>Technical Assistant for <span>Marketing & Operations</span></template>
        <template #description>Automations & CRM. 20 hours per week, completely autonomous.</template>
        <template #actions>
          <button class="btn solid" @click="scrollToLead">🎯 Book a Discovery Call →</button>
        </template>
      </ReelSlide>

      <!-- Slide 2 -->
      <ReelSlide video-src="/reelsales/WhatsApp Video 2026-05-20 at 15.32.51.mp4">
        <template #title>Employee: £3,000. <span>Me: £850/month.</span></template>
        <template #description>No taxes, no chaotic freelancing. A single autonomous technical executor.</template>
        <template #actions>
          <button class="btn solid" @click="scrollToLead">💰 Book a Discovery Call →</button>
        </template>
      </ReelSlide>

      <!-- Slide 3 -->
      <ReelSlide video-src="/reelsales/out.mp4">
        <template #title>Best. <span>Waifu.</span></template>
        <template #description>No taxes, no chaotic freelancing. A single autonomous technical executor.</template>
        <template #actions>
          <button class="btn solid" @click="scrollToLead">💰 Book a Discovery Call →</button>
        </template>
      </ReelSlide>

      <!-- Slide Final / Lead Slide -->
      <div class="slide lead-slide" id="leadSlide">
        <div class="content">
          <div class="lead-form">
            <h3>Let's Talk.</h3>
            <p>Book a slot directly in my calendar to discuss how we can automate your business systems.</p>
            <a href="https://calendly.com/" target="_blank" class="btn solid">📅 Open Calendly →</a>
          </div>
        </div>
      </div>

    </div>

    <!-- Buton Mute / Unmute cu SVG inline garantat să apară -->
    <button class="unmute-btn" @click="toggleMute">
      <!-- Iconiță Mute (Volume Off) -->
      <svg v-if="isMuted" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
        <line x1="1" y1="1" x2="23" y2="23"></line>
        <path d="M9 9v6a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.12-2.12L7 4.88"></path>
        <path d="M23 9l-6 6"></path>
        <path d="M17 9l-6 6"></path>
      </svg>
      <!-- Iconiță Unmute (Volume High) -->
      <svg v-else xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
        <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
        <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
      </svg>
    </button>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'reelsales'
})

import { ref, onMounted } from 'vue'

const isMuted = ref(true)
let activeVideo = null // Ținem evidența doar a videoclipului activ curent

const scrollToLead = () => {
  const leadSlide = document.getElementById('leadSlide')
  if (leadSlide) {
    leadSlide.scrollIntoView({ behavior: 'smooth' })
  }
}

const toggleMute = () => {
  isMuted.value = !isMuted.value
  // Controlăm strict doar videoclipul vizibil în ecran
  if (activeVideo) {
    activeVideo.muted = isMuted.value
    if (!isMuted.value) {
      activeVideo.play().catch(() => {})
    }
  }
}

onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const video = entry.target.querySelector('video')
      if (!video) return

      if (entry.isIntersecting && entry.intersectionRatio >= 0.7) {
        video.play().catch(() => {})
        activeVideo = video // Setăm noul video activ
        video.muted = isMuted.value // Sincronizăm starea de sunet
      } else {
        video.pause()
        video.muted = true // Oprim și dăm mute automat când iese din ecran
      }
    })
  }, { threshold: 0.7 })

  document.querySelectorAll('.slide').forEach(s => observer.observe(s))

  // Autoplay inițial pe mute pentru toate videoclipurile
  document.querySelectorAll('video').forEach(v => {
    v.muted = true
    v.play().catch(() => {})
  })
})
</script>

<style scoped>
.reel-app-wrapper {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

.feed {
  height: 100vh;
  width: 100vw;
  overflow-y: scroll;
  scroll-snap-type: y mandatory;
  scrollbar-width: none;
}

.feed::-webkit-scrollbar {
  display: none;
}

/* Fallback pentru slide-ul de lead */
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

.lead-slide {
  justify-content: center;
  align-items: center;
  text-align: center;
  background: #0a0a0e;
}

.lead-form {
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.2);
  border-radius: 20px;
  padding: 30px 20px;
  width: 100%;
  max-width: 400px;
  backdrop-filter: blur(10px);
}

.lead-form h3 {
  font-size: 1.8rem;
  margin-bottom: 8px;
  color: #D4AF37;
}

.lead-form p {
  color: #aaa;
  margin-bottom: 20px;
  font-size: 0.9rem;
}

.btn {
  display: block;
  width: 100%;
  padding: 15px 18px;
  background: rgba(0,0,0,0.55);
  border: 2px solid #D4AF37;
  color: #D4AF37;
  font-size: 0.95rem;
  font-weight: 700;
  text-align: center;
  border-radius: 12px;
  cursor: pointer;
  margin-bottom: 8px;
  backdrop-filter: blur(6px);
  text-decoration: none;
}

.btn.solid {
  background: #D4AF37;
  color: #000;
  border: none;
  box-shadow: 0 8px 25px rgba(212,175,55,0.3);
}

.unmute-btn {
  position: fixed;
  top: 16px;
  right: 16px;
  z-index: 100;
  width: 44px;
  height: 44px;
  background: rgba(0,0,0,0.7);
  border: 1px solid #D4AF37;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #D4AF37;
  backdrop-filter: blur(8px);
}
</style>