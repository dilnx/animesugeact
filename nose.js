document.addEventListener('DOMContentLoaded', () => {
  initHeaderScroll();
  initAnimeFilters();
  initShareLinks();
  initRevealAnimations();
  initBannerEntrance();
});

function initHeaderScroll() {
  const header = document.querySelector('header');
  if (!header) return;

  const onScroll = () => {
    header.classList.toggle('scrolled', window.scrollY > 10);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

function initAnimeFilters() {
  const searchInput = document.querySelector('#anime-search');
  const searchButton = document.querySelector('.filter-btn');
  const filterButtons = document.querySelectorAll('[data-filter]');
  const arrowButtons = document.querySelectorAll('.filter-arrows button');
  const cards = document.querySelectorAll('.anime-card');
  const emptyState = document.querySelector('.empty-state');
  const categories = [
    'sub trending',
    'sub',
    'sub random',
    'dub',
    'sub trending',
    'dub',
    'sub trending',
    'sub',
    'random',
    'dub trending',
    'sub',
    'sub',
    'dub',
    'sub trending',
    'dub',
    'random',
    'sub trending',
    'dub',
    'sub',
    'random',
    'dub',
  ];
  let activeFilter = 'all';

  if (!cards.length) return;

  cards.forEach((card, index) => {
    card.dataset.category = categories[index] || 'sub';
    card.dataset.title = card.textContent.trim().toLowerCase();
  });

  const applyFilters = () => {
    const query = searchInput ? searchInput.value.trim().toLowerCase() : '';
    let visibleCount = 0;

    cards.forEach((card) => {
      const matchesSearch = !query || card.dataset.title.includes(query);
      const matchesFilter =
        activeFilter === 'all' ||
        card.dataset.category.split(' ').includes(activeFilter);
      const isVisible = matchesSearch && matchesFilter;

      card.classList.toggle('is-hidden', !isVisible);
      visibleCount += isVisible ? 1 : 0;
    });

    if (emptyState) {
      emptyState.hidden = visibleCount > 0;
    }
  };

  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      activeFilter = button.dataset.filter;

      filterButtons.forEach((currentButton) => {
        const isActive = currentButton === button;
        currentButton.classList.toggle('active', isActive);
        currentButton.setAttribute('aria-pressed', String(isActive));
      });

      applyFilters();
    });
  });

  arrowButtons.forEach((button, directionIndex) => {
    button.addEventListener('click', () => {
      const currentIndex = Array.from(filterButtons).findIndex(
        (button) => button.dataset.filter === activeFilter,
      );
      const direction = directionIndex === 0 ? -1 : 1;
      const nextIndex =
        (currentIndex + direction + filterButtons.length) % filterButtons.length;

      filterButtons[nextIndex].click();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', applyFilters);
  }

  if (searchButton) {
    searchButton.addEventListener('click', () => {
      applyFilters();
      searchInput?.focus();
    });
  }

  applyFilters();
}

function initShareLinks() {
  const pageUrl = encodeURIComponent(window.location.href);
  const pageTitle = encodeURIComponent(document.title);
  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${pageUrl}`,
    x: `https://twitter.com/intent/tweet?url=${pageUrl}&text=${pageTitle}`,
    whatsapp: `https://api.whatsapp.com/send?text=${pageTitle}%20${pageUrl}`,
    reddit: `https://www.reddit.com/submit?url=${pageUrl}&title=${pageTitle}`,
    telegram: `https://t.me/share/url?url=${pageUrl}&text=${pageTitle}`,
  };

  Object.entries(shareLinks).forEach(([network, href]) => {
    const link = document.querySelector(`.redes .${network}`);
    if (!link) return;

    link.href = href;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
  });
}

function initRevealAnimations() {
  const selectors = ['.anime-card', '.anime-filter-bar', '.section'];
  const elements = document.querySelectorAll(selectors.join(','));

  elements.forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = `${Math.min(i % 12, 12) * 40}ms`;
  });

  if (!('IntersectionObserver' in window)) {
    elements.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  elements.forEach((el) => observer.observe(el));
}

function initBannerEntrance() {
  const banner = document.querySelector('.banner');
  if (!banner) return;

  requestAnimationFrame(() => {
    banner.classList.add('banner-loaded');
  });
}
