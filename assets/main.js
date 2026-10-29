(function () {
  const navToggle = document.querySelector('[data-nav-toggle]');
  const navLinks = document.querySelector('[data-nav-links]');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const open = navLinks.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(open));
      navToggle.textContent = open ? 'Close menu' : 'Site menu';
    });
  }

  document.querySelectorAll('[data-copy-target]').forEach((button) => {
    button.addEventListener('click', async () => {
      const target = document.getElementById(button.dataset.copyTarget);
      if (!target) return;
      target.select();
      target.setSelectionRange(0, target.value.length);
      try {
        await navigator.clipboard.writeText(target.value);
        const original = button.textContent;
        button.textContent = 'Copied';
        window.setTimeout(() => { button.textContent = original; }, 1200);
      } catch (_) {
        document.execCommand('copy');
      }
    });
  });

  document.querySelectorAll('[data-accordion]').forEach((accordion) => {
    const trigger = accordion.querySelector('[data-accordion-trigger]');
    const panel = accordion.querySelector('[data-accordion-panel]');
    if (!trigger || !panel) return;
    trigger.addEventListener('click', () => {
      const open = panel.classList.toggle('is-open');
      trigger.setAttribute('aria-expanded', String(open));
      const icon = trigger.querySelector('[data-accordion-icon]');
      if (icon) icon.textContent = open ? '−' : '+';
    });
  });

  const hoplink = {
    affiliate: 'YOURIDHERE',
    tracking: 'YOURTRACKINGHERE',
    page: 'hp1'
  };
  const cbid = document.querySelector('#cbid');
  const tracking = document.querySelector('#trackingid');
  const pageSelect = document.querySelector('#select-page');
  const hoplinkOutput = document.querySelector('#your-hoplink');
  const previewImage = document.querySelector('[data-hoplink-image]');
  const previewTitle = document.querySelector('[data-hoplink-title]');

  function buildHoplink() {
    const affiliate = (cbid?.value || hoplink.affiliate).trim() || hoplink.affiliate;
    const trackingId = (tracking?.value || '').trim();
    const page = pageSelect?.value || hoplink.page;
    let url = `https://hop.clickbank.net/?affiliate=${encodeURIComponent(affiliate)}&vendor=amazeself`;
    if (trackingId) url += `&tid=${encodeURIComponent(trackingId)}`;
    url += `&type=${encodeURIComponent(page)}`;
    if (hoplinkOutput) hoplinkOutput.value = url;
    if (pageSelect) {
      const option = pageSelect.options[pageSelect.selectedIndex];
      if (previewImage && option?.dataset.img) previewImage.src = option.dataset.img;
      if (previewTitle) previewTitle.textContent = option?.textContent || 'Amazing Self Salespage';
    }
    return url;
  }
  [cbid, tracking, pageSelect].filter(Boolean).forEach((control) => control.addEventListener('input', buildHoplink));
  if (pageSelect) pageSelect.addEventListener('change', buildHoplink);
  if (hoplinkOutput) buildHoplink();

  document.querySelectorAll('[data-save-hoplink]').forEach((button) => {
    button.addEventListener('click', () => {
      const value = buildHoplink();
      try { localStorage.setItem('amazing_hoplink', value); } catch (_) { /* local storage may be disabled */ }
      button.textContent = 'Link saved';
      window.setTimeout(() => { button.textContent = 'Save My Link in the Affiliate Area'; }, 1400);
    });
  });

  document.querySelectorAll('[data-banner-select]').forEach((select) => {
    select.addEventListener('change', () => {
      const input = document.getElementById(select.dataset.bannerInput);
      const view = document.querySelector(select.dataset.bannerView);
      const preview = document.querySelector(select.dataset.bannerPreview);
      if (!input) return;
      const imageUrl = select.value;
      input.value = `<a href="https://hop.clickbank.net/?affiliate=YOURIDHERE&vendor=amazeself&tid=YOURTRACKINGHERE&type=hp1"><img src="${imageUrl}"></a>`;
      if (view) view.href = imageUrl;
      if (preview) preview.src = imageUrl;
    });
  });

  document.querySelectorAll('[data-modal-open]').forEach((openButton) => {
    openButton.addEventListener('click', (event) => {
      event.preventDefault();
      const modal = document.getElementById(openButton.dataset.modalOpen);
      if (modal) modal.classList.add('is-open');
    });
  });
  document.querySelectorAll('[data-modal-close]').forEach((closeButton) => {
    closeButton.addEventListener('click', () => closeButton.closest('.modal')?.classList.remove('is-open'));
  });
  document.querySelectorAll('.modal').forEach((modal) => {
    modal.addEventListener('click', (event) => { if (event.target === modal) modal.classList.remove('is-open'); });
  });
})();
