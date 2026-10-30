<!-- layouts/reelsales.vue -->
<template>
  <div class="reelsales-container">
    <slot />
  </div>
</template>

<style>
/* Variabile și reset specific pentru experiența de tip Reels/TikTok */
.reelsales-container {
  --bg: #030303;
  --accent: #D4AF37;
  --accent-glow: #F3E5AB;
  --text: #FFFFFF;
  --text-sub: rgba(255, 255, 255, 0.65);
  
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;
  background: var(--bg);
  color: var(--text);
  font-family: 'Inter', sans-serif;
  overflow: hidden;
  -webkit-tap-highlight-color: transparent;
}

/* Feed-ul vertical cu snap-scroll */
.reelsales-container .feed {
  height: 100%;
  width: 100%;
  overflow-y: scroll;
  scroll-snap-type: y mandatory;
  scrollbar-width: none;
}

.reelsales-container .feed::-webkit-scrollbar {
  display: none;
}

/* Fiecare slide individual */
.reelsales-container .slide {
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

.reelsales-container .slide video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.reelsales-container .slide .gradient {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.2) 100%);
  pointer-events: none;
}

/* Conținutul text și titlurile peste video */
.reelsales-container .content {
  position: relative;
  z-index: 5;
  max-width: 450px;
}

.reelsales-container .content h2 {
  font-size: 1.75rem;
  font-weight: 900;
  line-height: 1.15;
  margin-bottom: 8px;
  letter-spacing: -0.5px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.reelsales-container .content h2 span {
  color: var(--accent);
}

.reelsales-container .content p {
  font-size: 0.9rem;
  color: #ddd;
  margin-bottom: 16px;
  line-height: 1.35;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Butoane Call-to-Action */
.reelsales-container .btn {
  display: block;
  width: 100%;
  padding: 15px 18px;
  background: rgba(0,0,0,0.55);
  border: 2px solid var(--accent);
  color: var(--accent);
  font-size: 0.95rem;
  font-weight: 700;
  text-align: center;
  border-radius: 12px;
  cursor: pointer;
  margin-bottom: 8px;
  backdrop-filter: blur(6px);
  transition: all 0.2s;
  text-decoration: none;
}

.reelsales-container .btn:active {
  transform: scale(0.97);
}

.reelsales-container .btn.solid {
  background: var(--accent);
  color: #000;
  border: none;
  box-shadow: 0 8px 25px rgba(212,175,55,0.3);
}

.reelsales-container .btn.secondary {
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: #fff;
  background: rgba(255, 255, 255, 0.08);
}

/* Slide-ul final de Lead / Formular / Calendly */
.reelsales-container .lead-slide {
  justify-content: center;
  align-items: center;
  text-align: center;
  background: #0a0a0e;
}

.reelsales-container .lead-form {
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.2);
  border-radius: 20px;
  padding: 30px 20px;
  width: 100%;
  max-width: 400px;
  backdrop-filter: blur(10px);
}

.reelsales-container .lead-form h3 {
  font-size: 1.8rem;
  margin-bottom: 8px;
  color: var(--accent);
}

.reelsales-container .lead-form p {
  color: #aaa;
  margin-bottom: 20px;
  font-size: 0.9rem;
  line-height: 1.4;
  display: block;
}

/* Butonul flotant de Mute / Unmute */
.reelsales-container .unmute-btn {
  position: fixed;
  top: 16px;
  right: 16px;
  z-index: 100;
  width: 44px;
  height: 44px;
  background: rgba(0,0,0,0.7);
  border: 1px solid var(--accent);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: var(--accent);
  font-size: 1.2rem;
  backdrop-filter: blur(8px);
  transition: all 0.2s;
}

.reelsales-container .unmute-btn:active {
  transform: scale(0.92);
}

.reelsales-container .unmute-btn i {
  pointer-events: none;
}
</style>