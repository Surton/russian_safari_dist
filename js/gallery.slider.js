$(function() {
  var thumbsOptions = {
    speed: 400,
    spaceBetween: 8,
    slidesPerView: 'auto',
    freeMode: true,
    watchSlidesVisibility: true,
    watchSlidesProgress: true,
    slidesOffsetBefore: 4,
    slidesOffsetAfter: 4,
    breakpoints: {
      768: {
        spaceBetween: 8,
      },
      1: {
        spaceBetween: 4,
      },
    },
  };
  var thumbsSlider = new Swiper('[gallery-slider-thumbs]', thumbsOptions);
  var galleryOptions = {
    speed: 400,
    spaceBetween: 10,
    autoHeight: true,
    navigation: {
      nextEl: '[gallery-slider-button-next]',
      prevEl: '[gallery-slider-button-prev]',
      disabledClass: 'app-button-disabled',
    },
    thumbs: {
      swiper: thumbsSlider,
      slideThumbActiveClass: 'app-gallery-thumbs__item--active',
    },
  };
  var gallery = new Swiper('[gallery-slider]', galleryOptions);
});
