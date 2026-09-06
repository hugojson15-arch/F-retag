document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("nav-toggle");
  const nav = document.getElementById("main-nav");

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("is-open");
      toggle.classList.toggle("is-open", isOpen);
      toggle.setAttribute("aria-expanded", String(isOpen));
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("is-open");
        toggle.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const template = document.getElementById("menu-content-template");
  const alacarteBody = document.getElementById("alacarte-body");
  const takeawayBody = document.getElementById("takeaway-body");
  if (template && alacarteBody && takeawayBody) {
    alacarteBody.appendChild(template.content.cloneNode(true));
    takeawayBody.appendChild(template.content.cloneNode(true));
  }

  let lastTrigger = null;

  function openModal(modal, trigger) {
    lastTrigger = trigger || null;
    modal.hidden = false;
    document.body.classList.add("modal-open");
    const closeBtn = modal.querySelector(".modal-close");
    if (closeBtn) closeBtn.focus();
  }

  function closeModal(modal) {
    modal.hidden = true;
    document.body.classList.remove("modal-open");
    if (lastTrigger) lastTrigger.focus();
  }

  const modalLinks = [
    ["open-alacarte", "modal-alacarte"],
    ["open-takeaway", "modal-takeaway"],
  ];

  modalLinks.forEach(([btnId, modalId]) => {
    const btn = document.getElementById(btnId);
    const modal = document.getElementById(modalId);
    if (!btn || !modal) return;

    btn.addEventListener("click", () => openModal(modal, btn));

    modal.querySelectorAll("[data-close-modal]").forEach((closeEl) => {
      closeEl.addEventListener("click", () => closeModal(modal));
    });

    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeModal(modal);
    });
  });

  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    document.querySelectorAll(".modal-overlay:not([hidden])").forEach((modal) => closeModal(modal));
  });
});
