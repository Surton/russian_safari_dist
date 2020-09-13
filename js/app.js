function _createForOfIteratorHelper(o, allowArrayLike) {
  var it;
  if (typeof Symbol === 'undefined' || o[Symbol.iterator] == null) {
    if (
      Array.isArray(o) ||
      (it = _unsupportedIterableToArray(o)) ||
      (allowArrayLike && o && typeof o.length === 'number')
    ) {
      if (it) o = it;
      var i = 0;
      var F = function F() {};
      return {
        s: F,
        n: function n() {
          if (i >= o.length) return { done: true };
          return { done: false, value: o[i++] };
        },
        e: function e(_e) {
          throw _e;
        },
        f: F,
      };
    }
    throw new TypeError(
      'Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
    );
  }
  var normalCompletion = true,
    didErr = false,
    err;
  return {
    s: function s() {
      it = o[Symbol.iterator]();
    },
    n: function n() {
      var step = it.next();
      normalCompletion = step.done;
      return step;
    },
    e: function e(_e2) {
      didErr = true;
      err = _e2;
    },
    f: function f() {
      try {
        if (!normalCompletion && it.return != null) it.return();
      } finally {
        if (didErr) throw err;
      }
    },
  };
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === 'string') return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === 'Object' && o.constructor) n = o.constructor.name;
  if (n === 'Map' || n === 'Set') return Array.from(o);
  if (n === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
    return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }
  return arr2;
}

function initTippy() {
  tippy('[data-template]', {
    trigger: 'click',
    placement: 'bottom-end',
    theme: 'custom',
    allowHTML: true,
    interactive: true,
    duration: 100,
    arrow: false,
    content: function content(reference) {
      var id = reference.getAttribute('data-template');
      var template = document.getElementById(id);
      return template ? template.innerHTML : null;
    },
  });
  tippy('[header-dropdown-template]', {
    trigger: 'click',
    placement: 'bottom-start',
    theme: 'custom',
    allowHTML: true,
    interactive: true,
    duration: 100,
    arrow: false,
    content: function content(reference) {
      var id = reference.getAttribute('header-dropdown-template');
      var template = document.getElementById(id);
      return template ? template.innerHTML : null;
    },
  });
  tippy('[description-popover]', {
    trigger: 'click',
    placement: 'bottom',
    theme: 'custom',
    allowHTML: true,
    interactive: true,
    duration: 100,
    arrow: false,
    appendTo: function appendTo() {
      return document.body;
    },
    content: function content(reference) {
      var id = reference.getAttribute('description-popover');
      var template = document.getElementById(id);
      return template ? template.innerHTML : null;
    },
    onCreate: function onCreate(instance) {
      $('[description-popover-close]', instance.popper).on('click', function() {
        instance.hide();
      });
    },
    onTrigger: function onTrigger(_instance, event) {
      event.preventDefault();
    },
    onUntrigger: function onUntrigger(_instance, event) {
      event.preventDefault();
    },
  });
}

function initSticky() {
  var elements = document.querySelectorAll('[sticky]');

  var setStickyState = function setStickyState() {
    var _iterator = _createForOfIteratorHelper(elements),
      _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done; ) {
        var el = _step.value;
        var id = $(el).attr('data-id');
        var clone = document.getElementById(id);
        var offset = getStickyOffset(clone);

        if (window.pageYOffset + offset < el.offsetTop) {
          // Удаляем sticky-клона, если дошли до исходного элемента
          if (clone) {
            $(el)
              .css({
                visibility: 'visible',
              })
              .attr('data-stickied', false)
              .scrollLeft($(clone).scrollLeft())
              .scrollTop($(clone).scrollTop());
            $(clone).remove();
          }
        } else if (!clone) {
          // Добавляем sticky-клона, прячем исходный элемент
          $(el)
            .clone({
              withDataAndEvents: true,
              deepWithDataAndEvents: true,
            })
            .appendTo('body')
            .attr('id', id)
            .removeAttr('sticky')
            .removeAttr('data-id')
            .attr('sticky-clone', '')
            .addClass('sticky')
            .css({
              top: offset,
            })
            .scrollLeft($(el).scrollLeft())
            .scrollTop($(el).scrollTop());
          $(el)
            .css({
              visibility: 'hidden',
            })
            .attr('data-stickied', true);
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  };

  if (elements.length > 0) {
    setStickyState();
    $(window).on('scroll', setStickyState);
  }
}

function initClamp() {
  var elements = document.querySelectorAll('[clamp]');

  var _iterator2 = _createForOfIteratorHelper(elements),
    _step2;

  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done; ) {
      var element = _step2.value;
      var attribute = element.getAttribute('clamp');
      $clamp(element, {
        clamp: attribute,
        useNativeClamp: false,
      });
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }
}

function initMobileHeader() {
  var activeClass = 'app-header-mobile--active';
  $('[header-switcher]').on('click', function() {
    $('[app-header-mobile]').toggleClass(activeClass);

    if ($('[app-header-mobile]').hasClass(activeClass)) {
      $(document.body).css('overflow', 'hidden');
    } else {
      $(document.body).css('overflow', 'auto');
    }
  });
}

function initAccordions() {
  $('[accordion-header]').on('click', function(e) {
    var parent = e.currentTarget.parentElement;
    $(parent).toggleClass('app-accordion--active');
  });
}

function resizeIframe() {
  var resizeFrame = function resizeFrame(frame) {
    return $(frame).height(frame.clientWidth * 0.56);
  };

  $('iframe[resize]').on('load', function(event) {
    resizeFrame(event.target);
    $(window).on('resize', function() {
      return resizeFrame(event.target);
    });
  });
}

function initSelect() {
  $('[select]').selectize({
    create: true,
    allowEmptyOption: false,
    highlight: false,
    hideSelected: true,
    onChange: function onChange(value) {
      console.log(
        '\u0412\u044B\u0431\u0440\u0430\u043D\u043E \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435: '.concat(
          value
        )
      );
    },
    render: {
      item: function item(_item) {
        var icon = $(this.$input).attr('data-icon');
        var result = '';
        result += '<div class="item app-select__selected">';

        if (icon) {
          result += '<svg class="app-select__icon"><use xlink:href="./img/sprite.svg#'.concat(
            icon,
            '"></use></svg>'
          );
        }

        result += '<div>'.concat(_item.text, '</div>');
        result += '</div>';
        return result;
      },
    },
  });
}

function initTabs() {
  var elements = document.querySelectorAll('[tabs]');

  var _iterator3 = _createForOfIteratorHelper(elements),
    _step3;

  try {
    var _loop = function _loop() {
      var element = _step3.value;

      var setActive = function setActive(id) {
        var navigationActiveClass = 'app-tabs-header__item--active';
        var tabActiveClass = 'app-tabs-content-tab--active';
        $('[tabs-content-item]', element).removeClass(tabActiveClass);
        $('[tabs-navigation-item]', element).removeClass(navigationActiveClass);
        $('[tabs-content-item][data-tab="'.concat(id, '"]'), element).addClass(
          tabActiveClass
        );
        $(
          '[tabs-navigation-item][data-tab="'.concat(id, '"]'),
          element
        ).addClass(navigationActiveClass);
      };

      setActive(element.getAttribute('data-active'));
      $('[tabs-navigation-item]', element).on('click', function() {
        var id = $(this).attr('data-tab');
        setActive(id);
      });
    };

    for (_iterator3.s(); !(_step3 = _iterator3.n()).done; ) {
      _loop();
    }
  } catch (err) {
    _iterator3.e(err);
  } finally {
    _iterator3.f();
  }
}

function initModals() {
  MicroModal.init({
    disableScroll: true,
    awaitOpenAnimation: true,
    awaitCloseAnimation: true,
  }); // Добавлен дополнительный обработчик для кнопок, т.к библиотечная реализация не работает, если внутри есть контент (например, иконка в кнопке)

  var elements = document.querySelectorAll('[app-modal]');

  var _iterator4 = _createForOfIteratorHelper(elements),
    _step4;

  try {
    var _loop2 = function _loop2() {
      var element = _step4.value;
      $('[app-modal-close]', element).on('click', function(event) {
        MicroModal.close($(element).attr('id'));
      });
    };

    for (_iterator4.s(); !(_step4 = _iterator4.n()).done; ) {
      _loop2();
    }
  } catch (err) {
    _iterator4.e(err);
  } finally {
    _iterator4.f();
  }
}

function initFileInputs() {
  var _this = this;

  var elements = document.querySelectorAll('[app-input-file]');

  var _iterator5 = _createForOfIteratorHelper(elements),
    _step5;

  try {
    var _loop3 = function _loop3() {
      var element = _step5.value;
      $(element).attr('tabindex', -1);
      var label = $(
        '<label tabindex="0" for="'
          .concat(
            $(element).attr('id'),
            '" class="app-input app-input-file-label" title="'
          )
          .concat($(element).attr('placeholder'), '"></label>')
      );
      var icon = $(
        '<svg class="app-input-file-label__icon"><use xlink:href="./img/sprite.svg#attach"></use></svg>'
      );
      var placeholder = $(
        '<div class="app-input-file-label__placeholder">'.concat(
          $(element).attr('placeholder'),
          '</div>'
        )
      );
      $(element).after(label);
      $(label).append(icon);
      $(label).append(placeholder);
      $(element).change(function(event) {
        if (event.files && event.files.length > 1) {
          fileName = (
            event.getAttribute('data-multiple-caption') || ''
          ).replace('{count}', _this.files.length);
        } else {
          fileName = event.target.value.split('\\').pop();
        }

        $(placeholder).html(fileName || $(element).attr('placeholder'));
      });
    };

    for (_iterator5.s(); !(_step5 = _iterator5.n()).done; ) {
      _loop3();
    }
  } catch (err) {
    _iterator5.e(err);
  } finally {
    _iterator5.f();
  }
}

function initPageNavigation() {
  var pageNavigationAnchorAttr = 'page-navigation-anchor';
  var pageNavigationAttr = 'page-navigation';
  var anchors = document.querySelectorAll(
    '['.concat(pageNavigationAnchorAttr, ']')
  );
  var items = document.querySelectorAll('['.concat(pageNavigationAttr, ']'));

  var scrollTo = function scrollTo(query, callback) {
    // Позиция скролла рассчитывается исходя из высоты sticky-элементов
    var scrollTop = $(query).offset().top - getStickyOffset();

    if (window.pageYOffset !== scrollTop) {
      $([document.documentElement, document.body]).animate(
        {
          scrollTop: scrollTop,
        },
        callback
      );
    }
  };

  $(items).on('click', function(e) {
    e.preventDefault();
    var target = $(e.target).attr(pageNavigationAttr); // В callback-функции вызывается второй раз скролл, т.к во время скролла могли появиться sticky-элементы
    // Заранее отступы рассчитать невозможно

    scrollTo(
      '['.concat(pageNavigationAnchorAttr, '=').concat(target, ']'),
      function() {
        return scrollTo(
          '['.concat(pageNavigationAnchorAttr, '=').concat(target, ']')
        );
      }
    );
  });

  var setActiveNavigation = function setActiveNavigation() {
    var current = $(anchors[0]).attr(pageNavigationAnchorAttr);

    for (var i = 1; i < anchors.length; i++) {
      // Текущий элемент рассчитывается с учетом sticky-элементов
      // + 1 пиксель необходим, т.к по факту scrollTo не доходит до элемента на 1 пиксель
      if (
        $(anchors[i]).offset().top <
        window.pageYOffset + getStickyOffset() + 1
      ) {
        current = $(anchors[i]).attr(pageNavigationAnchorAttr);
      }
    }

    $('['.concat(pageNavigationAttr, ']')).removeClass('active');
    $('['.concat(pageNavigationAttr, '=').concat(current, ']')).addClass(
      'active'
    );
  };

  setActiveNavigation();

  if (anchors.length > 0 && items.length > 0) {
    $(window).on('scroll', debounce(setActiveNavigation, 1));
  }
}

function initInputCounter() {
  var counter = 'app-input-counter';
  var counterMinus = ''.concat(counter, '-minus');
  var counterPlus = ''.concat(counter, '-plus');
  var counterInput = ''.concat(counter, '-input');
  var counterIcon = ''.concat(counter, '-icon');
  var counterPlaceholder = ''.concat(counter, '-placeholder');

  var updateState = function updateState(counter) {
    var value = $('['.concat(counterInput, ']'), counter).val();
    var max = $('['.concat(counterInput, ']'), counter).attr('max');
    var placeholder = $(counter).data('placeholder');

    if (placeholder && max) {
      $('['.concat(counterPlaceholder, ']'), counter).html(
        placeholder.replace('{current}', value).replace('{max}', max)
      );
    }

    $('['.concat(counterIcon, ']'), counter)
      .removeClass('active')
      .slice(0, value)
      .addClass('active');
  };

  var counters = document.querySelectorAll('['.concat(counter, ']'));

  var _iterator6 = _createForOfIteratorHelper(counters),
    _step6;

  try {
    var _loop4 = function _loop4() {
      var item = _step6.value;
      // Инициализация компонента
      var input = $('['.concat(counterInput, ']'), item);
      var min = +input.attr('min') || 0;
      var max = +input.attr('max');
      var placeholder = $(item).data('placeholder'); // Инициализация начального значения

      input.val(min); // Если есть плейсхолдер и максимальное значение, отключаем поле для ввода и показываем placeholder

      if (placeholder && max) {
        input.attr('disabled', true);
        $('['.concat(counterPlaceholder, ']'), item).show(); // Обновляем стейт, чтобы отобразить значение в placeholder

        updateState(item);
      } else {
        input.attr('type', 'number');
        input.attr('disabled', false);
        $('['.concat(counterPlaceholder, ']'), item).hide();
      } // Обработка события нажатия на минус

      $('['.concat(counterMinus, ']'), item).on('click', function() {
        if (+input.val() - 1 >= min) {
          input.val(+input.val() - 1);
          input.trigger('input');
        }

        updateState(item);
      }); // Обработка события нажатия на плюс

      $('['.concat(counterPlus, ']'), item).on('click', function() {
        if (+input.val() + 1 <= max || !max) {
          input.val(+input.val() + 1);
          input.trigger('input');
        }

        updateState(item);
      }); // Обработка события нажатия на иконки для изменения счетчика

      $('['.concat(counterIcon, ']'), item).on('click', function(event) {
        input.val($(event.currentTarget).index() + 1);
        input.trigger('input');
        updateState(item);
      });
    };

    for (_iterator6.s(); !(_step6 = _iterator6.n()).done; ) {
      _loop4();
    }
  } catch (err) {
    _iterator6.e(err);
  } finally {
    _iterator6.f();
  }
}

function getStickyOffset(exclude) {
  var stickyElements = document.querySelectorAll('[sticky-clone]');
  var offset = 0; // Вычисление высоты всех активных sticky элементов

  var _iterator7 = _createForOfIteratorHelper(stickyElements),
    _step7;

  try {
    for (_iterator7.s(); !(_step7 = _iterator7.n()).done; ) {
      var el = _step7.value;

      if (exclude !== el) {
        offset += $(el).height();
      }
    }
  } catch (err) {
    _iterator7.e(err);
  } finally {
    _iterator7.f();
  }

  return offset;
}

function debounce(f, t) {
  return function(args) {
    var previousCall = this.lastCall;
    this.lastCall = Date.now();

    if (previousCall && this.lastCall - previousCall <= t) {
      clearTimeout(this.lastCallTimer);
    }

    this.lastCallTimer = setTimeout(function() {
      return f(args);
    }, t);
  };
}

$(function() {
  initTippy();
  svg4everybody();
  initSticky();
  initClamp();
  initMobileHeader();
  initAccordions();
  resizeIframe();
  initTabs();
  initSelect();
  initModals();
  initFileInputs();
  initPageNavigation();
  initInputCounter();
});
