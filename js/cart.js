const CART_STORAGE_KEY = 'freshora_cart';

function getCart() {
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    const data = JSON.parse(raw || '[]');
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  window.dispatchEvent(new Event('freshora-cart-updated'));
}

function cartLineTotal(item) {
  return (Number(item.price) || 0) * (Number(item.qty) || 0);
}

function cartSubtotal() {
  return getCart().reduce((sum, item) => sum + cartLineTotal(item), 0);
}

function addToCart(product, qty = 1) {
  if (!product || !product.id) return;
  const cart = getCart();
  const i = cart.findIndex((x) => x.id === product.id);
  const n = Math.max(1, parseInt(qty, 10) || 1);
  if (i >= 0) cart[i].qty += n;
  else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      qty: n,
    });
  }
  saveCart(cart);
}

function removeFromCart(productId) {
  saveCart(getCart().filter((x) => x.id !== productId));
}

function updateCartQty(productId, qty) {
  const q = Math.max(1, parseInt(qty, 10) || 1);
  const cart = getCart().map((x) => (x.id === productId ? { ...x, qty: q } : x));
  saveCart(cart);
}

function clearCart() {
  localStorage.removeItem(CART_STORAGE_KEY);
  window.dispatchEvent(new Event('freshora-cart-updated'));
}

function cartItemCount() {
  return getCart().reduce((n, x) => n + (Number(x.qty) || 0), 0);
}
