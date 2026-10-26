/**
 * KS PRO PACK - INTERACTIVE SCRIPTS (main.js)
 * Production-ready vanilla JavaScript for www.kspropack.fr
 * Handles: Mobile Menu, Sticky Header, Product Filters,
 * Catalogue Search, Form Validation & Mailto Fallback, FAQ Accordion.
 */

document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  // ------------------------------------------------------------------------
  // 1. Sticky Navigation & Scroll-to-Top Button
  // ------------------------------------------------------------------------
  const header = document.querySelector('.header');
  const btnBackTop = document.querySelector('.btn-back-top');

  function handleScroll() {
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;
    
    if (header) {
      if (scrollY > 30) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }

    if (btnBackTop) {
      if (scrollY > 400) {
        btnBackTop.classList.add('visible');
      } else {
        btnBackTop.classList.remove('visible');
      }
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Initial check

  if (btnBackTop) {
    btnBackTop.addEventListener('click', function () {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // ------------------------------------------------------------------------
  // 2. Mobile Burger Navigation
  // ------------------------------------------------------------------------
  const burgerBtn = document.querySelector('.burger-menu');
  const mobileOverlay = document.querySelector('.mobile-nav-overlay');
  const mobilePanel = document.querySelector('.mobile-nav-panel');
  const mobileLinks = document.querySelectorAll('.mobile-nav-panel a');

  function openMobileMenu() {
    if (burgerBtn) burgerBtn.classList.add('open');
    if (mobileOverlay) mobileOverlay.classList.add('open');
    if (mobilePanel) mobilePanel.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    if (burgerBtn) burgerBtn.classList.remove('open');
    if (mobileOverlay) mobileOverlay.classList.remove('open');
    if (mobilePanel) mobilePanel.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (burgerBtn) {
    burgerBtn.addEventListener('click', function () {
      if (burgerBtn.classList.contains('open')) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });
  }

  if (mobileOverlay) {
    mobileOverlay.addEventListener('click', closeMobileMenu);
  }

  mobileLinks.forEach(function (link) {
    link.addEventListener('click', closeMobileMenu);
  });

  // ------------------------------------------------------------------------
  // 3. Product Filter Tabs (produits.html)
  // ------------------------------------------------------------------------
  const filterButtons = document.querySelectorAll('.filter-tabs .filter-btn');
  const productCards = document.querySelectorAll('.product-card');

  if (filterButtons.length > 0 && productCards.length > 0) {
    filterButtons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        filterButtons.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        productCards.forEach(function (card) {
          const category = card.getAttribute('data-category');
          if (filterValue === 'all' || category === filterValue || (category && category.includes(filterValue))) {
            card.style.display = '';
            card.style.opacity = '1';
          } else {
            card.style.display = 'none';
            card.style.opacity = '0';
          }
        });
      });
    });
  }

  // ------------------------------------------------------------------------
  // 4. Catalogue 48h Table Search & Filter (catalogue-48h.html)
  // ------------------------------------------------------------------------
  const searchInput = document.getElementById('catalogueSearchInput');
  const tableRows = document.querySelectorAll('#catalogueTable tbody tr');
  const catFilterBtns = document.querySelectorAll('.cat-filter-btn');

  function filterCatalogue() {
    const query = searchInput ? searchInput.value.toLowerCase().trim() : '';
    const activeBtn = document.querySelector('.cat-filter-btn.active');
    const selectedFamily = activeBtn ? activeBtn.getAttribute('data-family') : 'all';

    let visibleCount = 0;

    tableRows.forEach(function (row) {
      const text = row.textContent.toLowerCase();
      const rowFamily = row.getAttribute('data-family') || '';

      const matchesSearch = query === '' || text.includes(query);
      const matchesFamily = selectedFamily === 'all' || rowFamily === selectedFamily;

      if (matchesSearch && matchesFamily) {
        row.style.display = '';
        visibleCount++;
      } else {
        row.style.display = 'none';
      }
    });

    const emptyNotice = document.getElementById('noResultsNotice');
    if (emptyNotice) {
      emptyNotice.style.display = visibleCount === 0 ? 'block' : 'none';
    }
  }

  if (searchInput) {
    searchInput.addEventListener('input', filterCatalogue);
  }

  if (catFilterBtns.length > 0) {
    catFilterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        catFilterBtns.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        filterCatalogue();
      });
    });
  }

  // ------------------------------------------------------------------------
  // 5. Pre-fill Quote Reference from URL (contact.html?ref=...)
  // ------------------------------------------------------------------------
  const urlParams = new URLSearchParams(window.location.search);
  const refParam = urlParams.get('ref');
  const messageInput = document.getElementById('formMessage');
  const productSelect = document.getElementById('formProductType');

  if (refParam && messageInput) {
    messageInput.value = "Bonjour Alexandra,\n\nJe souhaite recevoir un devis et les tarifs dégressifs pour la référence suivante : " + refParam + ".\n\nMerci de m'indiquer la disponibilité et le délai de livraison.\n";
  }

  // ------------------------------------------------------------------------
  // 6. Contact & Quote Forms Submission (Client-Side Confirmation & Mailto Fallback)
  // ------------------------------------------------------------------------
  const quoteForms = document.querySelectorAll('.quote-form');

  quoteForms.forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      const nom = form.querySelector('[name="nom"]')?.value.trim() || '';
      const societe = form.querySelector('[name="societe"]')?.value.trim() || '';
      const telephone = form.querySelector('[name="telephone"]')?.value.trim() || '';
      const email = form.querySelector('[name="email"]')?.value.trim() || '';
      const besoin = form.querySelector('[name="besoin"]')?.value || 'Non spécifié';
      const quantite = form.querySelector('[name="quantite"]')?.value.trim() || 'Non précisé';
      const message = form.querySelector('[name="message"]')?.value.trim() || '';

      const feedbackEl = form.querySelector('.form-feedback');

      if (!nom || !email || !telephone) {
        if (feedbackEl) {
          feedbackEl.className = 'form-feedback error';
          feedbackEl.innerHTML = '<strong>Attention :</strong> Veuillez renseigner votre nom, email et téléphone pour que nous puissions vous répondre.';
        }
        return;
      }

      // Construction de l'URL mailto pour transmission directe et garantie
      const subject = encodeURIComponent("Demande de devis KS PRO PACK - " + (societe ? societe + " (" + nom + ")" : nom));
      const bodyText = encodeURIComponent(
        "DEMANDE DE DEVIS EXPRESS - KS PRO PACK\n" +
        "======================================\n" +
        "Nom & Prénom : " + nom + "\n" +
        "Entreprise   : " + societe + "\n" +
        "Téléphone    : " + telephone + "\n" +
        "Email        : " + email + "\n" +
        "Type de besoin : " + besoin + "\n" +
        "Volume estimé  : " + quantite + "\n\n" +
        "Précisions / Dimensions / Formats :\n" +
        message + "\n\n" +
        "--\nEnvoyé depuis le site www.kspropack.fr"
      );

      const mailtoUrl = "mailto:alexandra@kspropack.fr?subject=" + subject + "&body=" + bodyText;

      // Affichage du message de confirmation soigné
      if (feedbackEl) {
        feedbackEl.className = 'form-feedback success';
        feedbackEl.innerHTML = 
          '<strong>Merci ' + nom + ' !</strong> Votre demande a été enregistrée avec succès.<br>' +
          'Alexandra et notre service commercial reviendront vers vous sous <strong>24h à 48h</strong> avec votre étude personnalisée.<br>' +
          '<div style="margin-top:10px;">' +
            '<a href="' + mailtoUrl + '" class="btn btn-sm btn-navy" style="display:inline-flex; align-items:center; gap:6px;">' +
              '<svg width="14" height="14" fill="currentColor" viewBox="0 0 16 16"><path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z"/></svg>' +
              'Ouvrir votre messagerie (copie directe)' +
            '</a>' +
          '</div>';
      }

      // Déclenchement automatique discret ou redirection douce
      try {
        window.open(mailtoUrl, '_self');
      } catch (err) {
        console.log("Mailto triggered", err);
      }
    });
  });

  // ------------------------------------------------------------------------
  // 7. FAQ Accordion Interaction
  // ------------------------------------------------------------------------
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(function (item) {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');

    if (question && answer) {
      question.addEventListener('click', function () {
        const isActive = item.classList.contains('active');

        // Close other items
        faqItems.forEach(function (otherItem) {
          otherItem.classList.remove('active');
          const otherAns = otherItem.querySelector('.faq-answer');
          if (otherAns) otherAns.style.maxHeight = null;
        });

        if (!isActive) {
          item.classList.add('active');
          answer.style.maxHeight = answer.scrollHeight + 'px';
        }
      });
    }
  });

  // ------------------------------------------------------------------------
  // 8. Smooth Scrolling for Internal Hash Links
  // ------------------------------------------------------------------------
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId.length > 1) {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });

  console.log("KS PRO PACK website JS loaded successfully.");
});
