// -------------- select-gas ----------------
$(function () {
  var mixer = mixitup('.select-content', {
    load: {
      filter: '.m2'
  }
  });
  $('.select-btn').on('click', function () {
    $('.select-btn').removeClass('select-btn--active')
    $(this).addClass('select-btn--active')
  })
});
// -------------- slider ----------------
const swiper = new Swiper('.swiper', {
  resizeObserver: 'false',
  slidesPerView: 'auto',
  // Optional parameters
  loop: false,
  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  // Navigation arrows
  navigation: {
    nextEl: '.swiper-btn-next',
    prevEl: '.swiper-btn-prev',
  },
  effect: 'cards',
  cardsEffect: {
    perSlideOffset: 10,
    rotate: true,
    perSlideRotate: 0,
  },
  breakpoints: {
    // when window width is >= 320px
    320: {
      watchOverflow: true,
    },
    // when window width is >= 480px
    480: {
    },
    // when window width is >= 640px
    992: {
    }
  }
});
// -------------- accordeon ----------------
$('.accor-text').slideUp()
  $('.accor-link').on('click', function(e) {
    e.preventDefault()
    if ($(this).hasClass('accor-link--active')) {
      $(this).removeClass('accor-link--active')
      $(this).children('.accor-text').slideUp()
    } else {
    $('.accor-link').removeClass('accor-link--active')
    $('.accor-text').slideUp()
    $(this).addClass('accor-link--active')
    $(this).children('.accor-text').slideDown()
  }
});
// -------------- popup ----------------
const popupLinks = document.querySelectorAll('.popup-link');
const body = document.querySelector('body');
const lockPadding = document.querySelectorAll(".lock-padding");

let unlock = true;

const timeout = 800;

if (popupLinks.length > 0) {
  for (let index = 0; index < popupLinks.length; index++) {
    const popupLink = popupLinks[index];
    popupLink.addEventListener("click", function (e) {
      const popupName = popupLink.getAttribute('href').replace('#', '');
      const curentPopup = document.getElementById(popupName);
      popupOpen(curentPopup);
      e.preventDefault();
    });
  }
}
const popupCloseIcon = document.querySelectorAll('.close-popup');
if (popupCloseIcon.length > 0) {
  for (let index = 0; index < popupCloseIcon.length; index++) {
    const el = popupCloseIcon[index];
    el.addEventListener('click', function (e){
      popupClose(el.closest('.popup'));
      e.preventDefault();
    });
  }
}

function popupOpen(curentPopup) {
  if (curentPopup && unlock) {
    const popupActive = document.querySelector('.popup.open');
    if (popupActive) {
      popupClose(popupActive, false);
    } else {
      bodyLock();
    }
    curentPopup.classList.add('open');
    curentPopup.addEventListener("click", function (e) {
      if (!e.target.closest('.popup__content')) {
        popupClose(e.target.closest('.popup'));
      }
    });
  }
}
function popupClose(popupActive, doUnlock = true) {
  if (unlock) {
    popupActive.classList.remove('open');
    if (doUnlock) {
      bodyUnLock();
    }
  }
}

function bodyLock() {
  const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';

  if (lockPadding.length > 0) {
    for (let index = 0; index < lockPadding.length; index++) {
      const el = lockPadding[index];
      el.style.paddingRight = lockPaddingValue;
    }
  }
  body.style.paddingRight = lockPaddingValue;
  body.classList.add('lock');

  unlock = false;
  setTimeout(function () {
      unlock = true;
  },  timeout);
}

function bodyUnLock() {
  setTimeout(function () {
    if (lockPadding.length > 0) {
      for (let index = 0; index < lockPadding.length; index++){
        const el = lockPadding[index];
        el.style.paddingRight = '0px';
      }
    }
    body.style.paddingRight = '0px';
    body.classList.remove('lock');
  }, timeout);

  unlock = false;
  setTimeout(function() {
    unlock = true;
  }, timeout);
}

document.addEventListener('keydown', function (e) {
  if (e.which === 27) {
    const popupActive = document.querySelector('.popup.open');
    popupClose(popupActive);
  }
});