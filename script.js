const siteConfig = {
  storageKey: "sofia-tarot-modal-state",
  gallerySelector: "[data-gallery]",
  ringSelector: "[data-gallery-ring]",
  tarotMessages: [
    "Сегодня важно прислушаться к внутреннему ощущению. В ситуации может быть больше скрытого, чем кажется на первый взгляд.",
    "Карта указывает на разговор, который давно откладывался. Лучше не спешить и мягко разобраться в причинах.",
    "День подходит для прояснения чувств и честного взгляда на ситуацию. Не торопитесь отвечать на эмоциях."
  ],
  revealDelayMs: 29000,
  revealScrollRatio: 0.38
};

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function setupOrbitGallery() {
  const gallery = document.querySelector(siteConfig.gallerySelector);
  const ring = document.querySelector(siteConfig.ringSelector);
  if (!gallery || !ring) return;

  const cards = [...ring.querySelectorAll(".orbit-card")];
  if (!cards.length) return;

  const applyLayout = () => {
    const width = window.innerWidth;
    let radius = 174;
    let cardWidth = 152;
    let cardHeight = 230;

    if (width >= 980) {
      radius = 292;
      cardWidth = 206;
      cardHeight = 308;
    } else if (width >= 720) {
      radius = 238;
      cardWidth = 186;
      cardHeight = 276;
    }

    ring.style.width = `${cardWidth}px`;
    ring.style.height = `${cardHeight}px`;

    cards.forEach((card, index) => {
      card.style.transform = `rotateY(${index * (360 / cards.length)}deg) translateZ(${radius}px)`;
    });
  };

  applyLayout();
  window.addEventListener("resize", applyLayout, { passive: true });

  if (prefersReducedMotion) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        ring.classList.toggle("is-active", entry.isIntersecting);
      });
    },
    { threshold: 0.2 }
  );

  observer.observe(gallery);
}

function setupLightbox() {
  const lightbox = document.querySelector("[data-lightbox]");
  const target = document.querySelector("[data-lightbox-target]");
  const closeButton = document.querySelector("[data-lightbox-close]");
  if (!lightbox || !target || !closeButton) return;

  const close = () => {
    lightbox.hidden = true;
    target.removeAttribute("src");
  };

  document.querySelectorAll("[data-lightbox-image]").forEach((button) => {
    button.addEventListener("click", () => {
      target.src = button.getAttribute("data-lightbox-image") || "";
      lightbox.hidden = false;
    });
  });

  closeButton.addEventListener("click", close);
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) close();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !lightbox.hidden) close();
  });
}

function setupTarotModal() {
  const modal = document.querySelector("[data-tarot-modal]");
  const result = document.querySelector("[data-tarot-result]");
  const message = document.querySelector("[data-tarot-message]");
  const cards = document.querySelectorAll(".tarot-pick");
  const copyButton = document.querySelector("[data-copy-message]");
  const closeButtons = document.querySelectorAll("[data-tarot-close]");

  if (!modal || !result || !message || !cards.length) return;

  let timerId = null;
  let shown = false;

  const shouldSkip = () => sessionStorage.getItem(siteConfig.storageKey) === "closed";
  const markClosed = () => sessionStorage.setItem(siteConfig.storageKey, "closed");

  const close = () => {
    modal.hidden = true;
    markClosed();
  };

  const open = () => {
    if (shouldSkip() || shown) return;
    shown = true;
    modal.hidden = false;
  };

  timerId = window.setTimeout(open, siteConfig.revealDelayMs);

  const onScroll = () => {
    if (shouldSkip() || shown) return;
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    if (scrollable <= 0) return;
    if (window.scrollY / scrollable >= siteConfig.revealScrollRatio) {
      window.clearTimeout(timerId);
      open();
      window.removeEventListener("scroll", onScroll);
    }
  };

  window.addEventListener("scroll", onScroll, { passive: true });

  closeButtons.forEach((button) => button.addEventListener("click", close));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !modal.hidden) close();
  });

  cards.forEach((card) => {
    card.addEventListener("click", () => {
      cards.forEach((item) => {
        if (item !== card) item.disabled = true;
      });
      card.classList.add("is-revealed");
      result.hidden = false;
      const index = Number(card.getAttribute("data-card-index") || 0);
      message.textContent = siteConfig.tarotMessages[index] || siteConfig.tarotMessages[0];
      markClosed();
    });
  });

  if (copyButton) {
    copyButton.addEventListener("click", async () => {
      const text =
        "Здравствуйте. Я выбрала карту дня на сайте и хочу понять, что она может значить для моей ситуации.";
      try {
        await navigator.clipboard.writeText(text);
        copyButton.textContent = "Текст скопирован";
      } catch {
        copyButton.textContent = "Скопируйте вручную";
      }
    });
  }
}

setupOrbitGallery();
setupLightbox();
setupTarotModal();
