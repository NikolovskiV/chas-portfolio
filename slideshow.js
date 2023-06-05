const slides = document.querySelectorAll('.slide');
let currentIndex = 0;

function showSlide(index) {
    if (index < 0) {
        index = slides.length - 1;
    } else if (index >= slides.length) {
        index = 0;
    }

    slides.forEach((slide, i) => {
        if (i === index) {
            slide.style.display = 'block';
        } else {
            slide.style.display = 'none';
        }
    });

    currentIndex = index;
}

function changeSlide(n) {
    currentIndex += n;
    showSlide(currentIndex);
}

showSlide(currentIndex);