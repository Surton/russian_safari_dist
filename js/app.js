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
      var el = _step2.value;
      var attribute = el.getAttribute('clamp');
      $clamp(el, {
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

$(function() {
  initTippy();
  svg4everybody();
  initStickyHeader();
  initClamp();
  initMobileHeader();
});
