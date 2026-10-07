(function () {
  const CFG = window.SHOP_CONFIG;
  const PRODUCTS = window.PRODUCTS;
  const $ = id => document.getElementById(id);
  const fmt = n => n.toLocaleString("en-US") + " " + CFG.currency;

  // ---------- صور تلقائية ----------
  function svgUri(svg) { return "url(\"data:image/svg+xml;utf8," + encodeURIComponent(svg) + "\")"; }
  function cupImage(color) {
    return svgUri(
      `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'>
        <defs><linearGradient id='b' x1='0' y1='0' x2='0' y2='1'><stop offset='0' stop-color='#f3f4f6'/><stop offset='1' stop-color='#d1d5db'/></linearGradient></defs>
        <rect width='200' height='200' fill='url(#b)'/>
        <rect x='96' y='10' width='8' height='70' rx='4' fill='#fff' opacity='.9'/>
        <path d='M62 60 Q100 20 138 60 Z' fill='#fff' opacity='.7'/>
        <path d='M58 62 L142 62 L132 184 Q100 192 68 184 Z' fill='${color}'/>
        <path d='M58 62 L142 62 L139 90 L61 90 Z' fill='#fff' opacity='.35'/>
        <circle cx='84' cy='168' r='5' fill='#2b1b17'/><circle cx='100' cy='172' r='5' fill='#2b1b17'/><circle cx='116' cy='168' r='5' fill='#2b1b17'/>
      </svg>`);
  }
  const productBg = p => p.image ? `url("${p.image}")` : cupImage(p.color);

  // ---------- البانر ----------
  function renderHero() {
    const hero = $("hero");
    const slides = window.HERO_SLIDES || [];
    hero.innerHTML = "";
    slides.forEach((s, i) => {
      const d = document.createElement("div");
      d.className = "slide" + (i === 0 ? " active" : "");
      d.style.backgroundImage = s.image
        ? `url("${s.image}")`
        : `linear-gradient(135deg, ${(s.colors||["#ec4899","#8b5cf6"]).join(",")})`;
      d.innerHTML = `<h1>${s.title || ""}</h1><p>${s.subtitle || ""}</p>`;
      hero.appendChild(d);
    });
    if (slides.length > 1) {
      const dots = document.createElement("div");
      dots.className = "dots";
      slides.forEach((_, i) => { const x = document.createElement("i"); if (!i) x.className = "on"; dots.appendChild(x); });
      hero.appendChild(dots);
      let cur = 0;
      setInterval(() => {
        const els = hero.querySelectorAll(".slide"), ds = dots.children;
        els[cur].classList.remove("active"); ds[cur].classList.remove("on");
        cur = (cur + 1) % els.length;
        els[cur].classList.add("active"); ds[cur].classList.add("on");
      }, window.HERO_INTERVAL || 4000);
    }
  }

  // ---------- السلة ----------
  let cart = [];
  try { cart = JSON.parse(localStorage.getItem("cart") || "[]"); } catch (e) { cart = []; }
  const save = () => { try { localStorage.setItem("cart", JSON.stringify(cart)); } catch (e) {} };

  function toast(msg) {
    const t = $("toast"); t.textContent = msg; t.classList.add("show");
    clearTimeout(toast.t); toast.t = setTimeout(() => t.classList.remove("show"), 1500);
  }

  function addToCart(id) {
    const found = cart.find(i => i.id === id);
    if (found) found.qty++; else cart.push({ id, qty: 1 });
    save(); renderCart();
    toast("تمت الإضافة إلى السلة ✓");
  }
  function changeQty(id, d) {
    const it = cart.find(i => i.id === id); if (!it) return;
    it.qty += d;
    if (it.qty <= 0) cart = cart.filter(i => i.id !== id);
    save(); renderCart();
  }

  function renderCart() {
    const box = $("cartItems");
    let total = 0, count = 0;
    box.innerHTML = "";
    if (!cart.length) box.innerHTML = '<p style="text-align:center;color:#888;padding:30px 0">السلة فارغة</p>';
    cart.forEach(it => {
      const p = PRODUCTS.find(x => x.id === it.id); if (!p) return;
      total += p.price * it.qty; count += it.qty;
      const row = document.createElement("div");
      row.className = "item";
      row.innerHTML = `
        <div class="thumb" style='background-image:${productBg(p).replace(/'/g, "%27")}'></div>
        <div class="meta"><b>${p.name}</b><span>${fmt(p.price)}</span></div>
        <div class="qty">
          <button data-d="1">+</button><span>${it.qty}</span><button data-d="-1">−</button>
        </div>`;
      row.querySelectorAll("button").forEach(b => b.onclick = () => changeQty(p.id, +b.dataset.d));
      box.appendChild(row);
    });
    $("cartTotal").textContent = fmt(total);
    $("cartCount").textContent = count;
    $("waBtn").disabled = !cart.length;
  }

  const openCart = () => { $("drawer").classList.add("show"); $("overlay").classList.add("show"); };
  const closeCart = () => { $("drawer").classList.remove("show"); $("overlay").classList.remove("show"); };

  // ---------- الشراء عبر واتس اب ----------
  function checkout() {
    if (!cart.length) return;
    let total = 0;
    const lines = cart.map(it => {
      const p = PRODUCTS.find(x => x.id === it.id);
      total += p.price * it.qty;
      return `• ${p.name} × ${it.qty} = ${fmt(p.price * it.qty)}`;
    });
    const msg = "مرحباً، أريد طلب:\n" + lines.join("\n") + "\nالمجموع: " + fmt(total);

    if (window.FirebaseAdapter) {
      window.FirebaseAdapter.saveOrder({
        items: cart.map(it => {
          const p = PRODUCTS.find(x => x.id === it.id);
          return { id: p.id, name: p.name, price: p.price, qty: it.qty };
        }),
        total
      });
    }
    window.location.href = "https://wa.me/" + CFG.whatsapp + "?text=" + encodeURIComponent(msg);
  }

  // ---------- المنتجات ----------
  function renderProducts(filter) {
    const grid = $("products");
    const q = (filter || "").trim();
    const list = PRODUCTS.filter(p => p.name.includes(q));
    grid.innerHTML = "";
    if (!list.length) { grid.innerHTML = '<div class="empty">لا توجد نتائج</div>'; return; }
    list.forEach(p => {
      const c = document.createElement("div");
      c.className = "card";
      c.innerHTML = `
        <div class="img" style='background-image:${productBg(p).replace(/'/g, "%27")}'></div>
        <div class="info">
          <div class="name">${p.name}</div>
          <div class="price">${fmt(p.price)}</div>
          <button class="buy">شراء</button>
        </div>`;
      c.querySelector(".buy").onclick = () => addToCart(p.id);
      grid.appendChild(c);
    });
  }

  // ---------- تشغيل ----------
  $("storeName").textContent = CFG.storeName;
  document.title = CFG.storeName;
  $("cartBtn").onclick = openCart;
  $("closeCart").onclick = closeCart;
  $("overlay").onclick = closeCart;
  $("waBtn").onclick = checkout;
  $("clearBtn").onclick = () => { cart = []; save(); renderCart(); };
  $("search").oninput = e => renderProducts(e.target.value);

  renderHero(); renderProducts(); renderCart();
})();
