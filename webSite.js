"use strict";
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");
const header = document.querySelector(".header");
const btnLogin = document.querySelector(".btn--login-app");
const cookieButton = document.querySelector(".cookie-message");
const section1 = document.querySelector("#section--1");
const btnScrollTo = document.querySelector(".btn--scroll-to");
const slideButtonRight = document.querySelector(".slider__btn--right");
const slideButtonLeft = document.querySelector(".slider__btn--left");
const navigation = document.querySelector(".nav");
const operationTab = document.querySelector(".operations__tab-container");
const operationContent = document.querySelectorAll(".operations__content");
const navigationLinks = document.querySelector(".nav__links");
const headerElement = document.querySelector(".header");
const lazyLoadImages = document.querySelectorAll("img[data-src]");
const allSlides = document.querySelectorAll(".slide");
const maximumSlides = allSlides.length;
const message = document.createElement("div");
const tabButtons = document.querySelectorAll(".btn.operations__tab");


// Cookies message text
message.classList.add("cookie-message");
message.innerHTML =
  "We make use of cookies for better functionality of the application.<button class='btn btn-close--cookie'>'Yeah Got it'</button>";
header.append(message);
const cookiesButton = document.querySelector(".btn-close--cookie");

cookiesButton.addEventListener("click", function () {
  message.remove();
  });




const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};


btnsOpenModal.forEach((Element) => {
  Element.addEventListener("click", openModal);
});


btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

btnLogin.addEventListener("click", function (e) {
  e.preventDefault();
  window.location.replace("app.html");
});




//smooth scrolling to beginning of sections
btnScrollTo.addEventListener("click", function(e) {
  //e.preventDefault();
  section1.scrollIntoView({behavior: 'smooth'});
});

//practice event propogation.

// const navBarElement = document.querySelector(".nav");
// const navBarChildElement = document.querySelector(".nav__link");
// const grayColor = "#DCDCDC";
// const blueColor = "#0000ff";

// navBarChildElement.addEventListener("click", function(){
//   console.log("The child button got clicked");
//   this.style.background = grayColor;
// })

// navBarElement.addEventListener("click", function(){
//   console.log("The parrent button got clicked");
//   this.style.background = blueColor;
// })

//added the smooth scrolling here using the element ID's
// document.querySelectorAll(".nav__link").forEach((function(element){

//   element.addEventListener('click', function(e){
//     e.preventDefault();
//     const hrefID = this.getAttribute('href');
//     document.querySelector(hrefID).scrollIntoView({behavior: 'smooth'});
//   })
// })
// )

//adding the smooth scrolling here using the event delegation

navigation.addEventListener("click", function (e) {
  e.preventDefault();
  if (e.target.classList.contains("nav__link")) {
    document
      .querySelector(e.target.getAttribute("href"))
      .scrollIntoView({ behavior: "smooth" });
  }
});

// worked on the tabbed component using the event delegation
  operationTab
  .addEventListener("click", function (e) {
    e.preventDefault();

    let className = e.target.getAttribute("class");
    // return when the target element has no elements(i.e. null)
    if (!className) return;

    //When one tab is clicked, then remove the tab active status for the remaining button.
    tabButtons.forEach((Element) => {
      let className = Element.getAttribute("class").toString();
      if (className.includes("operations__tab--active"))
        Element.classList.remove("operations__tab--active");
    });

    //Add the active status to the element which git clicked.
    e.target
      .closest(".operations__tab")
      .classList.add("operations__tab--active");

    //Remove the tab active status from the contents.
    operationContent.forEach((Element) => {
      Element.classList.remove("operations__content--active");
    });

    //Add the content active status to the element
    let contentElement = `.operations__content--${e.target.getAttribute(
      "data-tab"
    )}`;

    document
      .querySelector(contentElement)
      .classList.add("operations__content--active");
  });

//fade the button after hovering on one of the button in the navigation bar.
const fadeOutButtonsFunction = function (event, opac) {
  navigationLinks.addEventListener(event, function (e) {
    let navItemClass = e.target;

    if (!navItemClass) return;

    const sibilings = e.target.closest(".nav").querySelectorAll(".nav__link");

    sibilings.forEach((Element) => {
      if (Element !== navItemClass) Element.style.opacity = opac;
    });
  });
};

fadeOutButtonsFunction("mouseover", 0.5);
fadeOutButtonsFunction("mouseout", 1.0);

// Implementing the intersection observerAPI.

// The top navigation bar must be appeared for every section



let options = {
  root: null,
  threshold: 0,
  rootMargin: `-${
    navigation.getBoundingClientRect().height
  }px`,
};

const callBackFunction = function (entries, observer) {
  // destructuring of entries first element.
  const [entriesFirstElement] = entries;
  // This condition refers, if the header page viewport is visible or not. If not visible, then add the navigation to that page
  if (!entriesFirstElement.isIntersecting)
  navigation.classList.add("sticky");
  else navigation.classList.remove("sticky");
};

let observerAPIObjectNav = new IntersectionObserver(callBackFunction, options);

observerAPIObjectNav.observe(headerElement);



const callBackFunctionForImageLoad = function (entries, observer) {
  const [entry] = entries;

  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener("load", function () {
    entry.target.classList.remove("lazy-img");
  });

  observer.unobserve(entry.target);
};

let observerApiObjectLazyImg = new IntersectionObserver(
  callBackFunctionForImageLoad,
  {
    root: null,
    threshold: 0,
  }
);

lazyLoadImages.forEach((img) => observerApiObjectLazyImg.observe(img));



allSlides.forEach((s, index) => {
        s.style.transform = `translateX(${100 * (index)}%)`;
        s.setAttribute("slideNumber", index);
      });



let currentSlide = 0;

const callBackFunctionForSlidingsRight = function () {
  //validate if there are more slides present or not.
  if (currentSlide === maximumSlides - 1){
      currentSlide = 0;
  }else{
    currentSlide++;  
  }
  allSlides.forEach((s, index) => {
    s.style.transform = `translateX(${100 * (index - currentSlide)}%)`;
  });  
};

slideButtonRight.addEventListener("click", function () {  
    callBackFunctionForSlidingsRight();
  });

const callBackFunctionForSlidingsLeft = function () {

  if(currentSlide === 0){
      currentSlide  = maximumSlides - 1;
  } else{
    currentSlide--;
  }
  allSlides.forEach((s, index) => {
    s.style.transform = `translateX(${-100 * (index - currentSlide)}%)`;
  });
};

slideButtonLeft.addEventListener("click", function () {
    callBackFunctionForSlidingsLeft();  
  });
