(function () {
  const listEl = document.getElementById('cart-page-list');
  const emptyEl = document.getElementById('cart-empty');
  const summaryEl = document.getElementById('cart-summary');
  const subtotalEl = document.getElementById('cart-subtotal');
  const placeBtn = document.getElementById('place-order-btn');

  function playCheckoutBurstThenRedirect(url) {
    const overlay = document.createElement('div');
    overlay.id = 'checkout-burst-overlay';
    overlay.setAttribute('aria-hidden', 'true');
    const flash = document.createElement('div');
    flash.className = 'checkout-burst-flash';
    const hub = document.createElement('div');
    hub.className = 'checkout-burst-particles';
    const n = 24;
    for (let i = 0; i < n; i++) {
      const ang = (i / n) * Math.PI * 2 + Math.random() * 0.35;
      const dist = 90 + Math.random() * 95;
      const p = document.createElement('span');
      p.className = 'checkout-burst-particle';
      p.style.setProperty('--dx', Math.round(Math.cos(ang) * dist) + 'px');
      p.style.setProperty('--dy', Math.round(Math.sin(ang) * dist) + 'px');
      p.style.animationDelay = Math.random() * 0.06 + 's';
      hub.appendChild(p);
    }
    overlay.appendChild(flash);
    overlay.appendChild(hub);
    document.body.appendChild(overlay);
    overlay.getBoundingClientRect();
    overlay.classList.add('checkout-burst-active');
    document.body.classList.add('checkout-shake');
    window.setTimeout(() => document.body.classList.remove('checkout-shake'), 320);
    window.setTimeout(() => {
      window.location.href = url;
    }, 720);
  }

  function render() {
    if (!listEl) return;
    const cart = getCart();

    if (!cart.length) {
      listEl.innerHTML = '';
      if (emptyEl) emptyEl.hidden = false;
      if (summaryEl) summaryEl.hidden = true;
      return;
    }

    if (emptyEl) emptyEl.hidden = true;
    if (summaryEl) summaryEl.hidden = false;

    listEl.innerHTML = cart
      .map(
        (item) => `
      <div class="cart-row" data-cart-id="${item.id}">
        <img src="${item.image}" alt="" class="cart-row-img">
        <div class="cart-row-info">
          <h3>${item.name}</h3>
          <p class="cart-row-price">₹${item.price}/- each</p>
        </div>
        <div class="cart-row-qty">
          <label>Qty
            <input type="number" min="1" max="99" value="${item.qty}" class="qty-input" aria-label="Quantity for ${item.name}">
          </label>
        </div>
        <div class="cart-row-line">₹${(Number(item.price) * Number(item.qty)).toFixed(0)}/-</div>
        <button type="button" class="cart-row-remove" aria-label="Remove item"><i class="fas fa-trash"></i></button>
      </div>`
      )
      .join('');

    if (subtotalEl) subtotalEl.textContent = `₹${cartSubtotal()}/-`;

    listEl.querySelectorAll('.qty-input').forEach((input) => {
      input.addEventListener('change', () => {
        const row = input.closest('.cart-row');
        const id = row?.getAttribute('data-cart-id');
        if (id) updateCartQty(id, input.value);
        render();
      });
    });

    listEl.querySelectorAll('.cart-row-remove').forEach((btn) => {
      btn.addEventListener('click', () => {
        const row = btn.closest('.cart-row');
        const id = row?.getAttribute('data-cart-id');
        if (id) removeFromCart(id);
        render();
      });
    });
  }

  if (placeBtn) {
    let checkoutBusy = false;
    placeBtn.addEventListener('click', () => {
      if (checkoutBusy || !getCart().length) return;
      checkoutBusy = true;
      placeBtn.disabled = true;
      placeBtn.style.pointerEvents = 'none';
      playCheckoutBurstThenRedirect('error.html');
    });
  }

  function boot() {
    render();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
  window.addEventListener('freshora-cart-updated', render);
})();
