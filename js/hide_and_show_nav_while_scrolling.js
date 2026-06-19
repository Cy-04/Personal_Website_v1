const nav = document.getElementById('mainNav');
let lastScrollY = window.scrollY;
let scrollTimer = null;

window.addEventListener('scroll', () => {
  const currentScrollY = window.scrollY;

  // Hide when scrolling down (past the nav height)
  if (currentScrollY > lastScrollY && currentScrollY > nav.offsetHeight) {
    nav.classList.add('hidden');
    console.log("hello there");
  }
  // Show immediately when scrolling up
  else if (currentScrollY < lastScrollY) {
    nav.classList.remove('hidden');
  }

  lastScrollY = currentScrollY;
/*
  // Also show after user stops scrolling (800ms threshold)
  clearTimeout(scrollTimer);
  scrollTimer = setTimeout(() => {
    nav.classList.remove('hidden');
  }, 800);
*/
});