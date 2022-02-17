$(document).ready(function(){
  $('.carousel__inner').slick({
      speed: 1200,
      // adaptiveHeight: true,
      prevArrow: '<button type="button" class="slick-prev"><img src="icons/left.svg"></button>',
      nextArrow: '<button type="button" class="slick-next"><img src="icons/right.svg"></button>',
      responsive: [
          {
              breakpoint: 992,
              settings: {
                  dots: true,
                  arrows: false
              }
          }
      ]

      
  });
  
  $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
      $(this)
        .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
        .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
  });

  function toggleSlide(item) {
      $(item).each(function(i) {
          $(this).on('click', function(e) {
              e.preventDefault();
              $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
              $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
          })
      });
  };

  toggleSlide('.catalog-item__link');
  toggleSlide('.catalog-item__back');


    //  Modal 

    $('[data-modal=consultation]').on('click', function() {
        $('.overlay, #consultation').fadeIn('slow');
        // Выбрали кнопки "[data-modal=consultation]"(Их указали в html-файле) далее кликаем на них "'click'", открывается "fadeIn('slow'- означает медлеено открывается)" подложка ".overlay" с модальным окном с id "consultation". 
    });
    $('.modal__close').on('click', function() {
        $('.overlay, #consultation, #thanks, #order').fadeOut('slow')
        // При клике "'click'" на крестик в модальном окне ".modal__close", будет закрываться ".fadeOut('slow' -означает медленно закрываться)" подложка ".overlay," и все модальные окна. Каждому окну дали свой ID "consultation" "thanks" "order". 
    });
  
    $('.button_mini').each(function(i) {
        $(this).on('click', function() { 
            $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
            $('.overlay, #order').fadeIn('slow');
        })
        //Выбираем кнопки под каждым пульсометром ".button_mini". Запускаем команду "each", которая будет перебирать все эти кнопки. Для каждой кнопки будет выполняться какая то операция "function(i)". Аргумент "i" отвечает за номер элемента по порядку, тоесть мы перебираем 5-ый элемент, 6-ой элемент и тд. Далее та кнопка на которую мы нажали "$(this)" будет совершен клик "on('click')" происходит функция "function()". Внутри модального окна с id "order" есть класс ".modal__descr"(этот заголовок мы и хотим менять когда будем нажимать на кнопки под разными моделями пульсометров, так как в этом заголовке прописана сама модель пульсометра), во внутрь этого заголовка помещаем текст "text", который прописан в элементе "catalog-item__subtitle". Далее необходимо получить нужный заголовок по его индексу. Для этого у нас есть переменная "i". Для этого указываем команду "eq" эта команда которая позволяет получать определенный элемент по порядку, для этого и прописываем "(i)". (Тоесть если мы нажимаем на 2-ую кнопку, то под "i" подставляется 2-ка). И далее когда мы выполняем все эти команды мы находим заголовок под тем номером который, в данном случае сейчас находится вместо "i", именно из него мы будем вытаскивать текст. ("$('.catalog-item__subtitle').eq(i).text()" - это и есть то, что находится внутри элемента ".modal__descr"). Далее При клике "'click'" на кнопки под каждым пульсометром ".button_mini", открывается "fadeIn('slow'- означает медлеено открывается)" подложка ".overlay" с модальным окном с id "order".
    });

        // Валидация формы


        function valideForms(form){
            $(form).validate({
                rules: {
                    name: {
                        required: true,
                        minlength: 2
                      },
                    phone: "required",
                    email: {
                        required: true,
                        email: true
                    }
                },
                messages: {
                    name: {
                        required: "Пожалуйста, введите свое имя",
                        minlength: jQuery.validator.format("Введите {0} символа!")
                    },
                    phone: "Пожалуйста, введите свой номер телефона",
                    email: {
                      required: "Пожалуйста, введите свою почту",
                      email: "Неправильно введен адрес почты"
                    }
                }
            });
        };

    valideForms('#consultation-form');
    valideForms('#consultation form');
    valideForms('#order form');

    $('input[name=phone]').mask("+7 (999) 999-99-99");

    $('form').submit(function(e) {
        e.preventDefault();

        if(!$(this).valid()) {
            return;
        }

        // отправка email с сайта

        $.ajax({
            type: "POST",
            url: "mailer/smart.php",
            data: $(this).serialize()
        }).done(function() {
            $(this).find("input").val("");
            $('#consultation, #order').fadeOut();
            $('.overlay, #thanks').fadeIn('slow');

            $('form').trigger('reset');
        });
        return false;
    });

    //smoof scroll and pageup (Создаем плавный скролинг)

    $(window).scroll(function() {            // $(window) - используется все окно браузера. .scroll -js следит за скролом. (Когда пользователь скролит страницу.) function() - Во вркмя скрола происходит функция.
        if ($(this).scrollTop() > 1600) {    //  if - если. $(this) - наша страница (Элемент на который ссылаемся выше). .scrollTop() > 1600 - Означает что скролл сверху составил 1600px. Если эио условие выполняется то происходит... 
            $('.pageup').fadeIn();              // то ссылка ($('.pageup')- это элемент стрелки вверх)) появляется (.fadeIn) 
        } else {                             // если уловие не выполняется (else) то ...
            $('.pageup').fadeOut();             // то ссылка ($('.pageup')- это элемент стрелки вверх)) не появляется (.fadeOut)
        }
    });

    $("a[href=#up]").click(function(){
        const _href = $(this).attr("href");
        $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
        return false;
    });

    new WOW().init();
});


