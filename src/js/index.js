const menu = document.querySelector(".header__menu");
const headerBurger = document.querySelector(".header__burger");
const headerSpan = headerBurger.querySelector(".header__span");
const body = document.querySelector("body");

body.addEventListener("click", (e) => {
  if (e.target === headerBurger || e.target === headerSpan) {
    menu.classList.toggle("active");
    body.classList.toggle("lock");
  } else if (menu.classList.contains("active")) {
    menu.classList.remove("active");
    body.classList.remove("lock");
  }
});
