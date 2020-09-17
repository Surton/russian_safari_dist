$(function() {
  var options = {
    speed: 400,
    slidesPerView: 'auto',
    spaceBetween: 24,
    breakpoints: {
      1280: {
        spaceBetween: 24,
      },
      1: {
        spaceBetween: 16,
        freeMode: true,
      },
    },
  };
  var intro = new Swiper('[companies-slider]', options);
});
