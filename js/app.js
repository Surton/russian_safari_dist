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
      'Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
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
      return template.innerHTML;
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
      return template.innerHTML;
    },
  });
}

function initStickyHeader() {
  var elements = document.querySelectorAll('[sticky]');

  var setStickyState = function setStickyState() {
    var _iterator = _createForOfIteratorHelper(elements),
      _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done; ) {
        var el = _step.value;

        if (window.pageYOffset > el.offsetTop) {
          el.classList.add('sticky');
        } else {
          el.classList.remove('sticky');
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
    $(window).scroll(setStickyState);
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
  $('[header-switcher]').click(function() {
    $('[app-header-mobile]').toggleClass(activeClass);

    if ($('[app-header-mobile]').hasClass(activeClass)) {
      $(document.body).css('overflow', 'hidden');
    } else {
      $(document.body).css('overflow', 'auto');
    }
  });
}

function initAccordions() {
  $('[accordion-header]').click(function(e) {
    var parent = e.currentTarget.parentElement;
    $(parent).toggleClass('app-accordion--active');
    $('[accordion-main]', e.currentTarget.parentElement).toggle('fast');
  });
}

function resizeIframe() {
  var resizeFrame = function resizeFrame(frame) {
    return $(frame).height(frame.clientWidth * 0.56);
  };

  $('iframe[resize]').on('load', function(event) {
    resizeFrame(event.target);
    $(window).resize(function() {
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
          value,
        ),
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
            '"></use></svg>',
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
          tabActiveClass,
        );
        $(
          '[tabs-navigation-item][data-tab="'.concat(id, '"]'),
          element,
        ).addClass(navigationActiveClass);
      };

      setActive(element.getAttribute('data-active'));
      $('[tabs-navigation-item]', element).click(function() {
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
      $('[app-modal-close]', element).click(function(event) {
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
  var elements = document.querySelectorAll('[app-input-file]');
  elements.forEach(function(element) {
    var _this = this;

    $(element).attr('tabindex', -1);
    var label = $(
      '<label tabindex="0" for="'
        .concat(
          $(element).attr('id'),
          '" class="app-input app-input-file-label" title="',
        )
        .concat($(element).attr('placeholder'), '"></label>'),
    );
    var icon = $(
      '<svg class="app-input-file-label__icon"><use xlink:href="./img/sprite.svg#attach"></use></svg>',
    );
    var placeholder = $(
      '<div class="app-input-file-label__placeholder">'.concat(
        $(element).attr('placeholder'),
        '</div>',
      ),
    );
    $(element).after(label);
    $(label).append(icon);
    $(label).append(placeholder);
    $(element).change(function(event) {
      if (event.files && event.files.length > 1) {
        fileName = (event.getAttribute('data-multiple-caption') || '').replace(
          '{count}',
          _this.files.length,
        );
      } else {
        fileName = event.target.value.split('\\').pop();
      }

      $(placeholder).html(fileName || $(element).attr('placeholder'));
    });
  });
}

$(function() {
  initTippy();
  svg4everybody();
  initStickyHeader();
  initClamp();
  initMobileHeader();
  initAccordions();
  resizeIframe();
  initTabs();
  initSelect();
  initModals();
  initFileInputs();
});
