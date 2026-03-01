/**
 * JT Engenharia - Landing Page
 */

document.addEventListener('DOMContentLoaded', () => {
  initAOS();
  initNavbar();
  initMobileMenu();
  initCarousel();
  initAccordion();
  initCounters();
  initForms();
  initPhoneInput();
  initYear();
  initModals();
  initUTMs();
});

/* ==========================================
   AOS
   ========================================== */

function initAOS() {
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      once: true,
      offset: 80,
      easing: 'ease-out-cubic',
      disableMutationObserver: true
    });
  }
}

/* ==========================================
   NAVBAR (Sticky)
   ========================================== */

function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  const onScroll = () => {
    if (window.scrollY > 80) {
      navbar.classList.add('navbar--scrolled');
    } else {
      navbar.classList.remove('navbar--scrolled');
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ==========================================
   MOBILE MENU
   ========================================== */

function initMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  if (!hamburger || !mobileMenu) return;

  hamburger.addEventListener('click', () => {
    const isOpen = hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    hamburger.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Fechar ao clicar em link
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      mobileMenu.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });
}

/* ==========================================
   CAROUSEL (Depoimentos)
   ========================================== */

function initCarousel() {
  const track = document.querySelector('.carousel__track');
  const slides = document.querySelectorAll('.carousel__slide');
  const prevBtn = document.querySelector('.carousel__arrow--prev');
  const nextBtn = document.querySelector('.carousel__arrow--next');
  const dots = document.querySelectorAll('.carousel__dot');

  if (!track || slides.length === 0) return;

  let current = 0;
  const total = slides.length;

  function goTo(index) {
    if (index < 0) index = total - 1;
    if (index >= total) index = 0;
    current = index;
    track.style.transform = `translateX(-${current * 100}%)`;

    dots.forEach((dot, i) => {
      dot.classList.toggle('carousel__dot--active', i === current);
    });
  }

  if (prevBtn) prevBtn.addEventListener('click', () => goTo(current - 1));
  if (nextBtn) nextBtn.addEventListener('click', () => goTo(current + 1));

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => goTo(i));
  });

  // Swipe gesture (mobile)
  let startX = 0;
  let endX = 0;

  track.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
  }, { passive: true });

  track.addEventListener('touchend', (e) => {
    endX = e.changedTouches[0].clientX;
    const diff = startX - endX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) goTo(current + 1);
      else goTo(current - 1);
    }
  }, { passive: true });

  // Auto-play (opcional, pausa no hover)
  let autoPlay = setInterval(() => goTo(current + 1), 6000);

  const carousel = document.querySelector('.carousel');
  if (carousel) {
    carousel.addEventListener('mouseenter', () => clearInterval(autoPlay));
    carousel.addEventListener('mouseleave', () => {
      autoPlay = setInterval(() => goTo(current + 1), 6000);
    });
  }
}

/* ==========================================
   ACCORDION (FAQ)
   ========================================== */

function initAccordion() {
  const items = document.querySelectorAll('.accordion__item');
  if (items.length === 0) return;

  items.forEach(item => {
    const header = item.querySelector('.accordion__header');
    if (!header) return;

    header.addEventListener('click', () => {
      const isActive = item.classList.contains('accordion__item--active');

      // Fechar todos
      items.forEach(i => {
        i.classList.remove('accordion__item--active');
        const btn = i.querySelector('.accordion__header');
        if (btn) btn.setAttribute('aria-expanded', 'false');
      });

      // Abrir o clicado (se nao estava aberto)
      if (!isActive) {
        item.classList.add('accordion__item--active');
        header.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

/* ==========================================
   CONTADORES ANIMADOS (Numeros)
   ========================================== */

function initCounters() {
  const counters = document.querySelectorAll('[data-counter]');
  if (counters.length === 0) return;

  let animated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        animateCounters(counters);
        observer.disconnect();
      }
    });
  }, { threshold: 0.5 });

  const section = document.getElementById('numeros');
  if (section) observer.observe(section);
}

function animateCounters(counters) {
  counters.forEach((counter, index) => {
    const target = parseInt(counter.getAttribute('data-counter'), 10);
    const duration = 2000;
    const delay = index * 150;

    setTimeout(() => {
      const startTime = performance.now();

      function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Ease-out deceleration
        const eased = 1 - Math.pow(1 - progress, 3);
        const currentValue = Math.round(eased * target);

        counter.textContent = currentValue;

        if (progress < 1) {
          requestAnimationFrame(update);
        } else {
          counter.textContent = target;

          // Bounce no suffix
          const suffix = counter.nextElementSibling;
          if (suffix && suffix.classList.contains('numeros__suffix')) {
            suffix.style.transition = 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)';
            suffix.style.transform = 'scale(1.2)';
            setTimeout(() => {
              suffix.style.transform = 'scale(1)';
            }, 300);
          }
        }
      }

      requestAnimationFrame(update);
    }, delay);
  });
}

/* ==========================================
   FORMULARIOS
   ========================================== */

const tempEmailDomains = [
  'tempmail', 'guerrillamail', '10minutemail', 'mailinator',
  'throwaway', 'fakeinbox', 'yopmail', 'trashmail', 'temp-mail',
  'disposable', 'sharklasers'
];

function isValidEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regex.test(email)) return false;
  const domain = email.split('@')[1].toLowerCase();
  return !tempEmailDomains.some(temp => domain.includes(temp));
}

function initForms() {
  document.querySelectorAll('form[data-form]').forEach(form => {
    form.addEventListener('submit', handleFormSubmit);
  });
}

async function handleFormSubmit(e) {
  e.preventDefault();

  const form = e.target;
  const btn = form.querySelector('[type="submit"]');
  const feedback = form.querySelector('.form-feedback');

  // Validacao
  let valid = true;
  form.querySelectorAll('[required]').forEach(field => {
    field.classList.remove('error');

    if (!field.value.trim()) {
      field.classList.add('error');
      valid = false;
    }

    if (field.type === 'email' && field.value && !isValidEmail(field.value)) {
      field.classList.add('error');
      valid = false;
    }

    if (field.type === 'tel') {
      const iti = field._iti;
      if (iti && !iti.isValidNumber()) {
        field.classList.add('error');
        valid = false;
      }
    }
  });

  if (!valid) {
    showFeedback(feedback, 'error', 'Preencha todos os campos corretamente.');
    return;
  }

  // Captura dados ANTES do envio
  const nome = form.querySelector('[name="nome"]')?.value || '';

  // Telefone internacional
  const phone = form.querySelector('input[type="tel"]');
  if (phone && phone._iti) {
    phone.value = phone._iti.getNumber();
  }

  // Estado do botao
  const originalText = btn.textContent;
  btn.disabled = true;
  btn.textContent = 'Enviando...';

  // Tracking (Meta Pixel + GTM)
  if (typeof fbq === 'function') {
    fbq('track', 'Lead');
  }
  if (typeof dataLayer !== 'undefined') {
    dataLayer.push({ event: 'generate_lead', form_name: form.getAttribute('name') || 'contato', method: 'netlify_form' });
  }

  // Envio ao Netlify Forms via sendBeacon (sobrevive ao redirect)
  const formBody = new URLSearchParams(new FormData(form)).toString();
  const blob = new Blob([formBody], { type: 'application/x-www-form-urlencoded' });
  navigator.sendBeacon(window.location.pathname, blob);

  // Redirect para WhatsApp (acontece SEMPRE apos validacao)
  const redirectWhatsApp = "554784566163";

  const primeiroNome = nome.trim() ? nome.trim().split(' ')[0] : 'Cliente';
  const selectInteresse = form.querySelector('[name="interesse"]');
  const textInteresse = selectInteresse ? selectInteresse.value : 'serviços elétricos';

  const mensagemWa = `Olá, me chamo ${primeiroNome} e gostaria de um orçamento para ${textInteresse}`;

  const whatsappUrl = new URL('https://api.whatsapp.com/send');
  whatsappUrl.searchParams.set('phone', redirectWhatsApp);
  whatsappUrl.searchParams.set('text', mensagemWa);

  window.location.href = whatsappUrl.toString();
}

function showFeedback(el, type, msg) {
  if (!el) return;
  el.className = 'form-feedback ' + type;
  el.textContent = msg;
  setTimeout(() => {
    el.className = 'form-feedback';
    el.textContent = '';
  }, 5000);
}

/* ==========================================
   TELEFONE INTERNACIONAL
   ========================================== */

function initPhoneInput() {
  if (typeof intlTelInput === 'undefined') return;

  document.querySelectorAll('input[type="tel"]').forEach(input => {
    input._iti = intlTelInput(input, {
      initialCountry: 'br',
      preferredCountries: ['br', 'us', 'pt'],
      separateDialCode: true,
      strictMode: true,
      loadUtilsOnInit: 'https://cdn.jsdelivr.net/npm/intl-tel-input@24.6.0/build/js/utils.js'
    });
  });
}

/* ==========================================
   UTILS
   ========================================== */

function initYear() {
  const el = document.getElementById('year');
  if (el) el.textContent = new Date().getFullYear();
}

/* ==========================================
   MODAIS E POP-UP
   ========================================== */

function initModals() {
  document.querySelectorAll('[data-modal]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault(); // Evita scroll do href="#contato"
      const modal = document.getElementById(btn.dataset.modal);
      if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  document.querySelectorAll('.modal-overlay').forEach(modal => {
    modal.querySelector('.modal-close')?.addEventListener('click', () => closeModal(modal));
    modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(modal); });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const active = document.querySelector('.modal-overlay.active');
      if (active) closeModal(active);
    }
  });
}

function closeModal(modal) {
  modal.classList.remove('active');
  document.body.style.overflow = '';
}

/* ==========================================
   UTMS TAGS
   ========================================== */
function initUTMs() {
  const urlParams = new URLSearchParams(window.location.search);
  const utmFields = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];

  document.querySelectorAll('form[data-form]').forEach(form => {
    utmFields.forEach(field => {
      const val = urlParams.get(field);
      if (val) {
        let input = form.querySelector(`input[name="${field}"]`);
        if (!input) {
          input = document.createElement('input');
          input.type = 'hidden';
          input.name = field;
          form.appendChild(input);
        }
        input.value = val;
      }
    });
  });
}
