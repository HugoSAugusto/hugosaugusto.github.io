document.addEventListener('DOMContentLoaded', () => {
  const menuHamburger = document.querySelector('.menu-hamburger');
  const navMenu = document.querySelector('nav ul');
  const navLinks = navMenu.querySelectorAll('a');

  menuHamburger.addEventListener('click', () => {
    navMenu.classList.toggle('menu-active');

    // Aqui alterna a classe 'hide' para esconder/mostrar o botão
    menuHamburger.classList.toggle('hide');
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('menu-active');

      // Quando fechar o menu, garante que o botão reapareça removendo 'hide'
      menuHamburger.classList.remove('hide');
    });
  });
});
