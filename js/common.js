(function () {
  const THEME_KEY = 'freshora-theme';

  function syncThemeToggleUI() {
    const btn = document.getElementById('theme-toggle');
    if (!btn) return btn;
    const dark = document.body.classList.contains('dark-mode');
    btn.setAttribute('aria-pressed', dark ? 'true' : 'false');
    btn.setAttribute('title', dark ? 'Light mode' : 'Dark mode');
    btn.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
    const icon = btn.querySelector('i');
    if (icon) icon.className = dark ? 'fas fa-sun' : 'fas fa-moon';
    return btn;
  }

  function initThemeToggle() {
    const btn = document.getElementById('theme-toggle');
    if (!btn) return;
    btn.addEventListener('click', () => {
      const nextDark = !document.body.classList.contains('dark-mode');
      document.body.classList.toggle('dark-mode', nextDark);
      try {
        localStorage.setItem(THEME_KEY, nextDark ? 'dark' : 'light');
      } catch (_) {}
      syncThemeToggleUI();
    });
    syncThemeToggleUI();
  }

  const searchForm = document.querySelector('.search-form');
  const shoppingCart = document.querySelector('.shopping-cart');
  const account = document.querySelector('.login-form');
  const navbar = document.querySelector('.navbar');
  const searchBtn = document.querySelector('#search-btn');
  const cartBtn = document.querySelector('#cart-btn');
  const loginBtn = document.querySelector('#login-btn');
  const menuBtn = document.querySelector('#menu-btn');

  let backdrop = document.getElementById('nav-backdrop');
  if (!backdrop) {
    backdrop = document.createElement('div');
    backdrop.id = 'nav-backdrop';
    backdrop.className = 'nav-backdrop';
    backdrop.setAttribute('aria-hidden', 'true');
    document.body.insertBefore(backdrop, document.body.firstChild);
  }

  function setNavDrawerOpen(open) {
    if (!navbar) return;
    navbar.classList.toggle('active', open);
    backdrop.classList.toggle('is-open', open);
    backdrop.setAttribute('aria-hidden', open ? 'false' : 'true');
    document.body.classList.toggle('nav-drawer-open', open);
    if (menuBtn) menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
  }

  backdrop.addEventListener('click', () => setNavDrawerOpen(false));

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') setNavDrawerOpen(false);
  });

  if (searchBtn && searchForm) {
    searchBtn.onclick = () => {
      searchForm.classList.toggle('active');
      shoppingCart?.classList.remove('active');
      account?.classList.remove('active');
      setNavDrawerOpen(false);
    };
  }
  if (cartBtn && shoppingCart) {
    cartBtn.onclick = () => {
      shoppingCart.classList.toggle('active');
      searchForm?.classList.remove('active');
      account?.classList.remove('active');
      setNavDrawerOpen(false);
      renderCartPreview();
    };
  }
  if (loginBtn && account) {
    loginBtn.onclick = () => {
      account.classList.toggle('active');
      searchForm?.classList.remove('active');
      shoppingCart?.classList.remove('active');
      setNavDrawerOpen(false);
    };
  }
  if (menuBtn && navbar) {
    menuBtn.setAttribute('aria-expanded', 'false');
    menuBtn.setAttribute('aria-controls', navbar.id || 'site-nav');
    menuBtn.setAttribute('role', 'button');
    menuBtn.setAttribute('tabindex', '0');
    menuBtn.onclick = () => {
      const open = !navbar.classList.contains('active');
      setNavDrawerOpen(open);
      searchForm?.classList.remove('active');
      shoppingCart?.classList.remove('active');
      account?.classList.remove('active');
    };
    menuBtn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        menuBtn.click();
      }
    });
  }

  document.querySelectorAll('.header .navbar a').forEach((link) => {
    link.addEventListener('click', () => setNavDrawerOpen(false));
  });

  window.onscroll = () => {
    searchForm?.classList.remove('active');
    shoppingCart?.classList.remove('active');
    account?.classList.remove('active');
    setNavDrawerOpen(false);
  };

  function renderCartPreview() {
    const wrap = document.getElementById('cart-preview-items');
    const totalEl = document.getElementById('cart-preview-total');
    if (!wrap || !totalEl) return;

    const cart = typeof getCart === 'function' ? getCart() : [];
    if (!cart.length) {
      wrap.innerHTML =
        '<p class="cart-preview-empty">Cart is empty. Add items from <a href="products.html">Products</a>.</p>';
      totalEl.textContent = 'Total: ₹0';
      return;
    }

    wrap.innerHTML = cart
      .map(
        (item) => `
      <div class="box" data-cart-id="${item.id}">
        <i class="fas fa-trash cart-preview-remove" role="button" tabindex="0" aria-label="Remove"></i>
        <img src="${item.image}" alt="${item.name}">
        <div class="content">
          <h3>${item.name}</h3>
          <span class="price">₹${item.price}/-</span>
          <span class="quantity">Qty: ${item.qty}</span>
        </div>
      </div>`
      )
      .join('');

    totalEl.textContent = `Total: ₹${cartSubtotal()}/-`;

    wrap.querySelectorAll('.cart-preview-remove').forEach((btn) => {
      btn.onclick = (e) => {
        const box = e.target.closest('.box');
        const id = box?.getAttribute('data-cart-id');
        if (id) removeFromCart(id);
        renderCartPreview();
        updateCartBadge();
      };
    });
  }

  function updateCartBadge() {
    const badge = document.getElementById('cart-count-badge');
    if (!badge || typeof cartItemCount !== 'function') return;
    const n = cartItemCount();
    badge.textContent = n > 99 ? '99+' : String(n);
    badge.hidden = n === 0;
  }

  window.renderCartPreview = renderCartPreview;
  window.updateCartBadge = updateCartBadge;

  function boot() {
    if (navbar && !document.getElementById('nav-drawer-close')) {
      const closeBtn = document.createElement('button');
      closeBtn.type = 'button';
      closeBtn.id = 'nav-drawer-close';
      closeBtn.className = 'nav-drawer-close';
      closeBtn.setAttribute('aria-label', 'Close menu');
      closeBtn.innerHTML = '&times;';
      closeBtn.addEventListener('click', () => setNavDrawerOpen(false));
      navbar.insertBefore(closeBtn, navbar.firstChild);
    }
    if (menuBtn) menuBtn.setAttribute('aria-label', 'Open menu');
    updateCartBadge();
    renderCartPreview();
    initThemeToggle();
    initStaticScrollReveal();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();

  window.addEventListener('freshora-cart-updated', () => {
    updateCartBadge();
    if (shoppingCart?.classList.contains('active')) renderCartPreview();
  });

  const searchBox = document.getElementById('search-box');
  if (searchBox) {
    searchBox.addEventListener('input', () => {
      window.dispatchEvent(
        new CustomEvent('freshora-search', { detail: { q: searchBox.value.trim().toLowerCase() } })
      );
    });
  }

  const prefersRevealReduce =
    typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches;
  /** @type {IntersectionObserver | null} */
  const freshoraRevealIO = prefersRevealReduce
    ? null
    : new IntersectionObserver(
        (entries, obs) => {
          entries.forEach((e) => {
            if (!e.isIntersecting) return;
            e.target.classList.add('is-visible');
            obs.unobserve(e.target);
          });
        },
        { threshold: 0.08, rootMargin: '0px 0px -32px 0px' }
      );

  /** @param {Element} el */
  function freshoraRevealObserve(el) {
    if (!el) return;
    if (!freshoraRevealIO) {
      el.classList.add('scroll-reveal', 'is-visible');
      return;
    }
    el.classList.add('scroll-reveal');
    freshoraRevealIO.observe(el);
  }

  window.freshoraRevealObserve = freshoraRevealObserve;

  function initStaticScrollReveal() {
    document.querySelectorAll('section:not(.home):not(.footer):not(.stats-cards-section)').forEach(freshoraRevealObserve);
    document.querySelectorAll('.category-card').forEach(freshoraRevealObserve);
  }

  window.initStaticScrollReveal = initStaticScrollReveal;
})();
