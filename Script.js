// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) navbar.classList.add('scrolled');
  else navbar.classList.remove('scrolled');
});

// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ===== ACTIVE NAV LINK ON SCROLL =====
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 80;
    if (window.scrollY >= sectionTop) current = section.getAttribute('id');
  });
  navItems.forEach(a => {
    a.classList.remove('active');
    if (a.getAttribute('href') === '#' + current) a.classList.add('active');
  });
});

// ===== INTERSECTION OBSERVER (AOS) =====
const aosEls = document.querySelectorAll('[data-aos]');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('aos-animated'), i * 80);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
aosEls.forEach(el => observer.observe(el));

// ===== REVIEWS CAROUSEL =====
const track = document.getElementById('reviewsTrack');
const dots = document.querySelectorAll('.dot');
let current = 0;
const cardCount = document.querySelectorAll('.review-card').length;
const visibleCount = window.innerWidth > 768 ? 3 : 1;
const maxSlide = Math.max(0, cardCount - visibleCount);

function goTo(index) {
  current = Math.max(0, Math.min(index, maxSlide));
  const cardWidth = track.querySelector('.review-card').offsetWidth + 24; // 24 = gap
  track.style.transform = `translateX(-${current * cardWidth}px)`;
  dots.forEach((d, i) => d.classList.toggle('active', i === current));
}

dots.forEach((dot, i) => dot.addEventListener('click', () => goTo(i)));

// Auto-advance
let autoSlide = setInterval(() => goTo((current + 1) > maxSlide ? 0 : current + 1), 4000);
track.parentElement.addEventListener('mouseenter', () => clearInterval(autoSlide));
track.parentElement.addEventListener('mouseleave', () => {
  autoSlide = setInterval(() => goTo((current + 1) > maxSlide ? 0 : current + 1), 4000);
});

// Touch swipe for carousel
let touchStartX = 0;
track.addEventListener('touchstart', e => touchStartX = e.touches[0].clientX);
track.addEventListener('touchend', e => {
  const diff = touchStartX - e.changedTouches[0].clientX;
  if (diff > 50) goTo(current + 1);
  else if (diff < -50) goTo(current - 1);
});

// ===== CONTACT FORM =====
const sendBtn = document.getElementById('sendBtn');
const formSuccess = document.getElementById('formSuccess');
sendBtn.addEventListener('click', () => {
  const inputs = document.querySelectorAll('.contact-form input, .contact-form textarea');
  let allFilled = true;
  inputs.forEach(inp => {
    if (!inp.value.trim()) {
      allFilled = false;
      inp.style.borderColor = '#e53e3e';
      setTimeout(() => inp.style.borderColor = '', 2000);
    }
  });
  if (allFilled) {
    sendBtn.textContent = 'Sending...';
    sendBtn.disabled = true;
    setTimeout(() => {
      formSuccess.classList.add('show');
      sendBtn.textContent = 'Send Message';
      sendBtn.disabled = false;
      inputs.forEach(inp => inp.value = '');
      setTimeout(() => formSuccess.classList.remove('show'), 3500);
    }, 1000);
  }
});

// ===== CHIP STAGGER ANIMATION =====
document.querySelectorAll('.chip').forEach((chip, i) => {
  chip.style.animationDelay = `${i * 60}ms`;
});

// ===== SMOOTH ENTRANCE FOR PHONE MOCKUP =====
const phoneCards = document.querySelectorAll('.phone-card, .phone-card-sm');
phoneCards.forEach((card, i) => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(10px)';
  setTimeout(() => {
    card.style.transition = 'all 0.5s ease';
    card.style.opacity = '1';
    card.style.transform = 'translateY(0)';
  }, 600 + i * 120);
});

// ===== COUNTER ANIMATION =====
function animateCounter(el, target, suffix = '') {
  let start = 0;
  const duration = 1800;
  const step = (timestamp) => {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target).toLocaleString() + suffix;
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

const statNums = document.querySelectorAll('.stat-num');
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      statNums.forEach(el => {
        const text = el.textContent;
        if (text.includes('1,000')) animateCounter(el, 1000, '+');
        else if (text.includes('31,000')) animateCounter(el, 31000, '+');
      });
      statsObserver.disconnect();
    }
  });
}, { threshold: 0.5 });
if (statNums.length) statsObserver.observe(statNums[0]);