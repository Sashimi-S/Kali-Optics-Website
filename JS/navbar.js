const navContainer = document.getElementById('navbar-container');
const isPagesDirectory = /\/pages\//i.test(window.location.pathname);
const pagePrefix = isPagesDirectory ? '../' : './';
const currentPage = window.location.pathname.split('/').pop().toLowerCase();

const links = [
  { label: 'Home', href: 'index.html' },
  { label: 'Services', href: 'services.html' },
  { label: 'Reviews', href: 'review.html' },
  { label: 'Contact', href: 'contact.html' }
];

navContainer.innerHTML = `
  <div class="nav-box">
    <a href="${pagePrefix}index.html" class="nav-logo">
      <img src="${pagePrefix}images/kali-optics-icon.png" alt="Kali Optics Logo">
    </a>
    <ul class="nav-links">
      ${links.map(({ label, href }) => {
        const isCurrentPage = currentPage === href || (href === 'index.html' && !currentPage);
        const linkPath = href === 'index.html' ? `${pagePrefix}index.html` : `${pagePrefix}pages/${href}`;
        return `<li><a href="${linkPath}"${isCurrentPage ? ' class="active" aria-current="page"' : ''}>${label}</a></li>`;
      }).join('')}
    </ul>
  </div>
`;