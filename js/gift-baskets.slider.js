$(function() {
  var options = {
    speed: 400,
    slidesPerView: 3,
    spaceBetween: 24,
    breakpoints: {
      1024: {
        allowTouchMove: false,
        slidesPerView: 3,
        spaceBetween: 24,
      },
      768: {
        allowTouchMove: true,
        slidesPerView: 2,
        spaceBetween: 16,
      },
      1: {
        allowTouchMove: true,
        slidesPerView: 'auto',
        spaceBetween: 16,
      },
    },
    navigation: {
      nextEl: '[gift-baskets-slider-button-next]',
      prevEl: '[gift-baskets-slider-button-prev]',
      disabledClass: 'app-button-disabled',
    },
  };
  var intro = new Swiper('[gift-baskets-slider]', options);
});
