import Slider from "./slider";

export default class MiniSlider extends Slider {
    constructor(container, next, prev, activeClass, animate, autoplay) {
        super(container, next, prev, activeClass, animate, autoplay);
    }

    decorizeSlides() {
        for (let slide of this.slides) {
            slide.classList.remove(this.activeClass);

            if (this.animate) {
                slide.querySelector('.card__title').style.opacity = '0.4';
                slide.querySelector('.card__controls-arrow').style.opacity = '0';
            }
        }

        this.slides[0].classList.add(this.activeClass);

        if (this.animate) {
            this.slides[0].querySelector('.card__title').style.opacity = '1';
            this.slides[0].querySelector('.card__controls-arrow').style.opacity = '1';
        }
    }

    nextSlide() {
        this.container.appendChild(this.slides[0]);
        
        for (let slide of this.slides) {
            if (slide.tagName === "BUTTON") {
                this.container.appendChild(slide);
            } 
        }

        this.decorizeSlides();
    }

    bindTriggers() {
        this.next.addEventListener('click', () => this.nextSlide());

        this.prev.addEventListener('click', () => {
            for (let i = this.slides.length - 1; i > 0; i--) {
                if (this.slides[i].tagName !== "BUTTON") {
                    let active = this.slides[i];
                    this.container.insertBefore(active, this.slides[0]);
                    this.decorizeSlides();
                    break;
                }
            }
        });
    }

    init() {
        this.container.style.cssText = `
            display: flex;
            flex-wrap: wrap;
            overflow: hidden;
            align-items: flex-start;
        `;

        this.bindTriggers();
        this.decorizeSlides();

        if (this.autoplay) {
            let timerId = setInterval(() => this.nextSlide(), 5000);
            let arr = [this.container, this.next, this.prev];

            for (let item of arr) {
                item.addEventListener('mouseenter', () => clearInterval(timerId));
                item.addEventListener('mouseleave', () => timerId = setInterval(() => this.nextSlide(), 5000));
            }
        }
    }
}