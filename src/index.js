import './styles/main.scss'

import('./styles/mobilePart.scss')


//открывать меню выбора книги
const openChooseBtn = document.querySelector(".selected");
openChooseBtn.addEventListener('click', () => {
    const selectBox = document.querySelector('.select-box');
    if (selectBox.classList.contains('active')) {
        selectBox.classList.remove('active')
    } else {
        selectBox.classList.add('active')
    }
});

//слайдер
const sliderDots = document.querySelector(".posts__dots").children;
const postItems = document.querySelectorAll('.posts__item');
for (let i = 0; i < sliderDots.length; i++) {
    const dot = sliderDots.item(i);
    dot.addEventListener('click', () => onDotClick(dot, i))
}
const onDotClick = (dot, index) => {
    for (let i = 0; i < sliderDots.length; i++) {
        sliderDots.item(i).classList.remove('posts__dot_isActive_true');
    }
    dot.classList.add('posts__dot_isActive_true');
    postItems.forEach(item => {
        item.style.transform = `translateX(-${100 * index}%)`
    });
}

//scroll
const image = document.querySelector('#image');
const scrollBarProgress = document.querySelector('.scrollBar__progress');
const scrollDynamicInit = () => {
    const mouseDown = (event) => {
        previousX = undefined;
        image.removeEventListener('mousemove', mouseMove);
        image.addEventListener('mousemove', mouseMove)
    }
    const mouseUP = () => {
        previousX = undefined;
        image.removeEventListener('mousemove', mouseMove);
    }
    const mouseLeave = () => {
        previousX = undefined;
        image.removeEventListener('mousemove', mouseMove);
    }
    const mouseMove = (event) => {
        if (!previousX) {
            previousX = event.layerX;
            return;
        }

        if (Math.abs(previousX - event.layerX) < 20) return;
        //скролл влево
        if (previousX > event.layerX) {
            previousX = event.layerX;
            const prevscroll = scrollPX;
            scrollPX += 20;
            if (scrollPX - prevscroll < 20) return;
            if (scrollPX > image.naturalWidth - currentDisplayWidth) {
                scrollPX = pxCanMove;
            }

            const scrollByCanMove = scrollPX / pxCanMove;
            const movePersentStep = scrollByCanMove * (scrollBarTotalWidth - scrollBarProgress.offsetWidth);
            image.style.transform = `translateX(-${scrollPX}px)`
            scrollBarProgress.style.transform = `translateX(${movePersentStep}px)`
        } else if (previousX < event.layerX) {
            previousX = event.layerX;
            const prevscroll = scrollPX;
            scrollPX -= 20;
            if (prevscroll - scrollPX < 20) return;
            if (scrollPX < 0) scrollPX = 0;
            const scrollByCanMove = scrollPX / pxCanMove;
            const movePersentStep = scrollByCanMove * (scrollBarTotalWidth - scrollBarProgress.offsetWidth);
            image.style.transform = `translateX(-${scrollPX}px)`
            scrollBarProgress.style.transform = `translateX(${movePersentStep}px)`
        }
    }
    image.removeEventListener('mousedown', mouseDown);
    image.removeEventListener('mouseup', mouseUP);
    image.removeEventListener('mouseleave', mouseLeave);
    image.removeEventListener('mousemove', mouseMove);
    const currentDisplayWidth = window.innerWidth;
    const scrollBarTotalWidth = document.querySelector('.scrollBar').offsetWidth;
    scrollBarProgress.style.width = `${currentDisplayWidth / image.naturalWidth * 100}%`
    scrollBarProgress.style.transform = 'translateX(0)';
    image.style.transform = 'translateX(0)';
    let pxCanMove = image.naturalWidth - currentDisplayWidth + 30;

    image.addEventListener('mousedown', mouseDown);
    image.addEventListener('mouseup', mouseUP);
    image.addEventListener('mouseleave', mouseLeave);

    let previousX = undefined;
    let scrollPX = 0;
}

scrollDynamicInit();

const debounce = (func, wait, immediate, lock) => {
    var timeout;
    return () => {
        const context = this, args = arguments;
        const later = function () {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };

        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) {
            func.apply(context, args);
        }
    };
};
window.addEventListener('resize', debounce(scrollDynamicInit,
    200, false), false);