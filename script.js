const header = document.querySelector('.site-header');
const menuButton = document.querySelector('.menu-button');
const mobileMenu = document.querySelector('.mobile-menu');

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 10);
}, { passive: true });

menuButton?.addEventListener('click', () => {
  const isOpen = document.body.classList.toggle('menu-open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
  mobileMenu?.setAttribute('aria-hidden', String(!isOpen));
});

mobileMenu?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    document.body.classList.remove('menu-open');
    menuButton?.setAttribute('aria-expanded', 'false');
    mobileMenu?.setAttribute('aria-hidden', 'true');
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -30px 0px' });

document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));


const copyAddressButton = document.querySelector(".copy-address");
const copyToast = document.getElementById("copyToast");

if (copyAddressButton && copyToast) {
  copyAddressButton.addEventListener("click", async () => {
    const address = copyAddressButton.dataset.address;

    try {
      await navigator.clipboard.writeText(address);

      copyToast.classList.add("show");

      setTimeout(() => {
        copyToast.classList.remove("show");
      }, 1800);
    } catch (error) {
      console.error("주소 복사 실패:", error);
    }
  });
}