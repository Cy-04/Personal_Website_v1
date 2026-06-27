fetch('/components/lightbox.html')
      .then(res => res.text())
      .then(html => {
        document.getElementById('lightbox-container').innerHTML = html;
        initLightbox('.collection-grid img');
      });