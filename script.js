(function () {
  var doc = document.documentElement;
  var w = window;

  var curScroll;
  var prevScroll = w.scrollY || doc.scrollTop;
  var curDirection = 0;
  var prevDirection = 0;

  var header = document.getElementById('site-header');
  var toggled;
  var threshold = 100;

  var checkScroll = function () {
    curScroll = w.scrollY || doc.scrollTop;
    if (curScroll > prevScroll) {
      // scrolled down
      curDirection = 2;
    } else {
      //scrolled up
      curDirection = 1;
    }

    if (curDirection !== prevDirection) {
      toggled = toggleHeader();
    }

    prevScroll = curScroll;
    if (toggled) {
      prevDirection = curDirection;
    }
  };

  var toggleHeader = function () {
    toggled = true;
    if (curDirection === 2 && curScroll > threshold) {
      header.classList.add('hide');
    } else if (curDirection === 1) {
      header.classList.remove('hide');
    } else {
      toggled = false;
    }
    return toggled;
  };

  window.addEventListener('scroll', checkScroll);
})();



//////////Разова/Щомісячна допомога
const donatBtns = document.querySelectorAll('.donation-button');

donatBtns.forEach(donatBtn => {
  donatBtn.addEventListener('click', () => {
    // Перевіряємо, чи кнопка не має класу 'active'
    if (!donatBtn.classList.contains('active')) {
      // Видаляємо 'active' клас і підкреслення з усіх кнопок та підкреслень
      document.querySelectorAll('.donation-button').forEach(btn => btn.classList.remove('active'));
      document.querySelectorAll('.underline').forEach(underline => underline.classList.remove('underline-active'));

      // Додаємо 'active' клас і підкреслення до натиснутої кнопки та підкреслення
      donatBtn.classList.add('active');
      donatBtn.nextElementSibling.classList.add('underline-active');

      // Змінюємо видимість відповідних заголовків
      var headingDonat = document.querySelector('.heading-donat');
      var headingDonat1 = document.querySelector('.heading-donat1');

      if (headingDonat.classList.contains('hidden')) {
        headingDonat1.classList.add('hidden');
        headingDonat.classList.remove('hidden');
      } else {
        headingDonat.classList.add('hidden');
        headingDonat1.classList.remove('hidden');
      }
    }
  });
});


const showModal = () => {
  const modal = document.getElementById('modal')

  modal.classList.add('visible')
}

const hideModal = () => {
  const modal = document.getElementById('modal')

  modal.classList.remove('visible')
}


     ///////////////////////////////////
 //CHOSE DONATION
document.addEventListener("DOMContentLoaded", function () {
    const buttons = document.querySelectorAll('.transparent-donat');

    buttons.forEach(button => {
        button.addEventListener('click', function () {
            buttons.forEach(otherButton => {
                otherButton.classList.remove('using');
            });
            this.classList.add('using');
        });
    });
});


//////////////GRAPHS
$(document).ready(function() {
  $(window).on('scroll', function() {
      var windowHeight = $(window).height();
      var scrollValue = $(this).scrollTop();
      var cardOffset = $('.progress').offset().top;
      
      if ((scrollValue + windowHeight) > cardOffset) {
          $('.card1 circle:nth-child(2)').css('animation', 'progress 3s ease');          
          $('.card2 circle:nth-child(2)').css('animation', 'progress 3s ease');
          $('.card circle:nth-child(2)').css('animation', 'progress 3s ease');
      } else {
          $('.card1 circle:nth-child(2)').css('animation', 'none');
          $('.card2 circle:nth-child(2)').css('animation', 'none');
          $('.card circle:nth-child(2)').css('animation', 'none');
      }
  });
});


