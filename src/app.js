const hamburgerButton = document.getElementById('hamburger');
const navList = document.getElementById('nav-list');
const themeToggle = document.getElementById('theme-toggle');

function toggleButton() {
  navList.classList.toggle('show');
}

hamburgerButton.addEventListener('click', toggleButton);

// DARK MODE TOGGLE
const body = document.body;

function setTheme(isDark) {
  if (isDark) {
    body.classList.add('dark');
    localStorage.setItem('theme', 'dark');
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
  } else {
    body.classList.remove('dark');
    localStorage.setItem('theme', 'light');
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
  }
}

// Load saved theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
  setTheme(true);
} else {
  setTheme(false);
}

themeToggle.addEventListener('click', () => {
  const isDark = !body.classList.contains('dark');
  setTheme(isDark);
});

// PROJECT POPUP
const cards = document.querySelectorAll('.card');
const popupContainer = document.querySelector('.popup-container');
const popup = document.querySelector('.popup');
const popupLinksContainer = popup.querySelector('.popup-links');
const popupClose = document.querySelector('.popup-close');

function openPopup(card) {
  const cardImage = card.querySelector('img').src;
  const cardTitle = card.querySelector('h3').textContent;
  const cardDescriptionEl = card.querySelector('.card-text .subtext');
  const cardDescription = cardDescriptionEl ? cardDescriptionEl.textContent : '';

  popup.querySelector('img').src = cardImage;
  popup.querySelector('h3').textContent = cardTitle;
  popup.querySelector('p').textContent = cardDescription;

  popupLinksContainer.innerHTML = '';

  const cardLinks = card.querySelectorAll('.project-link');
  cardLinks.forEach((cardLink, index) => {
    if (index > 0) {
      const hr = document.createElement('hr');
      popupLinksContainer.appendChild(hr);
    }
    const popupLink = document.createElement('a');
    popupLink.href = cardLink.href;
    popupLink.textContent = cardLink.textContent;
    popupLink.target = '_blank';
    popupLink.rel = 'noopener noreferrer';
    popupLink.className = 'popup-link';
    popupLinksContainer.appendChild(popupLink);
  });

  popupContainer.classList.add('show');
  body.classList.add('no-scroll');
}

function closePopup() {
  popupContainer.classList.remove('show');
  body.classList.remove('no-scroll');
}

cards.forEach(card => {
  card.addEventListener('click', () => openPopup(card));
});

popupContainer.addEventListener('click', e => {
  // hide popup when clicking outside of it
  if (e.target === popupContainer) {
    closePopup();
  }
});

if (popupClose) {
  popupClose.addEventListener('click', closePopup);
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && popupContainer.classList.contains('show')) {
    closePopup();
  }
});

// PROJECT FILTER TABS
const filterButtons = document.querySelectorAll('.filter-btn');

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    const filter = button.getAttribute('data-filter');

    filterButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    cards.forEach(card => {
      const category = card.getAttribute('data-category');
      if (filter === 'all' || category === filter) {
        card.classList.remove('hidden');
      } else {
        card.classList.add('hidden');
      }
    });
  });
});

// OPTIONAL: SIMPLE "ON-SCROLL" ANIMATION USING INTERSECTION OBSERVER
const animatedElements = document.querySelectorAll('.fade-in-up');

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  animatedElements.forEach(el => observer.observe(el));
} else {
  // Fallback: show all if IntersectionObserver not supported
  animatedElements.forEach(el => el.classList.add('visible'));
}
