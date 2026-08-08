// The Phone Plug Kisumu — shared site behaviour

document.addEventListener('DOMContentLoaded', function () {

  /* Mobile nav toggle */
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      nav.classList.toggle('open');
      var isOpen = nav.classList.contains('open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
    nav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { nav.classList.remove('open'); });
    });
  }

  /* Hero carousel (homepage) */
  var slides = document.querySelectorAll('.hero-slide');
  var dotsWrap = document.querySelector('.hero-dots');
  if (slides.length > 1) {
    var current = 0;
    var dots = [];
    if (dotsWrap) {
      slides.forEach(function (_, i) {
        var b = document.createElement('button');
        if (i === 0) b.classList.add('active');
        b.setAttribute('aria-label', 'Show slide ' + (i + 1));
        b.addEventListener('click', function () { goTo(i); });
        dotsWrap.appendChild(b);
        dots.push(b);
      });
    }
    function goTo(i) {
      slides[current].classList.remove('active');
      if (dots[current]) dots[current].classList.remove('active');
      current = i;
      slides[current].classList.add('active');
      if (dots[current]) dots[current].classList.add('active');
    }
    setInterval(function () {
      goTo((current + 1) % slides.length);
    }, 5000);
  }

  /* Accessories slideshow (products page) */
  var accSlides = document.querySelectorAll('.acc-slide');
  var accDotsWrap = document.querySelector('.acc-slide-dots');
  if (accSlides.length > 1) {
    var accCurrent = 0;
    var accDots = [];
    if (accDotsWrap) {
      accSlides.forEach(function (_, i) {
        var b = document.createElement('button');
        if (i === 0) b.classList.add('active');
        b.setAttribute('aria-label', 'Show accessory photo ' + (i + 1));
        b.addEventListener('click', function () { accGoTo(i); });
        accDotsWrap.appendChild(b);
        accDots.push(b);
      });
    }
    function accGoTo(i) {
      accSlides[accCurrent].classList.remove('active');
      if (accDots[accCurrent]) accDots[accCurrent].classList.remove('active');
      accCurrent = i;
      accSlides[accCurrent].classList.add('active');
      if (accDots[accCurrent]) accDots[accCurrent].classList.add('active');
    }
    setInterval(function () {
      accGoTo((accCurrent + 1) % accSlides.length);
    }, 3200);
  }

  /* FAQ accordion */
  document.querySelectorAll('.faq-item').forEach(function (item) {
    var q = item.querySelector('.faq-q');
    if (!q) return;
    q.addEventListener('click', function () {
      var wasOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(function (i) { i.classList.remove('open'); });
      if (!wasOpen) item.classList.add('open');
    });
  });

  /* Product category tabs (products page) */
  var tabs = document.querySelectorAll('.cat-tab');
  if (tabs.length) {
    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        tabs.forEach(function (t) { t.classList.remove('active'); });
        tab.classList.add('active');
        var target = tab.getAttribute('data-target');
        document.querySelectorAll('.category-block').forEach(function (block) {
          block.style.display = (target === 'all' || block.id === target) ? '' : 'none';
        });
        if (target !== 'all') {
          var el = document.getElementById(target);
          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }

  /* Simple contact form (no backend — opens WhatsApp with prefilled message) */
  var form = document.querySelector('#contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = form.querySelector('#name').value.trim();
      var phone = form.querySelector('#phone').value.trim();
      var message = form.querySelector('#message').value.trim();
      var text = 'Hello The Phone Plug Kisumu, my name is ' + (name || '—') +
        '. ' + (message || 'I would like more information.') +
        (phone ? ' (My number: ' + phone + ')' : '');
      var url = 'https://wa.me/254727139237?text=' + encodeURIComponent(text);
      window.open(url, '_blank');
    });
  }

});
