document.onreadystatechange = () => {
    if (document.readyState === 'complete') {
        let main = document.getElementById('main');
        let button = document.getElementById('menu-toggler');
        let burger = document.getElementById('burger-icon');
        let menu = document.getElementById('main-menu');

        button.onclick = () => {
            burger.classList.toggle('active');
            button.classList.toggle('rotate');
            menu.classList.toggle('active');
            main.classList.toggle('darker');
        }
    }
};
