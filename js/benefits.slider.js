$(function() {
  var options = {
    speed: 400,
    slidesPerView: 4,
    spaceBetween: 24,
    breakpoints: {
      1280: {
        allowTouchMove: false,
        slidesPerView: 4,
      },
      1024: {
        allowTouchMove: true,
        slidesPerView: 3,
      },
      768: {
        allowTouchMove: true,
        slidesPerView: 2,
      },
      1: {
        allowTouchMove: true,
        slidesPerView: 1,
      },
    },
    pagination: {
      el: '.app-benefits__pagination',
    },
  };
  var slider = new Swiper('[benefits-slider]', options);
});
