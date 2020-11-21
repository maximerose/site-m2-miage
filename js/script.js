document.onreadystatechange = () => {
    if (document.readyState === 'complete') {
        let body = document.getElementsByTagName('body')[0];
        let button = document.getElementById('menu-toggler');
        let burger = document.getElementById('burger-icon');
        let mobileMenu = document.getElementById('mobile-menu');

        button.onclick = () => {
            burger.classList.toggle('active');
            button.classList.toggle('rotate');
            mobileMenu.classList.toggle('active');
            body.classList.toggle('menu-open');
        }
    }
};
