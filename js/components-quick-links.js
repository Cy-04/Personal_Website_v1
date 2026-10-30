
 fetch('/components/quick-links.html')
    .then(res => res.text())
    .then(html => {
      document.getElementById('nav-quickLinks').innerHTML = html;
    })
