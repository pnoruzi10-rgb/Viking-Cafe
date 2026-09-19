/* =========================================================
   وایکینگ کافی — Application Script
   ========================================================= */
(function(){
  "use strict";

  /* ---------- Utility ---------- */
  const toman = (n) => n.toLocaleString('fa-IR') + ' تومان';
  const $ = (sel, ctx=document) => ctx.querySelector(sel);
  const $$ = (sel, ctx=document) => Array.from(ctx.querySelectorAll(sel));

  /* ---------- Card gradient palette (rotated by index, stays on-brand) ---------- */
  const GRADIENTS = [
    ['#e9dcc5','#c9a877'], ['#d9c4a3','#a97b4f'], ['#f0e3cd','#b8863f'],
    ['#e3cdae','#6b3f26'], ['#f5ede0','#8a5a36'], ['#dcc39a','#4a2f1f'],
    ['#ecd9b8','#96683c'], ['#e0c7a1','#5c3a22']
  ];

  /* ---------- Icon builders (inline SVG, brand-consistent illustration) ---------- */
  function svgWrap(bodyMarkup, g1, g2, uid){
    return `<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" role="img">
      <defs><linearGradient id="g${uid}" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="${g1}"/><stop offset="100%" stop-color="${g2}"/>
      </linearGradient></defs>
      <rect width="400" height="300" fill="url(#g${uid})"/>
      ${bodyMarkup}
    </svg>`;
  }

  function iconCake(uid){
    return `<g transform="translate(90,70)">
      <ellipse cx="110" cy="168" rx="118" ry="16" fill="#2a1810" opacity=".18"/>
      <path d="M10 90 L210 90 L195 165 Q192 178 178 178 L42 178 Q28 178 25 165 Z" fill="#fffdf9" opacity=".92"/>
      <path d="M18 96 L202 96 L190 150 L30 150 Z" fill="#4a2f1f" opacity=".85"/>
      <rect x="10" y="80" width="200" height="16" rx="8" fill="#fffdf9"/>
      <circle cx="60" cy="60" r="6" fill="#fffdf9"/><circle cx="110" cy="52" r="6" fill="#fffdf9"/><circle cx="160" cy="60" r="6" fill="#fffdf9"/>
      <rect x="57" y="30" width="6" height="26" rx="3" fill="#b8863f"/>
      <rect x="107" y="22" width="6" height="26" rx="3" fill="#b8863f"/>
      <rect x="157" y="30" width="6" height="26" rx="3" fill="#b8863f"/>
    </g>`;
  }
  function iconCookie(uid){
    return `<g transform="translate(120,60)">
      <circle cx="80" cy="90" r="86" fill="#fffdf9" opacity=".18"/>
      <circle cx="80" cy="90" r="78" fill="#e3cdae"/>
      <circle cx="52" cy="65" r="9" fill="#2a1810" opacity=".55"/>
      <circle cx="105" cy="55" r="7" fill="#2a1810" opacity=".55"/>
      <circle cx="118" cy="100" r="8" fill="#2a1810" opacity=".55"/>
      <circle cx="60" cy="115" r="6" fill="#2a1810" opacity=".55"/>
      <circle cx="90" cy="125" r="9" fill="#2a1810" opacity=".55"/>
      <circle cx="40" cy="95" r="5" fill="#2a1810" opacity=".45"/>
    </g>`;
  }
  function iconHot(uid){
    return `<g transform="translate(120,55)">
      <g stroke="#fffdf9" stroke-width="5" fill="none" stroke-linecap="round" opacity=".55">
        <path d="M45 10 C 35 -10, 55 -22, 45 -40"/>
        <path d="M80 10 C 70 -10, 90 -22, 80 -40"/>
      </g>
      <path d="M10 45 L130 45 L120 145 Q117 165 97 165 L43 165 Q23 165 20 145 Z" fill="#fffdf9" opacity=".92"/>
      <path d="M18 52 L122 52 L114 138 L26 138 Z" fill="#3d2415"/>
      <path d="M128 62 Q160 62 160 92 Q160 120 128 120" fill="none" stroke="#fffdf9" stroke-width="12" stroke-linecap="round" opacity=".92"/>
    </g>`;
  }
  function iconCold(uid){
    return `<g transform="translate(140,45)">
      <path d="M8 10 L112 10 L100 175 Q98 185 88 185 L32 185 Q22 185 20 175 Z" fill="#fffdf9" opacity=".3" stroke="#fffdf9" stroke-width="4"/>
      <path d="M16 20 L104 20 L94 165 L26 165 Z" fill="#6b3f26" opacity=".8"/>
      <circle cx="45" cy="55" r="11" fill="#fffdf9" opacity=".85"/>
      <circle cx="75" cy="80" r="9" fill="#fffdf9" opacity=".7"/>
      <circle cx="50" cy="105" r="10" fill="#fffdf9" opacity=".75"/>
      <rect x="52" y="-18" width="8" height="34" rx="4" fill="#fffdf9" opacity=".85"/>
    </g>`;
  }
  function iconHerbal(uid){
    return `<g transform="translate(120,70)">
      <path d="M10 40 L130 40 L120 130 Q117 148 99 148 L41 148 Q23 148 20 130 Z" fill="#fffdf9" opacity=".92"/>
      <path d="M18 47 L122 47 L113 122 L27 122 Z" fill="#8a5a36" opacity=".85"/>
      <path d="M128 55 Q155 55 155 80 Q155 103 128 103" fill="none" stroke="#fffdf9" stroke-width="10" stroke-linecap="round" opacity=".9"/>
      <path d="M60 -10 C 40 5, 40 30, 62 40 C 60 20, 68 5, 60 -10 Z" fill="#7c9473"/>
      <path d="M85 -18 C 65 -5, 68 22, 90 30 C 85 10, 95 -5, 85 -18 Z" fill="#93ac86"/>
    </g>`;
  }
  const ICONS = { cake: iconCake, cookie: iconCookie, hot: iconHot, cold: iconCold, herbal: iconHerbal };

  function productSVG(item, size='card'){
    const [g1,g2] = GRADIENTS[item.uid % GRADIENTS.length];
    const body = ICONS[item.cat](item.uid);
    return svgWrap(body, g1, g2, item.uid + '-' + size);
  }

  /* ---------- Ingredient phrase builder ---------- */
  const ING_BASE = {
    cake: 'آرد گندم، تخم‌مرغ محلی، کره تازه، شکر، خامه، ',
    cookie: 'آرد گندم، کره، شکر قهوه‌ای، تخم‌مرغ، ',
    hot: 'دانه قهوه عربیکا تازه‌آسیاب، آب، ',
    cold: 'دانه قهوه عربیکا، یخ، شربت طبیعی، ',
    herbal: 'گیاهان خشک ارگانیک، آب جوش، ',
  };
  const ING_EXTRA = {
    cake: ['وانیل ماداگاسکار','گردوی خرد شده','عسل طبیعی','پوست پرتقال معطر','زعفران اعلا','دارچین سیلان','شکلات تلخ ۷۰٪','نارگیل رنده'],
    cookie: ['تکه‌های شکلات بلژیکی','جو دوسر ارگانیک','بادام خام','دارچین سیلان','فندق برشته','کشمش آفتابی'],
    hot: ['شیر تازه پرچرب','فوم مخملی','عسل کوهستان','دارچین سیلان','پودر کاکائوی خالص','شربت کارامل خانگی','پودر زعفران اعلا'],
    cold: ['شیر یخ‌زده','شربت وانیل فرانسوی','خامه فرم‌گرفته','پودر کاکائوی خالص','نارگیل تازه'],
    herbal: ['عسل طبیعی','دارچین سیلان','لیمو تازه','هل سبز','گل محمدی خشک'],
  };
  function buildIngredients(cat, idx){
    const extras = ING_EXTRA[cat];
    const picks = [extras[idx % extras.length], extras[(idx+3) % extras.length]];
    return ING_BASE[cat] + picks.join('، ') + '.';
  }

  /* ---------- Product Data ---------- */
  const CATS = {
    cake: { title:'کیک', desc:'پخت تازه‌ی روزانه با دستور شمالی و طعم اصیل', price:[95000,145000],
      items:['کیک شکلاتی وایکینگ','چیزکیک نیویورکی','کیک هویج و گردو','کیک وانیلی کرم موزی','کیک ردولوت','کیک عسل و دارچین','تیرامیسو کلاسیک','کیک لیمو و ریحان','کیک موکا اسپرسو','کیک انبه و نارگیل','کیک شاه‌توت جنگلی','کیک پرتقال و زعفران','کیک کارامل نمکی','کیک فندق و شکلات سفید','کیک ماست و لیمو','کیک عسل ایزدهای شمال']},
    cookie: { title:'کوکی', desc:'کوکی‌های دستی، ترد و تازه از فر', price:[45000,65000],
      items:['کوکی شکلاتی کلاسیک','کوکی جو دوسر و کشمش','کوکی بادام و عسل','کوکی دوبل چاکلت','کوکی کره بادام‌زمینی','کوکی دارچینی','کوکی نارگیلی','کوکی زنجبیلی وایکینگ','کوکی فندق و کارامل','کوکی نمکی شکلاتی','کوکی لیمویی','کوکی پسته','کوکی ردولوت','کوکی موزی گردویی','کوکی شاه‌توت سفید','کوکی عسل و دارچین اسکاندیناوی']},
    hot: { title:'نوشیدنی گرم', desc:'قهوه‌ی تازه‌دم با دانه‌های برشته‌ی مخصوص', price:[65000,110000],
      items:['اسپرسو','آمریکانو','کاپوچینو','لاته کلاسیک','لاته وانیل','لاته کارامل','موکا شکلاتی','فلت وایت','ماکیاتو','کورتادو','لاته عسل و دارچین وایکینگ','هات چاکلت','شیر کاکائو','قهوه ترک','قهوه فرانسه','لاته نارگیل','کاپوچینو زعفرانی','لاته پسته']},
    cold: { title:'نوشیدنی سرد', desc:'خنک، طراوت‌بخش و پر از انرژی', price:[85000,130000],
      items:['آیس آمریکانو','آیس لاته','آیس کارامل ماکیاتو','آیس موکا','فراپه شکلاتی','فراپه وانیل','کلد برو کلاسیک','کلد برو با شیر نارگیل','اسموتی توت‌فرنگی','اسموتی موز و شکلات','آیس شکلات سفید','آیس لاته نارگیل','آیس لاته پسته','لیموناد نعنا وایکینگ','آیس چای هل','میلک‌شیک وانیل']},
    herbal: { title:'دمنوش', desc:'ترکیب گیاهان طبیعی برای آرامش و طراوت', price:[55000,75000],
      items:['دمنوش بابونه','دمنوش نعنا','دمنوش زنجبیل و لیمو','دمنوش هل و دارچین','دمنوش گل گاوزبان','دمنوش رزماری','دمنوش آویشن و عسل','دمنوش توت جنگلی','دمنوش گل محمدی','دمنوش زعفران وایکینگ','دمنوش نعنا و لیمو','دمنوش رویبوس','دمنوش سبز یاسمن','دمنوش ترش هیبیسکوس','دمنوش عسل و دارچین شمالی']},
  };
  const DESC_TEMPLATES = {
    cake: (n)=>`برشی نرم و لطیف از ${n}، پخت تازه‌ی امروز کافه.`,
    cookie: (n)=>`${n}، ترد در لبه و نرم در دل، همراه یک فنجان قهوه عالی است.`,
    hot: (n)=>`${n} با دانه‌های تازه‌آسیاب، گرم و معطر.`,
    cold: (n)=>`${n}، خنک و انرژی‌بخش برای روزهای شلوغ.`,
    herbal: (n)=>`${n}، دمی آرامش‌بخش از گیاهان منتخب.`,
  };

  let uidCounter = 1;
  const PRODUCTS = [];
  Object.keys(CATS).forEach(catKey=>{
    const cat = CATS[catKey];
    const [minP,maxP] = cat.price;
    cat.items.forEach((name, idx)=>{
      const price = Math.round((minP + (maxP-minP) * (idx/(cat.items.length-1))) / 1000) * 1000;
      PRODUCTS.push({
        id: catKey + '-' + idx,
        uid: uidCounter++,
        cat: catKey,
        name,
        desc: DESC_TEMPLATES[catKey](name),
        price,
        ingredients: buildIngredients(catKey, idx),
      });
    });
  });

  /* ---------- State ---------- */
  let currentCat = 'cake';
  const cart = {}; // id -> {product, qty}

  /* ---------- Rendering: product grid ---------- */
  const grid = $('#productsGrid');
  const shopCatTitle = $('#shopCatTitle');
  const shopCatDesc = $('#shopCatDesc');

  function renderGrid(catKey){
    const cat = CATS[catKey];
    shopCatTitle.textContent = cat.title;
    shopCatDesc.textContent = cat.desc;
    const items = PRODUCTS.filter(p => p.cat === catKey);
    grid.innerHTML = items.map(p => `
      <article class="product-card" data-id="${p.id}">
        <div class="card-media">${productSVG(p)}</div>
        <div class="card-body">
          <h3>${p.name}</h3>
          <p class="card-desc">${p.desc}</p>
          <div class="card-price">${toman(p.price)}</div>
          <div class="card-actions">
            <button class="btn-view" data-action="view" data-id="${p.id}">مشاهده جزئیات</button>
            <button class="btn-add" data-action="add" data-id="${p.id}">افزودن به سبد</button>
          </div>
        </div>
      </article>
    `).join('');
  }

  grid.addEventListener('click', (e)=>{
    const actionBtn = e.target.closest('[data-action]');
    if(actionBtn){
      const id = actionBtn.dataset.id;
      if(actionBtn.dataset.action === 'add'){ addToCart(id); }
      else if(actionBtn.dataset.action === 'view'){ openDetail(id); }
      return;
    }
    const card = e.target.closest('.product-card');
    if(card){ openDetail(card.dataset.id); }
  });

  /* ---------- Category switching ---------- */
  $$('.cat-btn').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      $$('.cat-btn').forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      currentCat = btn.dataset.cat;
      grid.style.opacity = 0;
      setTimeout(()=>{ renderGrid(currentCat); grid.style.opacity = 1; }, 160);
      showPage('shopPage');
      window.scrollTo({top:0, behavior:'smooth'});
    });
  });
  grid.style.transition = 'opacity .25s ease';

  /* ---------- Page navigation ---------- */
  function showPage(pageId){
    $$('.page').forEach(p=>p.classList.remove('active'));
    $('#' + pageId).classList.add('active');
    $$('.nav-btn').forEach(b=>b.classList.toggle('active', b.dataset.page === pageId));
    window.scrollTo({top:0, behavior:'smooth'});
  }
  $('#navShop').addEventListener('click', ()=> showPage('shopPage'));
  $('#navLocation').addEventListener('click', ()=> showPage('locationPage'));
  $('#navLogin').addEventListener('click', ()=> showPage('loginPage'));
  $('#backFromDetail').addEventListener('click', ()=> showPage('shopPage'));

  /* ---------- Product detail ---------- */
  const detailWrap = $('#detailWrap');
  function openDetail(id){
    const p = PRODUCTS.find(x=>x.id === id);
    if(!p) return;
    detailWrap.innerHTML = `
      <div class="detail-media">${productSVG(p,'detail')}</div>
      <div class="detail-info">
        <h2>${p.name}</h2>
        <div class="detail-price">${toman(p.price)}</div>
        <p class="detail-desc">${p.desc} این مورد یکی از محبوب‌ترین انتخاب‌های مشتریان وایکینگ کافی است و با استانداردهای بالای کیفیت آماده می‌شود.</p>
        <div class="detail-ingredients">
          <h4>مواد تشکیل‌دهنده</h4>
          <p>${p.ingredients}</p>
        </div>
        <button class="detail-add" data-id="${p.id}">
          <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 6h2l1.6 9.6a2 2 0 0 0 2 1.7h7.4a2 2 0 0 0 2-1.6L20.5 9H7"/></svg>
          افزودن به سبد خرید
        </button>
      </div>
    `;
    $('.detail-add', detailWrap).addEventListener('click', ()=> addToCart(p.id));
    showPage('detailPage');
  }

  /* ---------- Cart ---------- */
  const cartSidebar = $('#cartSidebar');
  const cartOverlay = $('#cartOverlay');
  const cartItemsEl = $('#cartItems');
  const cartEmptyMsg = $('#cartEmptyMsg');
  const cartTotalEl = $('#cartTotal');
  const cartCountEl = $('#cartCount');

  function addToCart(id){
    const p = PRODUCTS.find(x=>x.id === id);
    if(!p) return;
    if(!cart[id]) cart[id] = { product: p, qty: 0 };
    cart[id].qty += 1;
    renderCart();
    openCart();
    showToast(`${p.name} به سبد اضافه شد`);
  }
  function changeQty(id, delta){
    if(!cart[id]) return;
    cart[id].qty += delta;
    if(cart[id].qty <= 0) delete cart[id];
    renderCart();
  }
  function removeItem(id){ delete cart[id]; renderCart(); }

  function renderCart(){
    const ids = Object.keys(cart);
    let total = 0;
    let count = 0;
    if(ids.length === 0){
      cartItemsEl.innerHTML = '<p class="cart-empty">سبد خرید شما خالی است</p>';
    } else {
      cartItemsEl.innerHTML = ids.map(id=>{
        const { product, qty } = cart[id];
        total += product.price * qty;
        count += qty;
        return `
          <div class="cart-item" data-id="${id}">
            <div class="cart-item-media">${productSVG(product)}</div>
            <div class="cart-item-info">
              <h4>${product.name}</h4>
              <div class="cart-item-price">${toman(product.price)}</div>
              <div class="qty-control">
                <button data-action="dec" data-id="${id}">−</button>
                <span>${qty}</span>
                <button data-action="inc" data-id="${id}">+</button>
              </div>
            </div>
            <button class="cart-item-remove" data-action="remove" data-id="${id}" aria-label="حذف">×</button>
          </div>
        `;
      }).join('');
    }
    cartTotalEl.textContent = toman(total);
    cartCountEl.textContent = count;
  }

  cartItemsEl.addEventListener('click', (e)=>{
    const btn = e.target.closest('[data-action]');
    if(!btn) return;
    const id = btn.dataset.id;
    if(btn.dataset.action === 'inc') changeQty(id, 1);
    else if(btn.dataset.action === 'dec') changeQty(id, -1);
    else if(btn.dataset.action === 'remove') removeItem(id);
  });

  function openCart(){ cartSidebar.classList.add('open'); cartOverlay.classList.add('open'); }
  function closeCart(){ cartSidebar.classList.remove('open'); cartOverlay.classList.remove('open'); }
  $('#cartOpenBtn').addEventListener('click', openCart);
  $('#cartCloseBtn').addEventListener('click', closeCart);
  cartOverlay.addEventListener('click', closeCart);
  $('#checkoutBtn').addEventListener('click', ()=>{
    if(Object.keys(cart).length === 0){ showToast('سبد خرید شما خالی است'); return; }
    showToast('سفارش شما با موفقیت ثبت شد');
    Object.keys(cart).forEach(k=>delete cart[k]);
    renderCart();
    setTimeout(closeCart, 900);
  });

  /* ---------- Toast ---------- */
  let toastTimer;
  function showToast(msg){
    const t = $('#toast');
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(()=> t.classList.remove('show'), 2400);
  }

  /* ---------- Login form ---------- */
  $('#loginForm').addEventListener('submit', (e)=>{
    e.preventDefault();
    showToast('خوش آمدید به وایکینگ کافی');
    e.target.reset();
  });

  /* ---------- Splash screen ---------- */
  const splash = $('#splash');
  const app = $('#app');
  function enterSite(){
    splash.classList.add('closing');
    app.classList.remove('hidden');
    setTimeout(()=>{ splash.style.display = 'none'; }, 950);
  }
  $('#enterBtn').addEventListener('click', enterSite);
  splash.addEventListener('click', (e)=>{ if(e.target === splash || e.target.closest('.splash-bg')) enterSite(); });
  document.addEventListener('keydown', (e)=>{
    if(!app.classList.contains('hidden')) return;
    if(e.key === 'Enter' || e.key === ' ') enterSite();
  });

  /* ---------- Init ---------- */
  renderGrid(currentCat);
  renderCart();

})();
