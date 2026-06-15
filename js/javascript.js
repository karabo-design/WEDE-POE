(function () {
  const STORAGE_KEY = "hydraulics_cart_v1";

  function safeParse(json, fallback) {
    try {
      return JSON.parse(json);
    } catch {
      return fallback;
    }
  }

  function loadCart() {
    const raw = localStorage.getItem(STORAGE_KEY);
    const items = safeParse(raw, []);
    return Array.isArray(items) ? items : [];
  }

  function saveCart(items) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }

  function cartKey(item) {
    return `${String(item.id || "")}__${item.size ? String(item.size) : ""}`;
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function escapeAttr(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function formatMoney(n) {
    const num = Number(n || 0);
    if (isNaN(num)) return "R0.00";
    return "R" + num.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  function getCartCount() {
    return loadCart().reduce((sum, it) => sum + (Number(it.qty) || 0), 0);
  }

  function syncCartCount() {
    const el = document.getElementById("cart-count");
    if (el) el.textContent = String(getCartCount());
  }

  function validateItem(item) {
    if (!item.id || !item.name) return false;
    if (isNaN(item.price) || item.price < 0) return false;
    if (item.qty && (isNaN(item.qty) || item.qty < 1)) return false;
    return true;
  }

  function addItem(payload) {
    const items = loadCart();
    const item = {
      id: String(payload.id || ""),
      name: String(payload.name || ""),
      price: Number(payload.price || 0),
      size: payload.size ? String(payload.size) : "",
      image: payload.image ? String(payload.image) : "",
      qty: 1,
    };

    if (!validateItem(item)) return;

    const MAX_QTY = 99;
    const key = cartKey(item);
    const idx = items.findIndex((x) => cartKey(x) === key);

    if (idx >= 0) {
      const newQty = (Number(items[idx].qty) || 0) + 1;
      if (newQty > MAX_QTY) {
        console.warn(`Maximum ${MAX_QTY} items allowed`);
        return;
      }
      items[idx].qty = newQty;
    } else {
      items.push(item);
    }

    saveCart(items);
    syncCartCount();
    renderCart();
  }

  function removeOne({ id, size }) {
    const items = loadCart();
    const key = `${String(id || "")}__${size ? String(size) : ""}`;
    const idx = items.findIndex((x) => cartKey(x) === key);
    if (idx < 0) return;

    if ((Number(items[idx].qty) || 0) > 1) {
      items[idx].qty = Number(items[idx].qty) - 1;
    } else {
      items.splice(idx, 1);
    }

    saveCart(items);
    syncCartCount();
    renderCart();
  }

  function removeItem({ id, size }) {
    const items = loadCart();
    const key = `${String(id || "")}__${size ? String(size) : ""}`;
    const next = items.filter((x) => cartKey(x) !== key);
    saveCart(next);
    syncCartCount();
    renderCart();
  }

  function clearCart() {
    localStorage.removeItem(STORAGE_KEY);
    syncCartCount();
    renderCart();
  }

  function getProductDataFromButton(btn) {
    const ds = btn.dataset || {};
    const price = Number(ds.productPrice);
    return {
      id: ds.productId,
      name: ds.productName,
      price: isNaN(price) ? 0 : price,
      size: ds.productSize || "",
      image: ds.productImage || "",
    };
  }

  let isRendering = false;
  let renderTimeout = null;

  function renderCart() {
    if (isRendering) return;
    
    if (renderTimeout) {
      clearTimeout(renderTimeout);
    }
    
    renderTimeout = setTimeout(() => {
      isRendering = true;
      
      try {
        const itemsWrap = document.getElementById("cart-items");
        const totals = document.getElementById("cart-totals");
        const container = document.getElementById("cart-container");
        const emptyMsg = document.getElementById("cartempty-msg");

        if (!itemsWrap || !totals || !container) {
          isRendering = false;
          return;
        }

        const items = loadCart();

        if (!items || items.length === 0) {
          container.classList.add("is-empty");
          if (emptyMsg) emptyMsg.style.display = "block";
          itemsWrap.innerHTML = "";
          totals.innerHTML = "";
          totals.style.display = "none";
          isRendering = false;
          return;
        }

        container.classList.remove("is-empty");
        if (emptyMsg) emptyMsg.style.display = "none";
        totals.style.display = "block";

        let subtotal = 0;

        itemsWrap.innerHTML = items
          .map((it) => {
            const qty = Number(it.qty) || 0;
            const price = Number(it.price) || 0;
            const line = price * qty;
            subtotal += line;

            const sizeLabel = it.size ? `<span class="cart-item-size">(Size: ${escapeHtml(it.size)})</span>` : "";
            const imgHtml = it.image
              ? `<img class="cart-item-image" src="${escapeAttr(it.image)}" alt="${escapeAttr(it.name)}" loading="lazy" />`
              : `<div class="cart-item-image cart-item-image--placeholder"></div>`;

            return `
              <div class="cart-item" data-cart-line>
                <div class="cart-item-left">
                  ${imgHtml}
                  <div class="cart-item-meta">
                    <div class="cart-item-name">${escapeHtml(it.name)} ${sizeLabel}</div>
                    <div class="cart-item-unit">Unit: ${formatMoney(price)}</div>
                    <div class="cart-item-line">Line: ${formatMoney(line)}</div>
                  </div>
                </div>

                <div class="cart-item-right">
                  <div class="cart-item-qty">
                    <button class="cart-qty-btn" data-cart-minus data-id="${escapeAttr(it.id)}" data-size="${escapeAttr(it.size || "")}" aria-label="Remove one">-</button>
                    <span class="cart-qty-value">${qty}</span>
                    <button
                      class="cart-qty-btn cart-qty-btn--primary"
                      data-cart-addone
                      data-id="${escapeAttr(it.id)}"
                      data-size="${escapeAttr(it.size || "")}" 
                      data-name="${escapeAttr(it.name)}"
                      data-price="${price}"
                      data-image="${escapeAttr(it.image || "")}"
                      aria-label="Add one"
                    >+</button>
                  </div>

                  <button class="cart-remove-btn" data-cart-remove data-id="${escapeAttr(it.id)}" data-size="${escapeAttr(it.size || "")}">Remove</button>
                </div>
              </div>
            `;
          })
          .join("");

        totals.innerHTML = `
          <div class="cart-totals-row">
            <span>Subtotal</span>
            <strong>${formatMoney(subtotal)}</strong>
          </div>
          <div class="cart-totals-actions">
            <button id="cart-clear-btn" class="cart-secondary-btn" aria-label="Clear entire cart">Clear cart</button>
          </div>
        `;
      } catch (error) {
        console.error("Error rendering cart:", error);
      } finally {
        isRendering = false;
        renderTimeout = null;
      }
    }, 10);
  }

  function attachProductHandlers(root = document) {
    const addBtns = root.querySelectorAll("[data-add-to-cart='1']");
    addBtns.forEach((btn) => {
      btn.removeEventListener("click", handleAddClick);
      btn.addEventListener("click", handleAddClick);
    });

    root.removeEventListener("click", handleDocumentClick);
    root.addEventListener("click", handleDocumentClick);
  }

  function handleAddClick(e) {
    e.preventDefault();
    const btn = e.currentTarget;
    const data = getProductDataFromButton(btn);
    if (!data || !data.id || !data.name) {
      console.warn("Missing product data for add to cart");
      return;
    }
    addItem(data);
  }

  function handleDocumentClick(e) {
    const removeBtn = e.target && e.target.closest && e.target.closest("[data-cart-remove]");
    if (removeBtn) {
      e.preventDefault();
      removeItem({
        id: removeBtn.getAttribute("data-id"),
        size: removeBtn.getAttribute("data-size") || "",
      });
      return;
    }

    const minusBtn = e.target && e.target.closest && e.target.closest("[data-cart-minus]");
    if (minusBtn) {
      e.preventDefault();
      removeOne({
        id: minusBtn.getAttribute("data-id"),
        size: minusBtn.getAttribute("data-size") || "",
      });
      return;
    }

    const plusBtn = e.target && e.target.closest && e.target.closest("[data-cart-addone]");
    if (plusBtn) {
      e.preventDefault();
      const price = plusBtn.getAttribute("data-price") ? Number(plusBtn.getAttribute("data-price")) : 0;
      addItem({
        id: plusBtn.getAttribute("data-id"),
        size: plusBtn.getAttribute("data-size") || "",
        name: plusBtn.getAttribute("data-name") || "Product",
        price: isNaN(price) ? 0 : price,
        image: plusBtn.getAttribute("data-image") || "",
      });
      return;
    }

    const clearBtn = e.target && e.target.closest && e.target.closest("#cart-clear-btn");
    if (clearBtn) {
      e.preventDefault();
      clearCart();
    }
  }

  function init() {
    syncCartCount();
    attachProductHandlers(document);
    renderCart();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();