(function ($) {
  "use strict";

  new WOW().init();

  /*---background image---*/
  function dataBackgroundImage() {
    $("[data-bgimg]").each(function () {
      var bgImgUrl = $(this).data("bgimg");
      $(this).css({
        "background-image": "url(" + bgImgUrl + ")", // + meaning concat
      });
    });
  }

  $(window).on("load", function () {
    dataBackgroundImage();
  });

  /*---stickey menu---*/
  $(window).on("scroll", function () {
    var scroll = $(window).scrollTop();
    if (scroll < 100) {
      $(".sticky-header").removeClass("sticky");
    } else {
      $(".sticky-header").addClass("sticky");
    }
  });

  // Slick Slider Activation
  var $sliderActvation = $(".slick__activation");
  if ($sliderActvation.length > 0) {
    $sliderActvation.slick({
      prevArrow:
        '<button class="prev_arrow"><img width="17" height="24" src="assets/img/icon/navigation-arrow2.webp" alt=""></button>',
      nextArrow:
        '<button class="next_arrow"><img width="17" height="24" src="assets/img/icon/navigation-arrow1.webp" alt=""></button>',
    });
  }

  // Slick Slider Activation2
  var $sliderActvation = $(".slick__activation2");
  if ($sliderActvation.length > 0) {
    $sliderActvation.slick({
      prevArrow:
        '<button class="prev_arrow"><i class="icofont-long-arrow-left"></i></button>',
      nextArrow:
        '<button class="next_arrow"><i class="icofont-long-arrow-right"></i></button>',
    });
  }

  /*--- Magnific Popup Video---*/
  $(".video_popup").magnificPopup({
    type: "iframe",
    removalDelay: 300,
    mainClass: "mfp-fade",
  });

  $(".popup_img").magnificPopup({
    type: "image",
    gallery: {
      enabled: true,
    },
  });

  /*--- counterup activation ---*/
  $(".counterup").counterUp({
    delay: 20,
    time: 2000,
  });

  // niceselect activation
  $(document).ready(function () {
    $("select,.select_option").niceSelect();
  });

  // Scroll to top
  scrollToTop();

  function scrollToTop() {
    var $scrollUp = $("#scroll-top"),
      $lastScrollTop = 0,
      $window = $(window);

    $window.on("scroll", function () {
      var st = $(this).scrollTop();
      if (st > $lastScrollTop) {
        $scrollUp.removeClass("show");
      } else {
        if ($window.scrollTop() > 200) {
          $scrollUp.addClass("show");
        } else {
          $scrollUp.removeClass("show");
        }
      }
      $lastScrollTop = st;
    });

    $scrollUp.on("click", function (evt) {
      $("html, body").animate({ scrollTop: 0 }, 600);
      evt.preventDefault();
    });
  }
  scrollToTop();

  /*---Off Canvas Menu---*/
  var $offcanvasNav = $(".offcanvas_main_menu"),
    $offcanvasNavSubMenu = $offcanvasNav.find(".sub-menu");
  $offcanvasNavSubMenu
    .parent()
    .prepend(
      '<span class="menu-expand"><i class="icofont-simple-down"></i></span>'
    );

  $offcanvasNavSubMenu.slideUp();

  $offcanvasNav.on("click", "li a, li .menu-expand", function (e) {
    var $this = $(this);
    if (
      $this
        .parent()
        .attr("class")
        .match(/\b(menu-item-has-children|has-children|has-sub-menu)\b/) &&
      ($this.attr("href") === "#" || $this.hasClass("menu-expand"))
    ) {
      e.preventDefault();
      if ($this.siblings("ul:visible").length) {
        $this.siblings("ul").slideUp("slow");
      } else {
        $this.closest("li").siblings("li").find("ul:visible").slideUp("slow");
        $this.siblings("ul").slideDown("slow");
      }
    }
    if (
      $this.is("a") ||
      $this.is("span") ||
      $this.attr("clas").match(/\b(menu-expand)\b/)
    ) {
      $this.parent().toggleClass("menu-open");
    } else if (
      $this.is("li") &&
      $this.attr("class").match(/\b('menu-item-has-children')\b/)
    ) {
      $this.toggleClass("menu-open");
    }
  });
})(jQuery);

//Quiz Section JAvascript
//  Timer box

const countdownNumberEl = document.querySelector(".countdown_active");
let countdown = 60;
let timer = setInterval(function () {
  countdown = --countdown <= 0 ? 60 : countdown;
  countdownNumberEl.textContent = countdown;

  if (countdown === 0) {
    clearInterval(timer);
  }
}, 1000);

countdownNumberEl.textContent = countdown;

function tick() {
  setTimeout(function () {
    window.location.href = "https://deen-quiz.netlify.app/index.html";
  }, 60000);
}

//Quiz question Section
function Quiz(questions) {
  this.score = 0;
  this.questions = questions;
  this.questionIndex = 0;
}

Quiz.prototype.getQuestionIndex = function () {
  return this.questions[this.questionIndex];
};

Quiz.prototype.isEnded = function () {
  return this.questions.length === this.questionIndex;
};

Quiz.prototype.guess = function (answer) {
  if (this.getQuestionIndex().correctAnswer(answer)) {
    this.score++;
  }

  this.questionIndex++;
};

function Question(text, choices, answer) {
  this.text = text;
  this.choices = choices;
  this.answer = answer;
}

Question.prototype.correctAnswer = function (choice) {
  return choice === this.answer;
};

function populate() {
  if (quiz.isEnded()) {
    showScores();
  } else {
    var element = document.getElementById("question");
    element.innerHTML = quiz.getQuestionIndex().text;

    //show choices
    var choices = quiz.getQuestionIndex().choices;
    for (var i = 0; i < choices.length; i++) {
      var element = document.getElementById("choice" + i);
      element.innerHTML = choices[i];

      guess("btn" + i, choices[i]);
    }

    showProgress();
  }
}

function guess(id, guess) {
  var button = document.getElementById(id);
  button.onclick = function () {
    quiz.guess(guess);
    populate();
  };
}

function showProgress() {
  var currentQuestionNumber = quiz.questionIndex + 1;
  var element = document.getElementById("progress");
  element.innerHTML =
    "Questions " + currentQuestionNumber + " of " + quiz.questions.length;
}

function showScores() {
  var gameOverHTML = "<h1>Result</h1>";
  gameOverHTML += "<h2 id='score'> Your Scores: " + quiz.score + "</h2>";
  var element = document.getElementById("quiz");
  element.innerHTML = gameOverHTML;
}

var questions = [
  new Question(
    "Who was the last head of state of Soviet Union?",
    ["Mikhail Kalinin", "Mikhail Gorbachev", "Yosef Stalin", "Yuri Andropov"],
    "Mikhail Gorbachev"
  ),
  new Question(
    "Which year Soviet Union broke apart",
    ["1989", "1995", "1991", "1985"],
    "1991"
  ),
  new Question(
    "How many countries achieved secession from the Soviet Union",
    ["19", "15", "14", "20"],
    "14"
  ),
  new Question(
    "Name of the prime Intelligence org during Soviet era?",
    ["FSB", "CIA", "Gestapo", "KGB"],
    "KGB"
  ),
];

var quiz = new Quiz(questions);

populate();

score = 0;

function go(x) {
  $({ score: 0 }).animate(
    { score: x },
    {
      duration: 1000,
      easing: "linear",
      step: function (now, fx) {
        $("#score").html(2 * score + Math.floor(now));
      },
      queue: false,
      complete: function (now, fx) {
        score += x;
      },
    }
  );
  $("#tag")
    .fadeIn({
      duration: 700,
      easing: "linear",
      step: function (now, fx) {
        $(this).css("top", -55 * now + "px");
      },
    })
    .fadeOut({
      duration: 300,
      step: function (now, fx) {
        $(this).css("top", -55 * (2 - now) + "px");
      },
    });
}
