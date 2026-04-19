 const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 50);
      updateActiveLink();
    });
    function updateActiveLink() {
      const sections = document.querySelectorAll('section[id]');
      const links = document.querySelectorAll('.nav-links a');
      let current = '';
      sections.forEach(s => { if (window.scrollY >= s.offsetTop - 160) current = s.id; });
      links.forEach(l => {
        l.classList.remove('active');
        if (l.getAttribute('href').includes(current)) l.classList.add('active');
      });
    }

    // Hamburger
    const ham = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    ham.addEventListener('click', () => navLinks.classList.toggle('open'));
    document.querySelectorAll('.nav-links a').forEach(l => {
      l.addEventListener('click', () => navLinks.classList.remove('open'));
    });

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener('click', e => {
        e.preventDefault();
        const el = document.querySelector(a.getAttribute('href'));
        if (el) el.scrollIntoView({ behavior:'smooth', block:'start' });
      });
    });

    // Phone carousel
    let cardIdx = 0;
    const cards = document.querySelectorAll('.phone-card');
    function shiftCard(dir) {
      cardIdx = (cardIdx + dir + cards.length) % cards.length;
      Array.from(cards).forEach((c, i) => {
        c.style.transform = `translateX(${-cardIdx * 100}%)`;
        c.style.opacity = i === cardIdx ? '1' : '0.4';
      });
      document.querySelectorAll('.phone-dot').forEach((d, i) => {
        d.classList.toggle('active', i === cardIdx);
      });
    }
    setInterval(() => shiftCard(1), 3000);

    // Stats counter
    const statObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = +el.getAttribute('data-target');
        let count = 0;
        const inc = target / 120;
        const tick = () => {
          count += inc;
          if (count < target) { el.innerText = Math.ceil(count).toLocaleString() + '+'; requestAnimationFrame(tick); }
          else el.innerText = target.toLocaleString() + '+';
        };
        tick();
        statObserver.unobserve(el);
      });
    }, { threshold: 0.5 });
    document.querySelectorAll('.stat-num').forEach(el => statObserver.observe(el));

    // Menu tabs filter
    function filterMenu(cat, btn) {
      document.querySelectorAll('.menu-tab').forEach(t => t.classList.remove('active'));
      btn.classList.add('active');
      document.querySelectorAll('.menu-section').forEach(sec => {
        if (cat === 'all' || sec.dataset.cat === cat) {
          sec.style.display = 'block';
        } else {
          sec.style.display = 'none';
        }
      });
    }

    // Contact form
    document.getElementById('contactForm').addEventListener('submit', e => {
      e.preventDefault();
      const btn = e.target.querySelector('button');
      btn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Sending...';
      btn.disabled = true;
      setTimeout(() => {
        alert('Thank you! Your catering request has been received. Our executive will call you within 30 minutes.');
        btn.innerHTML = 'Request a Quote';
        btn.disabled = false;
        e.target.reset();
      }, 2000);
    });

    // Fade-in on scroll
    const fadeEls = document.querySelectorAll('.service-card, .step-card, .menu-item-card, .review-card, .pricing-card, .why-item');
    const fadeObs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.style.opacity='1';
          fadeObs.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    fadeEls.forEach(el => {
      el.style.opacity='0';
      el.style.transition='opacity 0.6s ease, transform 0.6s ease';
      fadeObs.observe(el);
    });

    
