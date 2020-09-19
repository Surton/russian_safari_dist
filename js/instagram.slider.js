$(function() {
  var options = {
    speed: 400,
    slidesPerView: 6,
    spaceBetween: 24,
    breakpoints: {
      1280: {
        allowTouchMove: false,
        slidesPerView: 6,
      },
      1024: {
        allowTouchMove: true,
        slidesPerView: 5,
      },
      768: {
        allowTouchMove: true,
        slidesPerView: 4,
      },
      1: {
        allowTouchMove: true,
        slidesPerView: 'auto',
      },
    },
  };
  var slider = new Swiper('[instagram-slider]', options);
});
