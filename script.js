const setup = () => {
  const title = document.querySelector("#valentine-title");
  const noButton = document.querySelector(".btn-no");
  const yesButton = document.querySelector(".btn-yes");
  const boundary = document.querySelector(".button-boundary");
  const card = document.querySelector(".card");

  if (title) {
    const params = new URLSearchParams(window.location.search);
    const rawName = params.get("name");
    const cleanName = rawName ? rawName.trim().replace(/\s+/g, " ") : "";
    title.textContent = cleanName
      ? `Will you be my Valentine, ${cleanName}?`
      : "Will you be my Valentine?";
  }

  if (noButton && boundary) {
    const moveNoButton = () => {
      const maxX = Math.max(0, boundary.clientWidth - noButton.offsetWidth);
      const maxY = Math.max(0, boundary.clientHeight - noButton.offsetHeight);
      const nextX = Math.random() * maxX;
      const nextY = Math.random() * maxY;

      noButton.style.left = `${nextX}px`;
      noButton.style.top = `${nextY}px`;
      noButton.classList.remove("btn-wiggle");
      window.requestAnimationFrame(() => {
        noButton.classList.add("btn-wiggle");
      });
    };

    const enableNoButtonDodge = () => {
      const padding = 14;
      const maxX = Math.max(0, boundary.clientWidth - noButton.offsetWidth);
      const maxY = Math.max(0, boundary.clientHeight - noButton.offsetHeight);
      const initialLeft = Math.min(padding, maxX);
      const initialTop = Math.min(padding, maxY);

      noButton.style.position = "absolute";
      noButton.style.left = `${initialLeft}px`;
      noButton.style.top = `${initialTop}px`;
      noButton.style.transition = "transform 0.15s ease, left 0.15s ease, top 0.15s ease";

      noButton.addEventListener("mouseover", moveNoButton);
      noButton.addEventListener(
        "touchstart",
        (event) => {
          event.preventDefault();
          moveNoButton();
        },
        { passive: false }
      );

      noButton.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        moveNoButton();
      });

      window.addEventListener("resize", () => {
        window.requestAnimationFrame(moveNoButton);
      });
      window.addEventListener("orientationchange", () => {
        window.requestAnimationFrame(moveNoButton);
      });
    };

    window.requestAnimationFrame(enableNoButtonDodge);
  }

  if (yesButton && card) {
    const triggerHearts = () => {
      const container = document.createElement("div");
      container.style.position = "absolute";
      container.style.inset = "0";
      container.style.pointerEvents = "none";
      container.style.overflow = "hidden";
      card.style.position = "relative";
      card.appendChild(container);

      const heartCount = 18;
      for (let i = 0; i < heartCount; i += 1) {
        const heart = document.createElement("span");
        heart.textContent = "💖";
        heart.style.position = "absolute";
        heart.style.left = `${Math.random() * 100}%`;
        heart.style.bottom = "-10px";
        heart.style.fontSize = `${14 + Math.random() * 14}px`;
        heart.style.opacity = "0";
        const duration = 1200 + Math.random() * 600;
        const delay = Math.random() * 200;
        heart.animate(
          [
            { transform: "translateY(0)", opacity: 0 },
            { opacity: 1, offset: 0.2 },
            { transform: `translateY(-${80 + Math.random() * 60}px)`, opacity: 0 }
          ],
          {
            duration,
            delay,
            easing: "ease-out",
            fill: "forwards"
          }
        );
        container.appendChild(heart);

        window.setTimeout(() => {
          heart.remove();
        }, duration + delay + 50);
      }

      window.setTimeout(() => {
        container.remove();
      }, 2000);
    };

    yesButton.addEventListener("click", (event) => {
      event.preventDefault();
      card.innerHTML = `
        <h1>YAY!! 💖 I knew you’d say yes!</h1>
        <p style="margin: 8px 0 0; font-size: 1rem; color: #ff6b8a;">
          Happy Valentine’s Day 🥺🌹
        </p>
      `;
      triggerHearts();
    });
  }
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", setup, { once: true });
} else {
  setup();
}
