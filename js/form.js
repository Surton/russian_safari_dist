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

function initCertificateVerification() {
  $('[form-certificate-verification]').each(function() {
    var errorContainer = $('[form-error]', this);
    errorContainer.hide();
    var validateOptions = {
      rules: {
        number: {
          required: true,
        },
      },
      messages: {
        number: {
          required: 'Укажите корректный номер сертификата',
        },
      },
      showErrors: function showErrors(errorMap, errorList) {
        errorContainer.empty();
        $(this.currentElements).removeClass('error');

        if (errorList.length) {
          errorContainer.show();
        } else {
          errorContainer.hide();
        }

        var _iterator = _createForOfIteratorHelper(errorList),
          _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done; ) {
            error = _step.value;
            $(error.element).addClass('error');
            errorContainer.append(
              $(
                '<div class="app-form-label app-form-label--error">'.concat(
                  error.message,
                  '</div>',
                ),
              ),
            );
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      },
      submitHandler: function submitHandler(form) {
        errorContainer.empty();
        $('[form-submit]', form).addClass('app-button-loading');
        $('[form-submit]', form).addClass('app-button-disabled');
        $('[form-submit]', form).attr('disabled', 'true');
        setTimeout(function() {
          $('[form-submit]', form).removeClass('app-button-loading');
          $('[form-submit]', form).removeClass('app-button-disabled');
          $('[form-submit]', form).removeAttr('disabled', 'true');
          errorContainer.append(
            $(
              '<div class="app-form-label app-form-label--error"><span class="p400b">Произошла ошибка</span>. Заявка не отправлена, попробуйте еще раз</div>',
            ),
          );
          errorContainer.show();
        }, 2000);
      },
    };
    $(this).validate(validateOptions);
  });
}

function initCertificateActivation() {
  $('[form-certificate-activation]').each(function() {
    var errorContainer = $('[form-error]', this);
    errorContainer.hide();
    var validateOptions = {
      rules: {
        name: {
          required: true,
        },
        phone: {
          required: true,
        },
      },
      messages: {
        name: {
          required: 'Укажите имя',
        },
        phone: {
          required: 'Укажите телефон',
        },
      },
      submitHandler: function submitHandler(form) {
        errorContainer.empty();
        $('[form-submit]', form).addClass('app-button-loading');
        $('[form-submit]', form).addClass('app-button-disabled');
        $('[form-submit]', form).attr('disabled', 'true');
        setTimeout(function() {
          $('[form-submit]', form).removeClass('app-button-loading');
          $('[form-submit]', form).removeClass('app-button-disabled');
          $('[form-submit]', form).removeAttr('disabled', 'true');
          errorContainer.append(
            $(
              '<div class="app-form-label app-form-label--error"><span class="p400b">Произошла ошибка</span>. Заявка не отправлена, попробуйте еще раз</div>',
            ),
          );
          errorContainer.show();
        }, 2000);
      },
    };
    $(this).validate(validateOptions);
  });
}

function initQuestion() {
  $('[form-question]').each(function() {
    var errorContainer = $('[form-error]', this);
    errorContainer.hide();
    var validateOptions = {
      rules: {
        contact: {
          required: true,
        },
      },
      messages: {
        contact: {
          required: 'Укажите телефон или почту',
        },
      },
      submitHandler: function submitHandler(form) {
        errorContainer.empty();
        $('[form-submit]', form).addClass('app-button-loading');
        $('[form-submit]', form).addClass('app-button-disabled');
        $('[form-submit]', form).attr('disabled', 'true');
        setTimeout(function() {
          $('[form-submit]', form).removeClass('app-button-loading');
          $('[form-submit]', form).removeClass('app-button-disabled');
          $('[form-submit]', form).removeAttr('disabled', 'true');
          errorContainer.append(
            $(
              '<div class="app-form-label app-form-label--error"><span class="p400b">Произошла ошибка</span><br>Заявка не отправлена, попробуйте еще раз</div>',
            ),
          );
          errorContainer.show();
        }, 2000);
      },
    };
    $(this).validate(validateOptions);
  });
}

function initReview() {
  $('[form-review]').each(function() {
    var errorContainer = $('[form-error]', this);
    errorContainer.hide();
    var validateOptions = {
      rules: {
        phone: {
          required: {
            param: true,
            depends: function depends() {
              return !$('#form-review-email').val();
            },
          },
        },
        email: {
          required: {
            param: true,
            depends: function depends() {
              return !$('#form-review-phone').val();
            },
          },
        },
        review: {
          required: true,
        },
      },
      messages: {
        phone: {
          required: 'Укажите телефон или почту',
        },
        email: {
          required: 'Укажите телефон или почту',
        },
        review: {
          required: 'Оставьте Ваш отзыв',
        },
      },
      submitHandler: function submitHandler(form) {
        errorContainer.empty();
        $('[form-submit]', form).addClass('app-button-loading');
        $('[form-submit]', form).addClass('app-button-disabled');
        $('[form-submit]', form).attr('disabled', 'true');
        setTimeout(function() {
          $('[form-submit]', form).removeClass('app-button-loading');
          $('[form-submit]', form).removeClass('app-button-disabled');
          $('[form-submit]', form).removeAttr('disabled', 'true');
          errorContainer.append(
            $(
              '<div class="app-form-label app-form-label--error"><span class="p400b">Произошла ошибка</span><br>Заявка не отправлена, попробуйте еще раз</div>',
            ),
          );
          errorContainer.show();
        }, 2000);
      },
    };
    $(this).validate(validateOptions);
  });
}

function initCallMe() {
  $('[form-call-me]').each(function() {
    var errorContainer = $('[form-error]', this);
    errorContainer.hide();
    var validateOptions = {
      rules: {
        name: {
          required: true,
        },
        phone: {
          required: true,
        },
      },
      messages: {
        name: {
          required: 'Укажите Ваше имя',
        },
        phone: {
          required: 'Укажите номер телефона',
        },
      },
      submitHandler: function submitHandler(form) {
        errorContainer.empty();
        $('[form-submit]', form).addClass('app-button-loading');
        $('[form-submit]', form).addClass('app-button-disabled');
        $('[form-submit]', form).attr('disabled', 'true');
        setTimeout(function() {
          $('[form-submit]', form).removeClass('app-button-loading');
          $('[form-submit]', form).removeClass('app-button-disabled');
          $('[form-submit]', form).removeAttr('disabled', 'true');
          errorContainer.append(
            $(
              '<div class="app-form-label app-form-label--error"><span class="p400b">Произошла ошибка</span><br>Заявка не отправлена, попробуйте еще раз</div>',
            ),
          );
          errorContainer.show();
        }, 2000);
      },
    };
    $(this).validate(validateOptions);
  });
}

$(function() {
  initCertificateVerification();
  initCertificateActivation();
  initQuestion();
  initReview();
  initCallMe();
});
