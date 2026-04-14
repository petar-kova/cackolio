const header = document.getElementById('header');
const menuToggle = document.getElementById('menuToggle');
const nav = document.getElementById('nav');
const loader = document.getElementById('loader');
const year = document.getElementById('year');
const cookieBanner = document.getElementById('cookieBanner');
const acceptCookies = document.getElementById('acceptCookies');
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxClose = document.getElementById('lightboxClose');

window.addEventListener('load', () => {
  loader.classList.add('loader--hidden');
});

window.addEventListener('scroll', () => {
  header.classList.toggle('header--shadow', window.scrollY > 10);
});

menuToggle.addEventListener('click', () => {
  const open = nav.classList.toggle('nav--open');
  menuToggle.setAttribute('aria-expanded', String(open));
});

document.querySelectorAll('.nav a').forEach((link) => {
  link.addEventListener('click', () => {
    nav.classList.remove('nav--open');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});

const chips = document.querySelectorAll('.chip');
const products = document.querySelectorAll('.product');

chips.forEach((chip) => {
  chip.addEventListener('click', () => {
    chips.forEach((c) => c.classList.remove('chip--active'));
    chip.classList.add('chip--active');

    const active = chip.dataset.filter;
    products.forEach((item) => {
      item.classList.toggle('hidden', active !== 'all' && item.dataset.category !== active);
    });
  });
});

const testimonials = document.querySelectorAll('.testimonial');
let activeIndex = 0;
setInterval(() => {
  testimonials[activeIndex].classList.remove('testimonial--active');
  activeIndex = (activeIndex + 1) % testimonials.length;
  testimonials[activeIndex].classList.add('testimonial--active');
}, 4500);

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

document.querySelectorAll('.gallery__item').forEach((item) => {
  item.addEventListener('click', () => {
    lightboxImage.src = item.dataset.lightbox;
    lightbox.classList.add('lightbox--open');
    lightbox.setAttribute('aria-hidden', 'false');
  });
});

const closeLightbox = () => {
  lightbox.classList.remove('lightbox--open');
  lightbox.setAttribute('aria-hidden', 'true');
  lightboxImage.src = '';
};

lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (event) => {
  if (event.target === lightbox) {
    closeLightbox();
  }
});

if (!localStorage.getItem('cookiesAccepted')) {
  cookieBanner.classList.add('cookie-banner--show');
}

acceptCookies.addEventListener('click', () => {
  localStorage.setItem('cookiesAccepted', 'true');
  cookieBanner.classList.remove('cookie-banner--show');
});

year.textContent = new Date().getFullYear();
