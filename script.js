"use strict";

// Bank Accounts Data
const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2,
  pin: 1111,
};

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: "Steven Thomas Williams",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: "Sarah Smith",
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];
let currentLoggedInUser;

// FE Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

// Update the accounts Object with userNames

const accountUserNames = function (userAccounts) {
  userAccounts.forEach(function (acc) {
    acc.userName = acc.owner
      .toLowerCase()
      .split(" ")
      .map((name) => name[0])
      .join("");
  });
};

accountUserNames(accounts);

// Login implementation of the user

btnLogin.addEventListener("click", function (e) {
  e.preventDefault();
  currentLoggedInUser = accounts.find(
    (acc) => acc.userName === String(inputLoginUsername.value)
  );

  if (currentLoggedInUser?.pin === Number(inputLoginPin.value)) {
    console.log("user logged in successfully");
  } else {
    alert("The entered credentials are invalid");
  }
});

// const updateMovementsWithAccount1 = function (transaction) {
//   // deposit or withdrawl
//   transaction.forEach(function (trans, index) {
//     const type = (trans > 0 ? "deposit" : "withdrawal");
//     const htmlElement = `
//      <div class="movements__row">
//      <div class="movements__type movements__type--${type}">${index + 1}${type}</div>
//      <div class="movements__value">${trans}€</div>
//    </div>
//    `;
//     containerMovements.insertAdjacentHTML('afterbegin', htmlElement);
//   });

// }

//updateMovementsWithAccount1(account1.movements);

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

//const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// /////////////////////////////////////////////////
// console.log(movements.join('-'));
// console.log(movements);

// console.log(movements.reverse());
// console.log(movements);

// console.log(movements.slice(-2));
// console.log(movements);

// Challenge 1.

// const checkDogs = function (dogsJulia, dogsKate) {

//   // remove the cat ages from dogsJulia after creating an shallow copy.

//   const dogsJuliaArrayCopy = dogsJulia;

//   // remove the first and last two

//   dogsJuliaArrayCopy.splice(-4, 2);
//   dogsJuliaArrayCopy.splice(0, 1);

//   const newArray = [...dogsJuliaArrayCopy, ...dogsKate];

//   newArray.forEach(function (element, index, array) {

//     // console.log( element < 3 ? console.log(`Dog number${index+1} is still a puppy`) : console.log(`Dog number${index+1} is an adult, and is${element} years old`));

//   });

// };

// console.log("-----------------------------------------------");
// checkDogs([3, 4, 2, 12, 7], [4, 1, 15, 8, 3]);
// console.log("-----------------------------------------------");
// checkDogs([9, 16, 6, 8, 3], [10, 5, 6, 1, 4]);

// const withdrawals = movements.filter(function (mov) {
//   return mov < 0;
// });

//console.log(withdrawals);

// const accumulateTotalBalance = movements.reduce(function (acc, cur) {

//   //console.log(`This is accumulator ${acc}, the current value is ${cur}`);
//   return acc + cur;

// }, 0);

// labelBalance.textContent = `${accumulateTotalBalance}EUR`;

// // find the maximum value of the account1 using the reduce method.

// const maximumValueUsingReduce = movements.reduce(function (acc, cur) {

//   //  console.log(`This is the accumulator${acc} and the cureent is${cur}`);

//   if (acc > cur) return acc;
//   else return cur;
// }, movements[0]);

//console.log(maximumValueUsingReduce);

// challenge 2
// a. calculate the dogs age in human years using the formula. If Dog <= 2, humanAge = 2*dogAge. If dog is > 2 years old, humanAge = 16 + dogAge *4;
// b. exclude all dogs that are less than 18 human years old(Which is the same as keeping dogs that atleast 18 years old).
// c. Calculate the average human age of all adult dogs.
// d. Run the function for both test datasets. Test data 1: [5, 2, 4, 1, 15, 8, 3], Test data2: [16, 6, 10, 5, 6, 1, 4];
// const calcAverageHumanAge = function(ages){
//   const humanAges =  ages.map(function(age){
//     return age = age <= 2 ? 2*age : 16+age*4;
//   });
//  // console.log(humanAges);
//   // now exclude all the dogs that are less than 18 human years old.
//   const agesAfterFilter = humanAges.filter(function(ages){
//       return ages >= 18;
//   })
//   //console.log(agesAfterFilter);
//   const averageHumanAge = agesAfterFilter.reduce(function(acc, age){
//       return (acc + age)/agesAfterFilter.length;
//   });
//   //console.log(averageHumanAge);

// };
// const calcAverageHumanAge = function (ages) {
//   const humanAges = ages.map(age => age = age <= 2 ? 2 * age : 16 + age * 4)
//     .filter(ages => ages >= 18)
//     .reduce((acc, age, index, array) => acc + age / array.length, 0);
//   console.log(humanAges);
// };
// calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
// calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);

//summary__value summary__value--in  (This is the summary value)

// const summaryValuesIn = function (mov) {

//   const valuesIn = mov.filter(function (movement) {
//     return movement > 0;
//   }).reduce(function (acc, mov) {
//     return acc + mov;
//   });

//   labelSumIn.textContent = valuesIn

// }

// summaryValuesIn(movements);

// const summaryValuesOut = function (mov) {

//   const valuesOut = mov.filter(function (movement) {
//     return movement < 0;
//   }).reduce(function (acc, mov) {
//     return acc + mov;
//   });

//   labelSumOut.textContent = valuesOut;

// }

// summaryValuesOut(movements);

// Implement the login

// So, first of all create the userNames of accounts, then add those userNames to the account and use that accounts object for the login purpose.
