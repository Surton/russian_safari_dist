$(function() {
  var options = {
    speed: 400,
    slidesPerView: 4,
    spaceBetween: 24,
    breakpoints: {
      1280: {
        allowTouchMove: false,
        slidesPerView: 4,
        spaceBetween: 24,
      },
      1024: {
        allowTouchMove: true,
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
  var slider = new Swiper('[equipment-slider]', options);
});
