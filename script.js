"use strict";

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");
// Smooth Transition
const btnScroll = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

btnsOpenModal.forEach((btn) => btn.addEventListener("click", openModal));

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

//Page Navigation
document.querySelector(".nav__links").addEventListener("click", function (e) {
  if (e.target.classList.contains("nav_link")) {
    e.preventDefault();
    const targetId = e.target.getAttribute("href");
    document.querySelector(targetId).scrollIntoView({
      behavior: "smooth",
    });
  }
});
//
const allSections = document.querySelectorAll(".section");
document.getElementById("#section--1");
const allButtons = document.getElementsByTagName("button");

//Welcome Cookie
// //const header = document.querySelector(".header");
// const message = document.createElement("div");
// message.classList.add("cookie-message");
// message.textContent = "Welcome to my Personal Website";
// message.innerHTML =
//   'Welcome to my Personal Website! <button class="btn btn--close--cookie">Got it</button>';
// header.append(message);
// document
//   .querySelector(".btn--close--cookie")
//   .addEventListener("click", function () {
//     message.remove();
//   });

//Mouse Hover

const nav = document.querySelector(".nav");
const hover = function (e) {
  if (e.target.classList.contains("nav__link")) {
    const link = e.target;
    const siblings = link.closest(".nav").querySelectorAll(".nav__link");

    siblings.forEach((el) => {
      if (el !== link) el.style.opacity = this;
    });
  }
};

if (nav) {
  nav.addEventListener("mouseover", hover.bind(0.5));
  nav.addEventListener("mouseout", hover.bind(1));
}

// Sticky Navigation
const header2 = document.querySelector(".header");
const navHeight = nav.getBoundingClientRect().height;

const stickyNavigation = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) nav.classList.add("sticky");
  else nav.classList.remove("sticky");
};

const header2Observer = new IntersectionObserver(stickyNavigation, {
  rott: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

header2Observer.observe(header2);

//Animation
const revealSection = function (entries, obserber) {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;

    entry.target.classList.remove("section--hidden");
    obserber.unobserve(entry.target);
  });
  //console.log(entry);
};
const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});
allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add("section--hidden");
});

//Button Scrolling
btnScroll.addEventListener("click", function (e) {
  const section1coords = section1.getBoundingClientRect();
  console.log(
    "height / width viewport",
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  );
  section1.scrollIntoView({ behavior: "smooth" });
});

//TEST FOR SECTION 2 SKILLS AND CERTIFICATES
const tabContainer = document.querySelector(".skills__tab-container");
const tabs = document.querySelectorAll(".skills__tab");
const contents = document.querySelectorAll(".skills__content");

tabContainer.addEventListener("click", (e) => {
  const btn = e.target.closest(".skills__tab");
  if (!btn) return;

  const tab = btn.dataset.tab;

  tabs.forEach((t) => t.classList.remove("skills__tab--active"));
  contents.forEach((c) => c.classList.remove("skills__content--active"));

  btn.classList.add("skills__tab--active");
  document
    .querySelector(`.skills__content--${tab}`)
    .classList.add("skills__content--active");
});

//style
const h1 = document.querySelector("h1");
h1.firstElementChild.style.color = "white";

const imgTargets = document.querySelectorAll("img[data-src]");
const loadImg = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;

  //Replace src with data-src
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener("load", function () {
    entry.target.classList.remove("lazy-img");
  });
  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: "-200px",
});

imgTargets.forEach((img) => imgObserver.observe(img));

//SLIDER
const slider = function () {
  const slides = document.querySelectorAll(".slide");
  const btnLeft = document.querySelector(".slider__btn--left");
  const btnRigh = document.querySelector(".slider__btn--right");

  const dotContainer = document.querySelector(".dots");

  let curSlide = 0;

  const maxNumOfSlide = slides.length;

  //Functions
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        "beforeend",
        `<button class="dots__dot" data-slide="${i}"> </button>`
      );
    });
  };

  const activateDot = function (slide) {
    document
      .querySelectorAll(".dots__dot")
      .forEach((dot) => dot.classList.remove("dots__dot--active"));

    document
      .querySelector(`.dots__dot[data-slide= "${slide}"]`)
      .classList.add("dots__dot--active");
  };

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translate(${100 * (i - slide)}%)`)
    );
  };

  //Next Right Slide
  const nextSlide = function () {
    if (curSlide === maxNumOfSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  //Previous Left Slide
  const previousSlide = function () {
    if (curSlide === 0) {
      curSlide = maxNumOfSlide - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const init = function () {
    goToSlide(0);
    createDots();
    activateDot(0);
  };
  init();

  //Event Handlers
  btnRigh.addEventListener("click", nextSlide);
  btnLeft.addEventListener("click", previousSlide);

  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") previousSlide();
    else if (e.key === "ArrowRight") nextSlide();
  });

  dotContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("dots__dot")) {
      curSlide = Number(e.target.dataset.slide);
      goToSlide(curSlide);
      activateDot(curSlide);
    }
  });
};
slider();
