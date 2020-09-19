$(function() {
  var options = {
    init: false,
    speed: 400,
    breakpoints: {
      1280: {
        allowTouchMove: false,
        slidesPerView: 3,
        slidesPerColumn: 2,
        spaceBetween: 24,
        slidesPerColumnFill: 'row',
      },
      768: {
        allowTouchMove: false,
        slidesPerView: 2,
        slidesPerColumn: 3,
        spaceBetween: 15,
        slidesPerColumnFill: 'row',
      },
      1: {
        allowTouchMove: true,
        slidesPerView: 'auto',
        slidesPerColumn: 1,
        spaceBetween: 16,
        slidesPerColumnFill: 'row',
      },
    },
  };
  var slider = new Swiper('[obtaining-slider]', options);
  slider.on('breakpoint', function() {
    // Удаление атрибута style связано с багом библиотеки, которая не удаляет margin после изменения свойства slidesPerColumn
    var slides = Array.from(slider.slides);
    $(slides).removeAttr('style');
  });
  slider.init();
});
