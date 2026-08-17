/* ============================================================
   Ricardo Training — comportamiento de la landing
   Sin dependencias. Cada bloque replica una interacción del diseño.
   ============================================================ */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion:reduce)').matches;

  /* ---------- menú móvil ---------- */
  (function menu() {
    var burger = document.querySelector('.rt-burger');
    var panel = document.getElementById('rt-menu');
    if (!burger || !panel) return;

    function setOpen(open) {
      panel.hidden = !open;
      burger.setAttribute('aria-expanded', String(open));
    }

    burger.addEventListener('click', function () { setOpen(true); });
    panel.querySelector('.rt-menu-close').addEventListener('click', function () { setOpen(false); });
    panel.addEventListener('click', function (e) {
      if (e.target.closest('a')) setOpen(false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !panel.hidden) setOpen(false);
    });
  })();

  /* ---------- palabra rotativa del hero ---------- */
  (function heroWord() {
    var el = document.getElementById('rt-word');
    if (!el) return;

    var words = ['Fuerte.', 'Bien.', 'Ahora.', 'Sano.'];
    var i = 0;

    setInterval(function () {
      i = (i + 1) % words.length;
      var next = el.cloneNode(false);
      next.textContent = words[i];
      el.replaceWith(next);
      el = next;
    }, 1000);
  })();

  /* ---------- carruseles con flechas ---------- */
  (function carousels() {
    // Desplaza al elemento anterior/siguiente alineando su offsetLeft,
    // descontando el padding del riel — igual que el prototipo.
    function scrollByCard(rail, dir) {
      var kids = Array.prototype.slice.call(rail.children);
      if (!kids.length) return;

      var padLeft = parseFloat(getComputedStyle(rail).paddingLeft) || 0;
      var offsets = kids.map(function (k) {
        return k.offsetLeft - rail.offsetLeft - padLeft;
      });

      var left = rail.scrollLeft;
      var idx = 0;
      var best = Infinity;
      offsets.forEach(function (o, n) {
        var d = Math.abs(o - left);
        if (d < best - 1) { best = d; idx = n; }
      });

      var next = Math.max(0, Math.min(offsets.length - 1, idx + dir));
      rail.scrollTo({ left: offsets[next], behavior: 'smooth' });
    }

    document.querySelectorAll('[data-carousel-nav]').forEach(function (nav) {
      var rail = document.querySelector('[data-carousel="' + nav.dataset.carouselNav + '"]');
      if (!rail) return;
      nav.querySelectorAll('button[data-dir]').forEach(function (btn) {
        btn.addEventListener('click', function () {
          scrollByCard(rail, Number(btn.dataset.dir));
        });
      });
    });
  })();

  /* ---------- foto de comunidad: gris → color al entrar en pantalla ---------- */
  (function teamReveal() {
    var img = document.querySelector('.rt-team-img');
    if (!img) return;

    if (reduceMotion || !('IntersectionObserver' in window)) {
      img.classList.add('is-revealed');
      return;
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.intersectionRatio >= 0.35) {
          img.classList.add('is-revealed');
          io.disconnect();
        }
      });
    }, { threshold: [0.35] });

    io.observe(document.getElementById('rt-team') || img);
  })();

  /* ---------- FAQ (acordeón de una sola respuesta abierta) ---------- */
  (function faq() {
    var root = document.querySelector('[data-faq]');
    if (!root) return;

    var items = Array.prototype.slice.call(root.querySelectorAll('.rt-faq-item'));

    items.forEach(function (item) {
      var btn = item.querySelector('.rt-faq-q');
      var sign = item.querySelector('.rt-faq-sign');

      btn.addEventListener('click', function () {
        var wasOpen = item.classList.contains('is-open');

        items.forEach(function (other) {
          other.classList.remove('is-open');
          other.querySelector('.rt-faq-q').setAttribute('aria-expanded', 'false');
          other.querySelector('.rt-faq-sign').textContent = '+';
        });

        if (!wasOpen) {
          item.classList.add('is-open');
          btn.setAttribute('aria-expanded', 'true');
          sign.textContent = '–';
        }
      });
    });
  })();

  /* ---------- widget de WhatsApp ---------- */
  (function whatsapp() {
    var fab = document.getElementById('rt-wa-fab');
    var panel = document.getElementById('rt-wa-panel');
    var time = document.getElementById('rt-wa-time');
    if (!fab || !panel) return;

    if (time) {
      time.textContent = new Date().toLocaleTimeString('es-CL', {
        hour: '2-digit', minute: '2-digit', hour12: false
      });
    }

    function setOpen(open) {
      panel.hidden = !open;
      fab.setAttribute('aria-expanded', String(open));
    }

    fab.addEventListener('click', function () { setOpen(panel.hidden); });
    panel.querySelector('.rt-wa-close').addEventListener('click', function () { setOpen(false); });
  })();
})();
