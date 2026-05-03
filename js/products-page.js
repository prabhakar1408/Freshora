(function () {
  const grid = document.getElementById('product-grid');
  const chips = document.querySelectorAll('.category-chip');
  const searchInput = document.getElementById('searchInput');
  const emptyMsg = document.getElementById('product-search-empty');
  if (!grid || typeof PRODUCT_CATALOG === 'undefined') return;

  const headerSearchBox = document.getElementById('search-box');

  let activeCat = 'all';
  let searchQuery = '';

  function getQueryCat() {
    const p = new URLSearchParams(window.location.search).get('cat');
    if (!p) return null;
    const c = p.toLowerCase();
    const allowed = ['fruits', 'vegetables', 'dairy', 'juices'];
    return allowed.includes(c) ? c : null;
  }

  function normalizedQuery() {
    return searchQuery.trim().toLowerCase();
  }

  function filtered() {
    let list = PRODUCT_CATALOG;
    if (activeCat !== 'all') list = list.filter((p) => p.category === activeCat);
    const q = normalizedQuery();
    if (q) list = list.filter((p) => p.name.toLowerCase().includes(q));
    return list;
  }

  function render() {
    const list = filtered();

    if (emptyMsg) {
      const visible = list.length === 0;
      emptyMsg.hidden = !visible;
      emptyMsg.textContent = 'No products found';
    }

    if (!list.length) {
      grid.innerHTML = '';
      return;
    }

    grid.innerHTML = list
      .map(
        (p) => `
      <article class="product-card" data-category="${p.category}">
        <div class="product-card-img-wrap">
          <img src="${p.image}" alt="${p.name}" loading="lazy">
        </div>
        <div class="product-card-body">
          <span class="product-card-cat">${p.category}</span>
          <h3 class="product-name">${p.name}</h3>
          <p class="product-card-price">₹${p.price}/-</p>
          <button type="button" class="add-to-cart-btn" data-product-id="${p.id}">Add to cart</button>
        </div>
      </article>`
      )
      .join('');

    grid.querySelectorAll('.add-to-cart-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-product-id');
        const product = getProductById(id);
        if (product) {
          addToCart(product, 1);
          btn.textContent = 'Added ✓';
          setTimeout(() => {
            btn.textContent = 'Add to cart';
          }, 1200);
        }
      });
    });

    if (typeof window.freshoraRevealObserve === 'function') {
      grid.querySelectorAll('.product-card').forEach((card) => window.freshoraRevealObserve(card));
    }
  }

  chips.forEach((chip) => {
    chip.addEventListener('click', () => {
      chips.forEach((c) => c.classList.remove('active'));
      chip.classList.add('active');
      activeCat = chip.getAttribute('data-cat') || 'all';
      render();
    });
  });

  const qCat = getQueryCat();
  if (qCat) {
    activeCat = qCat;
    chips.forEach((c) => {
      c.classList.toggle('active', (c.getAttribute('data-cat') || '') === qCat);
    });
  }

  if (searchInput) {
    searchInput.addEventListener('input', () => {
      searchQuery = searchInput.value;
      if (headerSearchBox) headerSearchBox.value = searchQuery;
      render();
    });
  }

  window.addEventListener('freshora-search', (e) => {
    const q = e.detail?.q ?? '';
    searchQuery = String(q);
    if (searchInput) searchInput.value = searchQuery;
    render();
  });

  function boot() {
    render();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
