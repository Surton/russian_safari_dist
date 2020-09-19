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
  };
  var slider = new Swiper('[intro-slider]', options);
});
