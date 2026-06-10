/* =============================================
   SHB — Sport Health Beauty
   script.js
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ------------------------------------------
     1. NAV — mobile toggle
  ------------------------------------------ */
  const navToggle = document.getElementById('navToggle');
  const navMobile = document.getElementById('navMobile');

  if (navToggle && navMobile) {
    navToggle.addEventListener('click', () => {
      navMobile.classList.toggle('open');
    });

    // Cerrar al hacer click en un link del menú móvil
    navMobile.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navMobile.classList.remove('open');
      });
    });
  }

  /* ------------------------------------------
     2. NAV — cambio de fondo al hacer scroll
  ------------------------------------------ */
  const navbar = document.getElementById('navbar');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      navbar.style.background = 'rgba(9,9,9,0.97)';
    } else {
      navbar.style.background = 'rgba(9,9,9,0.88)';
    }
  }, { passive: true });

  /* ------------------------------------------
     3. FILTRO DE CATEGORÍAS
  ------------------------------------------ */
  const catBtns    = document.querySelectorAll('.cat-btn');
  const peptideCards = document.querySelectorAll('.peptide-card');

  catBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Actualizar botón activo
      catBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      peptideCards.forEach(card => {
        if (filter === 'all' || card.dataset.cat === filter) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  /* ------------------------------------------
     4. SCROLL REVEAL — animación de entrada
  ------------------------------------------ */
  const revealEls = document.querySelectorAll(
    '.peptide-card, .pack-card, .channel, .cat-btn, .section-title, .section-label'
  );

  revealEls.forEach(el => el.classList.add('reveal'));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  revealEls.forEach(el => observer.observe(el));

  /* ------------------------------------------
     5. SMOOTH SCROLL — compensar navbar fija
  ------------------------------------------ */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const offset = 72; // altura del navbar
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

});
