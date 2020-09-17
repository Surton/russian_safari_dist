$(function() {
  var options = {
    speed: 400,
    slidesPerView: 1,
    spaceBetween: 0,
    breakpoints: {
      768: {
        allowTouchMove: false,
        slidesPerView: 1,
        spaceBetween: 0,
      },
      1: {
        allowTouchMove: true,
        slidesPerView: 'auto',
        spaceBetween: 16,
      },
    },
  };
  var intro = new Swiper('[included-slider]', options);
});
