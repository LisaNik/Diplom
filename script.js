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


//quizzzz

const quizBtns = document.querySelectorAll(".quiz-btn");

quizBtns.forEach(quizBtn => {
    quizBtn.addEventListener("click", () => {
        // Удаление класса "answer" у всех кнопок
        quizBtns.forEach(btn => {
            if (btn !== quizBtn) {
                btn.classList.remove("answer");
            }
        });
        // Тоггл класса "answer" на кнопке, на которую было нажато
        quizBtn.classList.toggle("answer");
    });
});


// function getBestCard() {
//   const div = document.querySelector('.cards');

//   data.forEach(profile => {

//       if(profile.id === '1'){
//           const profileCard = createProfile(profile); // Pass PetType as an argument
//           createButton(profileCard);
//       }
//   });
// }

//тест
var counter = 0;
const questions = ["Твоя тваринка дуже активна та любить погратися."
                ,"Ти полюбляєш великих тваринок, а не тих які поміщаються у сумочку?"
                ,"Тобі б хотілося мати тваринку яка любить людей та дітей."
                ,"Ти б зміг впоратися з агресивною тваринкою."
                ,"Ти б взяв тваринку, яка має проблеми зі здоров'ям."
                ,"Ти обожнюєш прогулянки на свіжому повітрі."
                ,"Пухнасті тварини найкращі!"
                ,"Ти готовий постійно гратися з тваринкою та приділяти їй увагу."
                ,"Ти завжди мріяв про розумного чотирилапого друга."
                ,"Ти маєш великий дім, де тваринці буде просторно."
                ,"Тобі важливо, щоб тваринка була слухняною."
                ,"Тобі подобається, коли тваринка любить гратися з іншими тваринками."              
              ];

var answers = [];             

const quizStart = document.getElementById('quiz-btn');
const backgroundQuestion = document.querySelector('.background-quiz');
const quizH4 = document.getElementById('title');
const quizH1 = document.getElementById('big-title');
const quizH2 = document.getElementById('result');
const quizButtons = document.querySelectorAll('.quiz-buttons');
const question = document.getElementById('question');


quizStart.addEventListener("click", function() {
  if (counter === 0) {
    this.textContent = 'Далі';    
    backgroundQuestion.style.backgroundImage = "url('images/backgr/Group-quiz.svg')";
    quizH4.style.display = 'none';
    quizButtons.forEach(button => {
      button.style.display = 'flex';
    });
    
    question.textContent = counter+1 + ". " + questions[counter];
    counter = counter + 1;

  }
  else if(counter === questions.length){
    quizButtons.forEach(button => {
      button.style.display = 'none';
    });
    // getBestCard();
    question.style.display = 'none';
    quizH1.style.display = 'none';
    quizH2.style.display = 'block';

  }
  
  else{    
    var element = document.querySelector('.quiz-btn.answer');

    if(element){      
      question.textContent = counter+1 + ". " + questions[counter];
      counter = counter + 1;      
      if (element.id === "type1") {
        answers.push("1");
      }else if(element.id === "type2"){
        answers.push("2");
      }else if(element.id === "type3"){
        answers.push("3");
      }else if(element.id === "type4"){
        answers.push("4");
      }else if(element.id === "type5"){
        answers.push("5");
      }

      console.log(answers);    
      element.classList.remove('answer');

    }
  }



});
