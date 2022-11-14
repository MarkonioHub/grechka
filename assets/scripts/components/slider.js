let swiper
let offset = 0
let slideCounter = 0
let countAll = 0
const sliderList = document.querySelector('.slider__list')

async function getSlides (offset, limit) {
  fetch(`https://private-anon-3fc99d7550-grchhtml.apiary-mock.com/slides?` + new URLSearchParams({
    offset: offset,
    limit: limit
  }))
    .then(response => response.json())
    .then(result => {
      updateSlider(result)
    })
}

function updateSlider (result) {
  const slides = result.data
  slideCounter += slides.length
  if (offset === 0) {
    initSlider(result)
    updateSliderHtml(slides)
  } else {
    updateSliderHtml(slides)
    updateSliderHtml(slides)
  }
  offset += slides.length
}

function updateSliderHtml(slides) {
  for (let i = 0; i < slides.length; i++) {
    const currentSlide = slides[i]
    swiper.appendSlide(
      `
        <div class="slider__item swiper-slide">
          <div class="slider__cont">
            <div class="slider__title-box">
              <h2 class="slider__title" title="${currentSlide.title}">${currentSlide.title}</h2>
            </div>
            <p class="slider__descr">${currentSlide.desc}</p>
            <div class="slider__like-wrap">
              <button class="slider__like-box" type="button" id="${currentSlide.id}">
                <div class="slider__like"></div>
              </button>
              <div class="slider__like-line">
                <div class="slider__like-name">like:</div>
                <div class="slider__like-value">${currentSlide.likeCnt}</div>
              </div>
            </div>
          </div>
          <img class="slider__image" src="${currentSlide.imgUrl}">
          <div class="slider__gradient"></div>
        </div>
      `
    )
  }
}

function initSlider (result) {
  countAll = result.countAll
  swiper = new Swiper('.slider__wrap', {
    navigation: {
      nextEl: '.slider__button_next',
      prevEl: '.slider__button_prev',
    },
    allowTouchMove: false,
    speed: 1500,
    effect: 'creative',
    creativeEffect: {
      prev: {
        translate: ['-100%', 0, 0],
      },
      next: {
        translate: ['50%', 0, -1],
      },
    },
  });
  swiper.on('slideChange', checkCurrentSlide)
}

function checkCurrentSlide () {
  if (swiper.activeIndex === slideCounter - 1 && slideCounter < countAll) getSlides(offset, 3)
}

getSlides(offset, 3)
