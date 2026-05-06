export function initLazyBg(): void {
  const elements = document.querySelectorAll<HTMLElement>('[data-bg-image]');
  if (elements.length === 0) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target as HTMLElement;
        const url = el.dataset.bgImage;
        if (!url) return;

        const overlay = el.dataset.bgOverlay;
        const img = new Image();
        img.onload = () => {
          if (overlay === 'dark') {
            el.style.backgroundImage = `linear-gradient(135deg, rgba(0,0,0,0.55), rgba(0,0,0,0.25)), url("${url}")`;
          } else {
            el.style.backgroundImage = `url("${url}")`;
          }
          el.classList.add('bg-loaded');
          el.removeAttribute('data-bg-image');
        };
        img.onerror = () => {
          el.classList.add('bg-loaded', 'bg-error');
          el.removeAttribute('data-bg-image');
        };
        img.src = url;

        observer.unobserve(el);
      });
    },
    { rootMargin: '300px 0px', threshold: 0.01 }
  );

  elements.forEach((el) => observer.observe(el));
}
