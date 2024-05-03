const menuButton = document.querySelector(".burger-menu_ico");
const burgerIco = document.querySelector(".burger-menu_ico");
const burger = document.querySelector(".burger");
const body = document.querySelector(".body");
const links = document.querySelectorAll(".menu-item_link");

window.addEventListener("resize", closeBurgerOnResize);
function closeBurgerOnResize() {
  let screenWidth = window.innerWidth;

  if (screenWidth > 768) {
    burger.classList.remove("active");
    menuButton.classList.remove("open");
    body.classList.remove("non-scrolling");
  }
}

const openMenu = function () {
  burger.classList.toggle("active");
  burgerIco.classList.toggle("open");
  body.classList.toggle("non-scrolling");
};

links.forEach((link) => link.addEventListener("click", openMenu));

menuButton.addEventListener("click", openMenu);
