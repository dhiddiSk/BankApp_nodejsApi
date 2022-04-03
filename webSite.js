"use strict";

///////////////////////////////////////
// Modal window

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");
const header = document.querySelector(".header");
const btnLogin = document.querySelector(".btn--login-app");
const cookieButton = document.querySelector(".cookie-message");
const section1 = document.querySelector("#section--1");
const btnScrollTo = document.querySelector(".btn--scroll-to");

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener("click", openModal);

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

const message = document.createElement("div");
message.classList.add("cookie-message");
// 1. Create an element.
// 2. Add text to that element and containing an button in it.
// 3. Then, add event listener to that button, which performs an required action.
message.innerHTML =
  "We make use of cookies for better functionality of the application.<button class='btn btn-close--cookie'>'Yeah Got it'</button>";
header.append(message);
message.style.background = "#808080";
message.style.width = "100vw";
message.style.paddingBottom = "15px";
//message.style.position = "fixed";
document
  .querySelector(".btn-close--cookie")
  .addEventListener("click", function () {
    message.remove();
  });

//practice smooth scrolling
// btnScrollTo.addEventListener("click", function(e) {
//   //e.preventDefault();
//   section1.scrollIntoView({behavior: 'smooth'});
// })

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

document.querySelector("nav").addEventListener("click", function (e) {
  e.preventDefault();
  // console.log(`This is the taget`+ e.target.classList);
  if (e.target.classList.contains("nav__link")) {
    document
      .querySelector(e.target.getAttribute("href"))
      .scrollIntoView({ behavior: "smooth" });
  }
});

// worked on the tabbed component using the event delegation

document
  .querySelector(".operations__tab-container")
  .addEventListener("click", function (e) {
    e.preventDefault();

    let className = e.target.getAttribute("class");
    // return when the target element has no elements(i.e. null)
    if (!className) return;

    //When one tab is clicked, then remove the tab active status for the remaining button.
    document.querySelectorAll(".operations__tab").forEach((Element) => {
      let className = Element.getAttribute("class").toString();
      if (className.includes("operations__tab--active"))
        Element.classList.remove("operations__tab--active");
    });

    //Add the active status to the element which git clicked.
    e.target
      .closest(".operations__tab")
      .classList.add("operations__tab--active");

    //Remove the tab active status from the contents.
    document.querySelectorAll(".operations__content").forEach((Element) => {
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
  document.querySelector(".nav__links").addEventListener(event, function (e) {
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

const headerElement = document.querySelector(".header");

let options = {
  root: null,
  threshold: 0,
  rootMargin: `-${document.querySelector('.nav').getBoundingClientRect().height}px`
};

const callBackFunction = function (entries, observer) {
 // destructuring of entries first element.
 const [entriesFirstElement] = entries;
 // This condition refers, if the header page viewport is visible or not. If not visible, then add the navigation to that page
 if (!entriesFirstElement.isIntersecting) document.querySelector('.nav').classList.add('sticky'); 
  else document.querySelector('.nav').classList.remove('sticky');
}

let observerAPIObjectNav = new IntersectionObserver(callBackFunction, options);

observerAPIObjectNav.observe(headerElement);

const lazyLoadImages = document.querySelectorAll('img[data-src]');




const callBackFunctionForImageLoad = function (entries, observer){
   
  const [entry] = entries;

  console.log(entry);

  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', function(){
    entry.target.classList.remove('lazy-img');
  });
 
  observer.unobserve(entry.target);

}

let observerApiObjectLazyImg = new IntersectionObserver(callBackFunctionForImageLoad, {
  root: null,
  threshold: 0
})


lazyLoadImages.forEach(img => observerApiObjectLazyImg.observe(img));









