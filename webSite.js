'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const header = document.querySelector('.header');
const btnLogin = document.querySelector('.btn--login-app');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

document.addEventListener('click', function(e){

  e.preventDefault();
  window.location.replace('app.html');

})

//document.getElementById("section--1").innerHTML = "Learn more more";

const message = document.createElement("div");
message.classList.add("top_message");
// 1. Create an element.
// 2. Add text to that element and containing an button in it.
// 3. Then, add event listener to that button, which performs an required action.
message.innerHTML = "This is the header message of the webpage<button>'Yeah Got it'</button>"

header.append(message);
