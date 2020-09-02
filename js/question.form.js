function initForm(form) {
  var errorContainer = $('[form-error]', form);
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
  $(form).validate(validateOptions);
}

$(function() {
  $('[form-question]').each(function() {
    initForm(this);
  });
});
