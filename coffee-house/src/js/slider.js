const arrowLeft = document.querySelector("#left");
const arrowRight = document.querySelector("#right");
const slider = document.querySelector(".slide");
const paginationBtns = document.querySelectorAll(".pagination-line");
slider.addEventListener("touchstart", getTouchStart, false);
slider.addEventListener("touchmove", getTouchMove, false);

let translation = 0;
let dotIndex = 0;

let moveLeft = function () {
  dotIndex--;
  if (dotIndex === -1) {
    dotIndex = 2;
  }

  translation += 100;
  slider.style.transform = `translateX(${translation}%)`;
  if (translation === 100) {
    translation = -200;
    slider.style.transform = `translateX(${translation}%)`;
  }
  thisSlide(dotIndex);
};

let moveRight = function () {
  translation -= 100;
  dotIndex++;
  if (dotIndex === 3) {
    dotIndex = 0;
  }

  slider.style.transform = `translateX(${translation}%)`;

  if (translation === -300) {
    translation = 0;
    slider.style.transform = `translateX(${translation}%)`;
  }

  thisSlide(dotIndex);
};

arrowLeft.addEventListener("click", moveLeft);
arrowRight.addEventListener("click", moveRight);

setInterval(moveRight, 5000);

paginationBtns.forEach((btn, index) => {
  btn.addEventListener("click", () => {
    translation = -100 * index;
    slider.style.transform = `translateX(${translation}%)`;
    dotIndex = index;
    thisSlide(dotIndex);
  });
});

const thisSlide = function (index) {
  paginationBtns.forEach((btn) => {
    btn.classList.remove("active");
    btn.style.cursor = "pointer";
    btn.disabled = false;
  });

  paginationBtns[index].classList.add("active");
  paginationBtns[index].style.cursor = "auto";
  paginationBtns[index].disabled = true;
};

//Swipe

let x1 = 0;
let y1 = 0;

function getTouchStart(event) {
  const firstTouch = event.touches[0];
  x1 = firstTouch.clientX;
  y1 = firstTouch.clientY;
}

function getTouchMove(event) {
  if ((x1, y1)) {
    let x2 = event.touches[0].clientX;
    let y2 = event.touches[0].clientY;
    let differenceX = x2 - x1;
    let differenceY = y2 - y1;
    if (Math.abs(differenceX) > Math.abs(differenceY)) {
      if (differenceX > 0) {
        moveLeft();
      } else moveRight();
    }
  } else return false;
  x1 = 0;
  y1 = 0;
}
