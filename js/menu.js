//menu
document.addEventListener('DOMContentLoaded', () => {
    const menuHamburger = document.querySelector('.menu-hamburger');
    const navMenu = document.getElementById('mobileMenu');
    const overlay = document.getElementById('menu-overlay');

    function closeMenu() {
        navMenu.style.maxHeight = '0';
        overlay.classList.add('hidden');
        setTimeout(() => navMenu.classList.add('hidden'), 400);
    }

    menuHamburger.addEventListener('click', (e) => {
        e.stopPropagation();
        if (navMenu.classList.contains('hidden')) {
            navMenu.classList.remove('hidden');
            navMenu.style.maxHeight = navMenu.scrollHeight + 'px';
            overlay.classList.remove('hidden');
        } else {
            closeMenu();
        }
    });

    // Fecha ao clicar em um link
    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth < 768) closeMenu();
        });
    });

    // Fecha ao clicar fora
    document.addEventListener('click', (e) => {
        const clickedInside = navMenu.contains(e.target);
        const clickedButton = menuHamburger.contains(e.target);
        if (!clickedInside && !clickedButton && window. innerWidth < 768) {
            closeMenu();
        }
    });

    // Desktop: sempre visível, sem overlay
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 768) {
            navMenu.classList.remove('hidden');
            navMenu.style.maxHeight = 'none';
        overlay.classList.add('hidden');
    } else {
        navMenu.classList.add('hidden');
            navMenu.style.maxHeight = '0';
        }
    });
});


//Rolamento Suave
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        if (target) {
            const offset = target.getBoundingClientRect().top + window.scrollY - 70;
            window.scrollTo({ top: offset, behavior: 'smooth' });
        }
    });
});