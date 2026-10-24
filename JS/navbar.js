
(function() {
    const path = location.pathname.toLowerCase();
    const inPages = path.includes('/pages/');

    const homeLink = inPages ? '../index.html' : 'index.html';
    const pageBase = inPages ? './' : 'pages/';

    const navHTML = `
    <header>
        <div class="container">
            <nav class="navbar">
                <div class="logo">
                    <a href="${homeLink}">Sashin Sookmungal's Portfolio</a>
                </div>
                <ul class="nav-menu">
                    <li class="nav-item"><a href="${homeLink}" class="nav-link">Home</a></li>
                    <li class="nav-item"><a href="${pageBase}work.html" class="nav-link">Work</a></li>
                    <li class="nav-item"><a href="${pageBase}gallery.html" class="nav-link">Gallery</a></li>
                    <li class="nav-item"><a href="${pageBase}community.html" class="nav-link">Community</a></li>
                    <li class="nav-item"><a href="${pageBase}contact.html" class="nav-link">Contact</a></li>
                </ul>
                <div class="hamburger">
                    <span class="bar"></span>
                    <span class="bar"></span>
                    <span class="bar"></span>
                </div>
            </nav>
        </div>
    </header>
    `;

    const placeholder = document.getElementById('nav-placeholder');
    if (placeholder) {
        placeholder.innerHTML = navHTML;
    } else {
        document.body.insertAdjacentHTML('afterbegin', navHTML);
    }

})();
