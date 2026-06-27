function initLightbox(gallery_selector) {
  
  const GALLERY_SELECTOR = gallery_selector; // ← adjust to your selector

  const lightbox    = document.getElementById('lightbox');
  const backdrop    = document.getElementById('lightboxBackdrop');
  const lightboxImg = document.getElementById('lightboxImg');
  const closeBtn    = document.getElementById('lightboxClose');
  const prevBtn     = document.getElementById('lightboxPrev');
  const nextBtn     = document.getElementById('lightboxNext');
  const strip       = document.getElementById('lightboxStrip');
const zoomBtn    = document.getElementById('lightboxZoom');
const counter    = document.getElementById('lightboxCounter');
let isZoomed     = false;

  let images  = [];
  let current = 0;

  function buildImageList() {
    const nodes = document.querySelectorAll(GALLERY_SELECTOR);
    images = Array.from(nodes).map(img => ({
      src: img.dataset.full || img.src,
      thumb: img.src,
      alt: img.alt || ''
    }));
    return nodes;
  }

  function buildStrip() {
    strip.innerHTML = '';
    images.forEach((item, i) => {
      const thumb = document.createElement('img');
      thumb.src       = item.thumb;
      thumb.alt       = item.alt;
      thumb.className = 'lightbox__thumb';
      thumb.addEventListener('click', () => goTo(i));
      strip.appendChild(thumb);
    });
  }

  function openAt(index) {
    current = index;
    showCurrent();
    lightbox.classList.add('is-open');
    backdrop.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
  }

  function close() {
    lightbox.classList.remove('is-open');
    backdrop.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  function goTo(index) {
    current = index;
    showCurrent();
  }

 function showCurrent() {
  lightboxImg.src = images[current].src;
  lightboxImg.alt = images[current].alt;
  prevBtn.disabled = current === 0;
  nextBtn.disabled = current === images.length - 1;

  // Update counter
  counter.textContent = `${current + 1} / ${images.length}`;

  // Reset zoom on image change
  resetZoom();

  // Update active thumbnail + scroll into view
  const thumbs = strip.querySelectorAll('.lightbox__thumb');
  thumbs.forEach((t, i) => t.classList.toggle('is-active', i === current));
  thumbs[current]?.scrollIntoView({ inline: 'center', behavior: 'smooth', block: 'nearest' });
}
function resetZoom() {
  isZoomed = false;
  lightboxImg.classList.remove('is-zoomed');
  lightboxImg.closest('.lightbox__content').classList.remove('is-zoomed');
  zoomBtn.classList.remove('is-zoomed');
  zoomBtn.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="11" cy="11" r="8"/>
      <line x1="21" y1="21" x2="16.65" y2="16.65"/>
      <line x1="11" y1="8" x2="11" y2="14"/>
      <line x1="8" y1="11" x2="14" y2="11"/>
    </svg>`;
}

function toggleZoom() {
  isZoomed = !isZoomed;
  const content = lightboxImg.closest('.lightbox__content');

  if (isZoomed) {
    lightboxImg.classList.add('is-zoomed');
    content.classList.add('is-zoomed');
    zoomBtn.classList.add('is-zoomed');
    zoomBtn.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="11" cy="11" r="8"/>
        <line x1="21" y1="21" x2="16.65" y2="16.65"/>
        <line x1="8" y1="11" x2="14" y2="11"/>
      </svg>`;
  } else {
    resetZoom();
  }
}
  function prev() { if (current > 0)                { current--; showCurrent(); } }
  function next() { if (current < images.length - 1) { current++; showCurrent(); } }

  function init() {
    const nodes = buildImageList();
    buildStrip();
    zoomBtn.addEventListener('click', toggleZoom);
    
    document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('is-open')) return;
  if (e.key === 'Escape')     close();
  if (e.key === 'ArrowLeft')  prev();
  if (e.key === 'ArrowRight') next();
});

    nodes.forEach((img, i) => {
      const trigger = img.closest('a, .gallery-item') || img;
      trigger.style.cursor = 'pointer';
      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        openAt(i);
      });
    });

    closeBtn.addEventListener('click', close);
    backdrop.addEventListener('click', (e) => {
      // Only close if clicking the backdrop itself, not the lightbox content
      if (e.target === backdrop) close();
    });
    prevBtn.addEventListener('click', prev);
    nextBtn.addEventListener('click', next);

    document.addEventListener('keydown', (e) => {
      if (!lightbox.classList.contains('is-open')) return;
      if (e.key === 'Escape')     close();
      if (e.key === 'ArrowLeft')  prev();
      if (e.key === 'ArrowRight') next();
    });
  }

 init();
}