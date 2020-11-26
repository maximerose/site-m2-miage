const INTERVAL = 3000;

document.onreadystatechange = () => {
    if (document.readyState === 'complete') {
        let button = document.getElementById('menu-toggler');
        let burger = document.getElementById('burger-icon');
        let mobileMenu = document.getElementById('mobile-menu');

        button.onclick = () => {
            burger.classList.toggle('active');
            button.classList.toggle('rotate');
            mobileMenu.classList.toggle('active');
        }

        let carousel = document.getElementById('carousel');
        let items = carousel.getElementsByClassName('carousel-item');
        let nbImages = items.length - 1;
        let indicatorsUl = document.getElementById('carousel-indicators');
        let indicators = indicatorsUl.getElementsByTagName('li');
        let previous = document.getElementById('carousel-prev');
        let next = document.getElementById('carousel-next');

        let activeItem;
        let activeIndicator;

        let getActiveElements = () => {
            let activeElements = {};
            for (let i = 0; i < items.length; i++) {
                if (items[i].classList.contains('active')) {
                    activeElements.item = items[i];
                }

                if (indicators[i].classList.contains('active')) {
                    activeElements.indicator = indicators[i];
                }
            }

            return activeElements;
        }

        let displayImage = (index) => {
            activeItem = getActiveElements().item;
            activeItem.classList.toggle('active');

            activeIndicator = getActiveElements().indicator;
            activeIndicator.classList.toggle('active');

            if (!items[index].classList.contains('active')) {
                items[index].classList.add('active');
            }

            if (!indicators[index].classList.contains('active')) {
                indicators[index].classList.add('active');
            }

            carousel.dispatchEvent(new Event('change'));
        }


        let slide = (direction) => {
            activeItem = getActiveElements().item;
            activeIndicator = getActiveElements().indicator;

            if (activeItem && activeIndicator) {
                let index = activeItem.dataset.item;

                activeItem.classList.toggle('active');
                activeIndicator.classList.toggle('active');

                if (direction < 0) {
                    index--;
                    if (index < 0) {
                        items[nbImages].classList.toggle('active');
                        indicators[nbImages].classList.toggle('active');
                    } else {
                        items[index].classList.toggle('active');
                        indicators[index].classList.toggle('active');
                    }
                } else {
                    index++;
                    if (index > nbImages) {
                        items[0].classList.toggle('active');
                        indicators[0].classList.toggle('active');
                    } else {
                        items[index].classList.toggle('active');
                        indicators[index].classList.toggle('active');
                    }
                }
            }

            activeItem = getActiveElements().item;
            activeIndicator = getActiveElements().indicator;

            carousel.dispatchEvent(new Event('change'));
        }

        let indicatorsLi = document.querySelectorAll('.carousel-indicators li');

        indicatorsLi.forEach((li) => {
            li.addEventListener('click', (event) => {
                displayImage(event.target.dataset.slideTo);
            });
        });

        previous.onclick = () => {
            slide(-1);
        };

        next.onclick = () => {
            slide(1);
        };

        let carouselTimer = {};

        let carouselInterval = setInterval(() => {
            slide(1)
        }, INTERVAL);

        carouselTimer.start = () => {
            carouselInterval = setInterval(() => {
                slide(1)
            }, INTERVAL);
        }

        carouselTimer.stop = () => {
            clearInterval(carouselInterval);
        }

        carouselTimer.restart = () => {
            carouselTimer.stop();
            carouselTimer.start();
        }

        carousel.addEventListener('change', () => {
            carouselTimer.restart();
        });

        carousel.addEventListener('mouseover', () => {
            carouselTimer.stop();
        });

        carousel.addEventListener('mouseleave', () => {
            carouselTimer.start();
        });
    }
};

